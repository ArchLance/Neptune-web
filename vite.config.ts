import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./viteenv",
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    //port: 5173,//设置服务启动端口号，是一个可选项，不要设置为本机的端口号，可能会发生冲突
    //open: true,//是否自动打开浏览器，可选项
    //cors: true,//允许跨域。
    // 设置代理
    proxy: {
      // 将请求代理到另一个服务器
      '/api': {
        target: 'http://127.0.0.1:9001',//这是你要跨域请求的地址前缀
        changeOrigin: true,//开启跨域
        secure: false,
        // agent: httpAgent
        //rewrite: path => path.replace(/^\/api/, ''),//去除前缀api
      },
      // '/static': {
      //   target: 'http://127.0.0.1:9001',//这是你要跨域请求的地址前缀
      //   changeOrigin: true,//开启跨域
      //   // rewrite: path => path.replace(/^\/media/, ''),//去除前缀api
      // }
    }
  }
})
