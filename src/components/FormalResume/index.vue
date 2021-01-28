<template>
	<div class="resume-formal">
		<!--
		<resume-formal-nav class="resume-formal__nav"/>
		-->
		<resume-formal-content class="resume-formal__content" />
	</div>
</template>

<script>
// import ResumeFormalNav from './ResumeFormalNav'
import ResumeFormalContent from './ResumeFormalContent'

export default {
	components: {
//		ResumeFormalNav,
		ResumeFormalContent,
	}
}
</script>

<style lang="scss">
.resume-formal {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
	padding-top: 0.8rem;
	padding-bottom: 0.8rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
/*
.resume-formal__nav {
	box-sizing: border-box;
	width: 100%;
	height: 4rem;
}
*/
.resume-formal__content {
	max-width: 60rem;
	background-color: white;
}
</style>