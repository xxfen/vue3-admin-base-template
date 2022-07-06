<template v-slot:default>
	<div :class="['content',isCollapse?'menu--fold':'menu--unfold']">
		<!-- 侧边菜单栏 -->
		<div class="menuLeft">
			<div class="menu-nav-header">
				<span>{{isCollapse?littleTitle:longTitle}}</span>
			</div>
			<el-menu active-text-color="#fff" background-color="#263238" class="el-menu-vertical-demo"
				:collapse-transition="false" text-color="#96a4ab " @open="handleOpen" @close="handleClose"
				:collapse="isCollapse">
				<template v-for="(item,index) in menus">

					<el-menu-item v-if="!item.submenu" :index="index" @click="$router.push({ name: item.routerName })"
						:disabled="item.disabled">
						<SvgIcon :name="item.iconName" class="icon-svg" />
						<span slot="">&nbsp;&nbsp;{{item.name}}</span>
					</el-menu-item>
					<el-sub-menu v-else :index="index">
						<template #title>
							<SvgIcon :name="item.iconName" class="icon-svg" />
							<span slot="">&nbsp;&nbsp;{{item.name}}</span>
						</template>
						<template v-for="(submenuItem,submenuIndex) in item.submenu">

							<el-menu-item v-if="!submenuItem.submenu" :index="index+'-'+submenuIndex"
								:disabled="submenuItem.disabled"
								@click="$router.push({ name: submenuItem.routerName })">
								<SvgIcon :name="submenuItem.iconName" class="icon-svg" />
								<span slot="">&nbsp;&nbsp;{{submenuItem.name}}</span>
							</el-menu-item>
							<el-sub-menu v-else :index="index+'-'+submenuIndex">
								<template #title>
									<SvgIcon :name="submenuItem.iconName" class="icon-svg" />
									<span slot="">&nbsp;&nbsp;{{submenuItem.name}}</span>
								</template>
								<el-menu-item v-for="(item3,index3) in submenuItem.submenu" :index="index"
									:disabled="item3.disabled" @click="$router.push({ name: item3.routerName })">
									<SvgIcon :name="item3.iconName" class="icon-svg" />
									<span slot="">&nbsp;&nbsp;{{item3.name}}</span>
								</el-menu-item>

							</el-sub-menu>
						</template>
					</el-sub-menu>
				</template>
			</el-menu>
		</div>
		<!-- 右边内容 -->
		<div class="content-main">
			<div class="navTop horizontalView">
				<div class="nav_tools horizontalView">
					<SvgIcon :name="isCollapse?'expand':'fold'" class="icon-svg" @click="isCollapse=!isCollapse" />
				</div>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item v-if="!breadcrumbList.size && breadcrumbList[0]!='首页'" :to="{ name: 'index' }">
						首页
					</el-breadcrumb-item>
					<el-breadcrumb-item v-for="it in breadcrumbList">{{it}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<!-- todo 内容组件 -->
			<el-tabs v-if="$route.meta.isTab" v-model="mainTabsActiveName" :closable="true"
				@tab-click="selectedTabHandle" @tab-remove="removeTabHandle">
				<!-- <el-dropdown class="site-tabs__tools" trigger="click">
					<SvgIcon name="arrow-down" class="icon-svg" />
					<template #dropdown>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="tabsCloseCurrentHandle">
								关闭当前标签页
							</el-dropdown-item>
							<el-dropdown-item @click.native="tabsCloseOtherHandle">
								关闭其它标签页
							</el-dropdown-item>
							<el-dropdown-item @click.native="tabsCloseAllHandle">
								关闭全部标签页
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown> -->
				<el-scrollbar ref="scroll" :height="siteContentViewHeight+32+'px'" @scroll="scroll">
					<el-tab-pane v-for="item in mainTabs" :label="item.title" :name="item.name">
						<el-card :style="'min-height:'+siteContentViewHeight + 'px'">

							<router-view v-if="item.name === mainTabsActiveName" />
						</el-card>
					</el-tab-pane>
				</el-scrollbar>
			</el-tabs>
			<div v-else>
				<el-scrollbar ref="scroll" :height="siteContentViewHeight+32+'px'" @scroll="scroll">
					<!-- 主入口标签页 e -->
					<el-card :style="'min-height:'+ siteContentViewHeight + 'px'">
						<router-view />
					</el-card>
				</el-scrollbar>
			</div>
		</div>
	</div>
</template>

<script>
	import mu from '../router/menu/menu.js';

	export default {
		components: {

		},
		data: function() {
			return {
				isCollapse: false,
				mainTabs: [],
				mainTabsActiveName: '',
				menuActiveName: '',
				menus: [],
				longTitle: '',
				littleTitle: '',
				breadcrumbObj: {},
				breadcrumbList: []
			}
		},
		created() {
			let that = this;
			that.routeHandle(that.$route);
			that.menus = mu.items;
			that.longTitle = mu.longTitle;
			that.littleTitle = mu.littleTitle;
			that.breadcrumbList = [
				that.$route.meta.title
			]
		
			//菜单项层级处理，做一个面包屑集合保存
			var mus=that.menus
			for (let i1 of mus) {
				if (i1.submenu) {
					for (let i2 of i1.submenu) {
						if (i2.submenu) {
							for (let i3 of i2.submenu) {
								if (!i3.submenu) {
									that.breadcrumbObj[i3.name] = [i1.name, i2.name, i3.name];
								}
							}
						} else {
							that.breadcrumbObj[i2.name] = [i1.name, i2.name];
							console.log(i2.name)
						}
					}
				} else {
					that.breadcrumbObj[i1.name] = [i1.name];
					console.log(i1.name)
				}
			}
		},
		// 监听路由变化
		watch: {
			$route: {
				handler(to, from) {
					if (to.path != from.path) {
						// 处理路由
						this.routeHandle(to);
						this.breadcrumbList = this.breadcrumbObj[to.meta.title]
					}
					/* console.log(to.meta.title)
					
					console.log(this.breadcrumbList) */
				}
			}
		},
		methods: {
			selectedTabHandle: function(tab, e) {
				tab = this.mainTabs.filter(item => item.name === tab.paneName);
				if (tab.length >= 1) {
					this.$router.push({
						name: tab[0].name,
						query: tab[0].query,
						params: tab[0].params
					});
				}
			},
			removeTabHandle: function(tabName) {
				this.mainTabs = this.mainTabs.filter(item => item.name !== tabName);
				if (this.mainTabs.length >= 1) {
					// 当前选中tab被删除
					if (tabName === this.mainTabsActiveName) {
						var tab = this.mainTabs[this.mainTabs.length - 1];
						this.$router.push(
							{ name: tab.name, query: tab.query, params: tab.params },
							() => {
								this.mainTabsActiveName = this.$route.name;
							}
						);
					}
				} else {
					this.menuActiveName = '';
					this.$router.push({ name: 'Home' });
				}
			},
			resetDocumentClientHeight: function() {
				this.documentClientHeight = document.documentElement['clientHeight'];
				window.onresize = () => {
					this.documentClientHeight = document.documentElement['clientHeight'];
					this.loadSiteContentViewHeight();
				};
			},
			loadSiteContentViewHeight: function() {
				let height = this.documentClientHeight - 52; //减去导航栏高度50 
				console.log(this.$route.meta.isTab)
				if (this.$route.meta.isTab) {
					height -= 70; //减去tab栏高度40,减去上下边距30
					/* this.siteContentViewHeight = {
						'min-height': height + 'px'
					}; */
					this.siteContentViewHeight = height;
				} else {
					height -= 30;
					//给内容区设置高度
					/* this.siteContentViewHeight = {
						'min-height': height + 'px'
					}; */
					this.siteContentViewHeight = height;
				}

			},
			routeHandle: function(route) {
				//每次切换页面，重新计算页面高度和内容区高度
				this.resetDocumentClientHeight();
				this.loadSiteContentViewHeight();
				if (route.meta.isTab) {
					// tab选中, 不存在先添加
					var tab = this.mainTabs.filter(item => item.name === route.name)[0];
					if (!tab) {
						if (route.meta.isDynamic) {
							route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0];
							if (!route) {
								return console.error('未能找到可用标签页!');
							}
						}
						tab = {
							menuId: route.meta.menuId || route.name,
							name: route.name,
							title: route.meta.title,
							iframeUrl: route.meta.iframeUrl || '',
							params: route.params,
							query: route.query
						};
						this.mainTabs = this.mainTabs.concat(tab);
					}
					this.menuActiveName = tab.menuId + '';
					this.mainTabsActiveName = tab.name;
				}

			},
			mounted: function() {
				let that = this;
				that.resetDocumentClientHeight();
				that.loadSiteContentViewHeight();
			}
		}
	}
</script>

<style>
	@import url('../assets/css/home.css');
</style>
