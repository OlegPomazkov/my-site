<template>
	<svg 
		:width="width"
		:height="height"
	>
		<use v-bind:xlink:href="`#${name}`" />
	</svg>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		width: {
			type: Number,
			default: () => 16
		},
		height: {
			type: Number,
			default: () => 16
		},
	}
}
</script>

<style lang="scss">
</style>