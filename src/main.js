import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App) //创建VUE对象
//导入路由配置
import router from './router'
app.use(router)

import VueWechatTitle from 'vue-wechat-title'; 
app.use(VueWechatTitle)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

//导入Svg图片插件，可以在页面上显示Svg图片
import 'virtual:svg-icons-register'
import SvgIcon from "./components/SvgIcon.vue";
app.component('SvgIcon',SvgIcon)

//定义全局的数据变量
// Vue.prototype.$data = {};

app.mount('#app')
