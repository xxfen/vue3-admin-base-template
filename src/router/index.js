// import Vue from 'vue'   //引入Vue
import {
	createRouter,
	createWebHashHistory
} from 'vue-router' //引入vue-router
// Vue.use(Router)  //Vue全局使用Router

import home from '../views/home.vue'
import login from '../views/login.vue'
import index from '../views/index.vue'
import collect from '../views/collect.vue'
import set from '../views/set.vue'
import img1 from '../views/img1.vue'

const routes = [{
		path: '',
		redirect: "home"
	}, {
		path: '/',
		redirect: "home"
	},
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			title: '登录'
		}
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		/* 子路由 */
		children: [{
				path: '/',
				redirect: "index"
			},{
				path: '',
				redirect: "index"
			}, {
				path: '/index',
				name: 'index',
				component: index,
				meta: {
					title: '首页',
					isTab: true
				}
			},
			{
				path: '/collect',
				name: 'collect',
				component: collect,
				meta: {
					title: '收藏',
					isTab: true
				}
			},
			{
				path: '/img1',
				name: 'img1',
				component: img1,
				meta: {
					title: '图片一',
					isTab: true
				}
			},
			{
				path: '/set',
				name: 'set',
				component: set,
				meta: {
					title: '设置',
					isTab: true
				}
			}
		]
	}
];

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
/* router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next();
	} else {
		let token = localStorage.getItem('Authorization');

		if (token === null || token === '') {
			next('/login');
		} else {
			next();
		}
	}
}); */
const router = createRouter({
	//mode: 'hash',三张模式：hash|history|abstract，默认hash
	history: createWebHashHistory(),
	routes
})
export default router;
