<template>
	<div 
		class="art-page-one"
		@click="handleClicked"
	>
		ART ONE
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
