<template>
	<div class="resume-formal-nav">
		<div  class="resume-formal-nav__control">
			<custom-button 
				:icon="'settings'" 
				@clicked="handleSettingsClicked"
			/>
			<custom-dropdown
				:button-options="{text: 'TesT'}"
			>
				<template v-slot:content>
					Custom content
				</template>
			</custom-dropdown>
		</div>
	</div>
</template>

<script>
import CustomButton from '@/components/Commons/CustomButton'
import CustomDropdown from '@/components/Commons/CustomDropdown'


export default {
	components: {
		CustomButton,
		CustomDropdown
	},

	methods: {
		handleSettingsClicked() {
			console.log('Settings clicked!')
		}
	}
}
</script>

<style lang="scss">
.resume-formal-nav {
	box-sizing: border-box;
	width: 100%;
	max-width: 60rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

</style>
