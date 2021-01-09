<template>
	<div class="home-header">
		<div class="home-header__pages">
			<div
				v-for="(item, k) in navConfig"
				class="home-header__pages__link"
				@click="handlePageLinkClicked(k)"
				:key="`${k}_${item.page}`"
			>
				{{ item.label }}
			</div>
		</div>

		<div 
			class="home-header__settings"
			@click="handleSettingsClicked"
		>
			Settings
		</div>
	</div>
</template>

<script>
const HOME_NAV_CONFIG = [
	{
		label: 'РЕЗЮМЕ',
		page: 'About'
	},
	{
		label: 'рЕзЮмЕ',
		page: 'About'
	},
	{
		label: 'ART',
		page: 'About'
	},
	{
		label: 'ИГРЫ',
		page: 'About'
	},
]

export default {
	data() {
		return {
			navConfig: HOME_NAV_CONFIG,
		}
	},

	methods: {
		handlePageLinkClicked(num) {
			this.$router.push({
				name: this.navConfig[num].page
			})
		},
		handleSettingsClicked() {
			console.log('Settings clicked!')
		}
	}
}
</script>

<style lang="scss">
.home-header {
	box-sizing: border-box;
	width: 100%;
	padding-left: 1rem;
	padding-right: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.home-header__pages {
	box-sizing: border-box;
	flex: 1;
	max-width: 40rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;	
}
.home-header__pages__link {
	box-sizing: border-box;
	width: 8rem;
	padding: 0.33rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #999;
	font-weight: bold;
	background-color: white;

	&:hover {
		background-color: #F0F0F0;
		cursor: pointer;
	}
}
</style>
