<template>
	<div 
		ref="dropdown"
		class="custom-dropdown"
	>
		<custom-button
			class="custom-dropdown__control"
			:icon="buttonOptions.icon"
			:text="buttonOptions.text"
			:color="buttonOptions.color? buttonOptions.color: 'grey'"
			:backColor="buttonOptions.backColor?buttonOptions.backColor:'white'"
			:width="buttonOptions.width? buttonOptions.width: '2.5rem'"
			:height="buttonOptions.height? buttonOptions.height: '2.5rem'"
			:fontSize="buttonOptions.fontSize? buttonOptions.fontSize: '1.2rem'" 
			@clicked="handleClick"
		/>

		<div 
			v-if="isVisible"
			class="custom-dropdown__content"
			:style="contentStyle"
			@click="handleContentClicked"
		>
			<slot name="content">No content</slot>	
		</div>
	</div>
</template>

<script>
import CustomButton from '@/components/Commons/CustomButton'

export default {
	name: 'CustomDropdown',

	components: {
		CustomButton
	},

	props: {
		buttonOptions: {
			type: Object,
			required: true,
			default: () => {
				return {
					text: '-',
					color: 'grey',
					backColor: 'white',
					width: '2.5rem',
					height: '2.5rem',
					fontSize: '1.2rem'
				}
			}
		}
	},

	data() {
		return {
			isVisible: false
		}
	},

	computed: {
		contentStyle() {
			return {
				top: `${this.$refs.dropdown.offsetHeight}px`
			}
		}
	},

	methods: {
		handleClick() {
			this.isVisible = !this.isVisible
		},
		handleContentClicked() {
			this.isVisible = !this.isVisible
		},
	}
}
</script>

<style lang="scss">
@keyframes appear-down {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.custom-dropdown {
	position: relative;
}
.custom-dropdown__content {
	position: absolute;
	top: 25;
	right: 0;
	z-index: 100;

	animation-name: appear-down;
	animation-duration: 2s;
}
</style>