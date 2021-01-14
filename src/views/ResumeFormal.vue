<template>
  <formal-resume class="formal-resume" />
</template>

<script>
import FormalResume from '@/components/FormalResume'

export default {
	name: 'ResumeFormal',

	components: {
		FormalResume
	}
}
</script>

<style lang="scss">
.formal-resume {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow: auto;
}
</style>
