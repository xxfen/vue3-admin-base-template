<template>
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
</template>

<script setup>
</script>

<style>
</style>