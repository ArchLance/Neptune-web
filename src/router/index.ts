import { createRouter, createWebHistory } from 'vue-router'
import NProgress from '@/config/nprogress'
import { useUserStore } from '@/store/models/user'
import { useMenuStore } from '@/store/models/menu'
export const staticRoutes = [
    {
        path: '/',
        redirect: '/login',
        isMenu: false
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue'),
        isMenu: false
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/layout/Layout.vue'),
        redirect: '/setting/profile',
        isMenu: false,
        funcNode: 1,
        children: [
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/layout/topbar/setting/PersonalSetting.vue'),
                meta: {
                    title: '个人中心',
                }
            }
        ]
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/layout/Layout.vue'),
        redirect: '/index/dashboard',
        isMenu: true,
        funcNode: 1,
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/Dashboard.vue'),
            meta: {
                title: '仪表盘',
                icon: 'Cpu',
                affix: true
            }
        }]
    },
    {
        path: '/tool',
        name: 'Tool',
        component: () => import('@/views/layout/Layout.vue'),
        meta: {
            title: '增效工具',
            icon: 'Odometer'
        },
        redirect: '/tool/asset',
        isMenu: true,
        funcNode: 3,
        children: [
            {
                path: 'asset',
                name: 'Asset',
                component: () => import('@/views/tool/Asset.vue'),
                meta: {
                    title: '资产管理',
                    icon: 'Files'
                }
            },
            {
                path: 'poc',
                name: 'Poc',
                component: () => import('@/views/tool/poc/POCManager.vue'),
                meta: {
                    title: 'POC管理',
                    icon: 'Message'
                }
            },
            {
                path: 'emergency',
                name: 'Emergency',
                component: () => import('@/views/tool/Emergency.vue'),
                meta: {
                    title: '应急响应',
                    icon: 'Watch'
                }
            }
        ]
    }
]

export const asyncRoutes = [
    {
        path: '/system',
        name: 'system',
        meta: {
            title: '系统管理',
            icon: 'Setting',
            role: ['ROLE_ADMIN']
        },
        redirect: '/system/user',
        component: () => import('@/views/layout/Layout.vue'),
        isMenu: true,
        funcNode: 2,
        children: [
            {
                path: 'user',
                name: 'User',
                component: () => import('@/views/system/user/User.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'UserFilled',
                    role: ['ROLE_ADMIN']
                }
            },
            {
                path: 'role',
                name: 'Role',
                component: () => import('@/views/system/role/Role.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'Stamp',
                    role: ['ROLE_ADMIN']
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: staticRoutes
})
/**
 * @description 开启进度条,并根据规则进行路由拦截
 * */
router.beforeEach(async (to, from, next) => {
    // 启动进度条
    NProgress.start()
    // const menuStore = useMenuStore()
    // menuStore.generateRoutes([])
    // return next()
    // 如果是登录页面则直接放行
    if (to.path === '/login') return next()

    const userStore = useUserStore()
    if (!userStore.token) {
        // 如果没有token则跳转到登录页面，并且在登陆成功后重新跳转到指定页面
        return next({ path: `/login?redirect=${to.path}`, replace: true })
    }
    if (userStore.token && to.path === '/login') {
        // 如果有token则直接跳转到首页
        return next({ path: '/' })
    }
    const { userInfo } = userStore
    const roles: string[] = []
    roles.push(userInfo.role)

    const menuStore = useMenuStore()
    if (menuStore.Routes.length === 0) {
        // 如果没有菜单则重新获取菜单
        const filterRoutes = menuStore.generateRoutes(roles)
        // 动态添加路由访问表
        filterRoutes.value.forEach((route: any) => {
            router.addRoute(route)
        })
        // 跳转到指定页面
        return next({ ...to, replace: true })
    } else {
        return next()
    }
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
    NProgress.done()
})
/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
    NProgress.done()
    console.log(error)
})
export default router