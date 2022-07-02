var mu = {
	longTitle: '管理控制台',
	littleTitle: '控制台',
	items: [{
			iconName: 'home',
			name: '首页',
			routerName: 'index',
			disabled: false
		}, {
			iconName: 'img',
			name: '图片管理',
			submenu: [{
				iconName: 'img',
				name: '图片一',
				routerName: 'img1',
				disabled: false
			}, {
				iconName: 'img',
				name: '图片二',
				routerName: 'img2',
				disabled: false
			}, {
				iconName: 'img',
				name: '图片三管理',
				submenu: [{
					iconName: 'img',
					name: '图片三',
					routerName: 'img1',
					disabled: false
				}]

			}]
		},
		{
			iconName: 'collection',
			name: '收藏管理',
			submenu: [{
				iconName: 'collection',
				name: '收藏',
				routerName: 'collect',
				disabled: false
			}]
		},
		{
			iconName: 'about',
			name: '设置',
			routerName: 'set',
			disabled: false
		}

	]
}
export default mu;
