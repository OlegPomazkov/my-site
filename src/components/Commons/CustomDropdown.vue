<template>
	<div class="custom-dropdown">
		
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
		icon: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: () => 'white'
		},
		size: {
			type: String,
			default: () => '2.5rem'
		},
	},

	computed: {
		buttonStyle() {
			return {
				width: this.size,
				height: this.size,
				'background-color': this.color
			}
		}
	},

	methods: {
		handleClick() {
			this.$emit('clicked')
		}
	}
}
</script>

<style lang="scss">
.custom-icon-button {
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;

	&:hover {
		opacity: 0.7;
		cursor: pointer;
	}
}
</style>