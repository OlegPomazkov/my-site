<template>
	<div
		class="moving-object"
		:style="objectStyle"
	>
		{{ num }}
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
		num: {
			type: Number
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
			}
		}
	}
}
</script>

<style lang="scss">
.moving-object {
	position: absolute;
}
</style>
