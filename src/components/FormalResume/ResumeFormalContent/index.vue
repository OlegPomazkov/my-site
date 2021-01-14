<template>
	<div class="resume-formal-content">
		<div class="resume-formal-content__header">
			<div class="resume-formal-content__header__name">
				{{ resumeData[locale].name }}
			</div>

			<div class="resume-formal-content__header__position">
				{{ resumeData[locale].position }}
			</div>
			
			<div class="resume-formal-content__header__comments">
				{{ resumeData[locale].comment }}
			</div>
		</div>

		<div class="resume-formal-content__content">
			<div class="resume-formal-content__content__common">
				Skills and contacts here
			</div>

			<div class="resume-formal-content__content__details">
				<details-section 
					:info="resumeData[locale].experience"
				/>

				<details-section 
					:info="resumeData[locale].education"
				/>
				<!-- family/hobby -->
				
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import DetailsSection from './DetailsSection'

import RESUME_DATA from './resume-data'

export default {
	components: {
		DetailsSection,
	},

	data() {
		return {
			resumeData: RESUME_DATA,
		}
	},

	computed: {
		...mapGetters({
			locale: 'currLocale'
		})
	},
}
</script>

<style lang="scss">
.resume-formal-content {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	overflow: auto;
}
.resume-formal-content__header {
	box-sizing: border-box;
	width: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	&__name {
		margin-bottom: 0.1rem;
		font-size: 1.5rem;
		font-weigth: bolder;
		color: grey;
	}
	&__position {
		margin-bottom: 0.25rem;
		font-size: 1.2rem;
		font-weigth: bold;
		color: grey;
	}
	&__comment {
		font-size: 0.9rem;
		font-weigth: regular;
		color: grey;
	}
}
.resume-formal-content__content {
	box-sizing: border-box;
	width: 100%;
	padding: 1rem;
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	overflow: auto;

	&__common {
		box-sizing: border-box;
		width: 25%;
		height: 100%;
		padding: 0.5rem;
		border-right: 1px solid grey;
	}
	&__details {
		box-sizing: border-box;
		height: 100%;
		padding: 0.5rem;
		flex: 1;
	}
}
</style>
