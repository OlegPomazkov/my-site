<template>
	<div
		ref="moving-object"
		class="moving-object"
		:style="objectStyle"
		@click="handleObjectClicked"
	>
		{{ $t(label) }}
	</div>
</template>

<script>
export default {
	props: {
		objProps: {
			type: Object,
			required: true,
			default: () => {
				return {
					top: 140,
					left: 50,
					w: 50,
					h: 50,
					color: 'yellow',
					direction: 'right'
				}
			}
		},
		label: {
			type: String,
			default: () => ''
		}
	},

	data() {
		return {
			fontSize: 11,
		}
	},

	computed: {
		objectStyle() {
			return {
				'top': `${this.objProps.top}px`,
				'left': `${this.objProps.left}px`,
				'width': `${this.objProps.w}px`,
				'height': `${this.objProps.h}px`,
				'background-color': this.objProps.color,
				'z-index': `${this.label? 10: 0}`,
				'font-size': `${this.fontSize}px`,
			}
		},
	},

	mounted() {
		this.updateFontSize()
		this.$el.addEventListener('resize', this.updateFontSize)
	},

	beforeDestroy() {
		this.$el.addEventListener('resize', this.updateFontSize)
	},

	methods: {
		updateFontSize() {
			let w = (+this.$el.offsetWidth)*0.125
			let h = (+this.$el.offsetheight)*0.7

			this.fontSize = (w > h)? h: w
		},
		handleObjectClicked() {
			this.$emit('clicked')
		}
	},
}
</script>

<style lang="scss">
.moving-object {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	color: grey;
}
</style>
