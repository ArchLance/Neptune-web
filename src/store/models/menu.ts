import { defineStore } from 'pinia'
import { asyncRoutes, staticRoutes } from '@/router'
import { ref } from 'vue'
export const useMenuStore = defineStore('menuState', () => {

    // eslint-disable-next-line prefer-const
    const Routes: any = ref([])
    const filterRoutes: any = ref([])
    const userRoles = ref([])
    function generateRoutes(roles: string[]) {
        // 获得根据roles过滤后的动态路由
        filterRoutes.value = filterAsyncRoutes(asyncRoutes, roles)
        // 拼接静态路由和动态路由
        Routes.value = staticRoutes.concat(filterRoutes)
        return filterRoutes
    }
    function setRoles(roles: any) {
        userRoles.value = roles
    }
    return {
        Routes,
        filterRoutes,
        userRoles,
        generateRoutes,
        setRoles
    }
})
// 函数遍历routes数组，对每个路由对象进行浅拷贝。如果路由对象的角色与用户角色匹配，
// 则将该路由添加到结果数组中。如果路由对象包含子路由，则递归调用函数过滤子路由。
// 最后，返回过滤后的路由数组。
export function filterAsyncRoutes(routes: any, roles: string[]) {
    const res: any = []
    routes.forEach((route: any) => {
        // 主要用于将一个对象的所有可枚举属性复制到一个新的对象。
        // 这样做的好处是可以得到一个route对象的浅拷贝。
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}
function hasPermission(roles: any, route: any) {
    if (route.meta && route.meta.role) {
        // some() 方法用于检测数组中的元素是否满足指定条件（通过函数）
        // 这里是查找当前role是否在route.meta.role中，如果存在返回true
        // 不存在则返回false
        return roles.some((role: any) => route.meta.role.indexOf(role) >= 0)
    } else {
        // 如果没有角色限制则直接返回true
        return true
    }
}
