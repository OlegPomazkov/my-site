<template>
	<div class="home-header">
		<div class="home-header__wrapper">
			<div class="home-header__wrapper__pages">
				<custom-button
					v-for="(item, k) in navConfig"
					:key="`${k}_${item.page}`" 
					:text="$t(item.label)"
					:width="'8rem'"
					:height="'2rem'"
					@clicked="handlePageLinkClicked(k)"
				/>
			</div>

			<custom-button 
				:icon="'settings'"
				@clicked="handleSettingsClicked"
			/>
		</div>
	</div>
</template>

<script>
import CustomButton from '@/components/Commons/CustomButton'

const HOME_NAV_CONFIG = [
	{
		label: 'resume',
		page: 'ResumeFormal'
	},
	{
		label: 'freestyle',
		page: 'About'
	},
	{
		label: 'art',
		page: 'About'
	},
	{
		label: 'games',
		page: 'About'
	},
]

export default {
	components: {
		CustomButton
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
</style>
