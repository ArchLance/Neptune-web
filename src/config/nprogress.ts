import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 下方配置实现了一个在页面顶部显示的进度条功能。
// NProgress是一个轻量级的进度条库，专为Ajax和Web应用的页面加载进度而设计。
// 它自动处理开始和结束的逻辑，使得在异步操作（如Ajax请求）进行时，
// 用户可以看到一个直观的进度提示，从而提升用户体验。
NProgress.configure({
    easing: "ease", // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
})
// 暴露NProgress
export default NProgress