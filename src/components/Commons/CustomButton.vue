<template>
	<div 
		:class="buttonClass"
		:style="buttonStyle"
		@click="handleClick"
	>
		<svg
			v-if="icon" 
			width="80%"
			height="80%"
		>
			<use v-bind:xlink:href="`#${icon}`" />
		</svg>

		<span
			v-if="text && !icon"
		>
			{{ text }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'CustomButton',

	props: {
		icon: {
			type: String
		},
		text: {
			type: String
		},
		color: {
			type: String,
			default: () => 'grey'
		},
		backColor: {
			type: String,
			default: () => 'white'
		},
		width: {
			type: String,
			default: () => '2.5rem'
		},
		height: {
			type: String,
			default: () => '2.5rem'
		},
		fontSize: {
			type: String,
			default: () => '1.2rem'
		}
	},

	computed: {
		buttonClass() {
			return (this.text && !this.icon)? 'custom-button text': 'custom-button icon' 
		},
		buttonStyle() {
			return {
				width: this.width,
				height: this.height,
				'background-color': this.backColor,
				color: this.color,
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
.custom-button {
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		opacity: 0.7;
		cursor: pointer;
	}
	&.icon {
		border-radius: 50%;
	}
	&.text {
		border-radius: 3px;

	}
}
</style>