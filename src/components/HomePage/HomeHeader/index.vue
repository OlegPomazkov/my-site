<template>
	<div class="home-header">
		<div class="home-header__wrapper">
			<div class="home-header__wrapper__pages">
				<custom-button
					v-for="(item, k) in navConfig"
					:key="`${k}_${item.page}`" 
					:text="$t(item.page)"
					:width="'8rem'"
					:height="'2rem'"
					@clicked="handlePageLinkClicked(k)"
				/>
			</div>

			<custom-dropdown
				class="home-header__wrapper__control"
				:button-options="{'icon': 'settings'}"
			>
				<template v-slot:content>
					<settings-dialog />
				</template>
			</custom-dropdown>
		</div>
	</div>
</template>

<script>
import CustomButton from '@/components/Commons/CustomButton'
import CustomDropdown from '@/components/Commons/CustomDropdown'
import SettingsDialog from './SettingsDialog'

const HOME_NAV_CONFIG = [
	{
		page: 'ResumeFormal'
	},
	{
		page: 'Art'
	},
	{
		page: 'Freestyle'
	},
	{
		page: 'Games'
	},
]

export default {
	components: {
		CustomButton,
		CustomDropdown,
		SettingsDialog,
	},

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
			console.log('Settings HOME clicked!')
		}
	}
}
</script>

<style lang="scss">
.home-header {
	box-sizing: border-box;
	width: 100%;
	height: 4rem;
}
.home-header__wrapper {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	max-width: 60rem;
	margin-left: auto;
	margin-right: auto;
	padding-left: 1rem;
	padding-right: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.home-header__wrapper__pages {
	box-sizing: border-box;
	flex: 1;
	max-width: 40rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;	
}
.home-header__wrapper__control {	
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
