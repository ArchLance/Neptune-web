// 引入createApp用于创建应用
import { createApp } from 'vue'
// 引入App根组件
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import pinia from '@/store/'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import SvgIcon from './components/svg-icon/Index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('svg-icon', SvgIcon)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')