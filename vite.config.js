import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  	vue(),
	createSvgIconsPlugin({
	        // 指定需要缓存的图标文件夹
	        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
	        // 指定symbolId格式
	        symbolId: '[name]',
	      })
  ]
})
