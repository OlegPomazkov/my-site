<template>
	<div 
		class="move-field"
		@click="handleClicked"
	>
		ART LIST
	</div>
</template>

<script>
export default {
	methods: {
		handleClicked() {
			this.$emit('clicked')
		}
	}
}
</script>

<style lang="scss">
</style>
