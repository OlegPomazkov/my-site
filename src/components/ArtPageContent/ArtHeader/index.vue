<template>
	<div class="art-page-header-wrapper">
		<div class="art-page-header">
			<custom-button
				class="art-page-header__control"
				:icon="'home'"
				@clicked="handleNavAction('home')"
			/>

			<div class="art-page-header__title">
				TITLE
			</div>

			<div class="art-page-header__control">
				LOCALE
			</div>
		</div>
	</div>
</template>

<script>
import CustomButton from '@/components/Commons/CustomButton'

export default {
	components: {
		CustomButton
	},

	methods: {
		handleNavAction(type) {
			switch(type) {
				case 'home': 
					this.$router.push({name: 'Home'})
					break
				default: 
					console.error(`Unknown nav action: ${type}!`)
			}
		}
	}
}
</script>

<style lang="scss">
.art-page-header-wrapper {
	box-sizing: border-box;
	width: 100%;
	height: 4rem;
}
.art-page-header {
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
.art-page-header__pages {
	box-sizing: border-box;
	flex: 1;
	max-width: 40rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;	
}
.art-page-header__control {	
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
