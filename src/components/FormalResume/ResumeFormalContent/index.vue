<template>
	<div class="resume-formal-content">
		<div class="resume-formal-content__header">
			<div class="content-wrapper">	
				<div class="content-wrapper__name">
					{{ resumeData[locale].name }}
				</div>

				<div class="content-wrapper__position">
					{{ resumeData[locale].position }}
				</div>
				
				<div class="content-wrapper__comments">
					{{ resumeData[locale].comment }}
				</div>
			</div>

			<div 
				class="content-control"
				@click="handleHomeClicked"
			>
				{{ $t('coming_soon_home') }}
			</div>
		</div>

		<div class="resume-formal-content__content">
			<div class="resume-formal-content__content__common">
				<details-section 
					:info="resumeData[locale].commonsSummary"
				/>
			</div>

			<div class="resume-formal-content__content__details">
				<details-section 
					:info="resumeData[locale].experience"
				/>

				<details-section 
					:info="resumeData[locale].education"
				/>

				<details-section 
					:info="resumeData[locale].addons"
				/>				
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

	methods: {
		handleHomeClicked() {
			this.$router.push({name: "Home"})
		}
	}
}
</script>

<style lang="scss">
.resume-formal-content {
	box-sizing: border-box;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	overflow: hidden;
}
.resume-formal-content__header {
	box-sizing: border-box;
	width: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;

	.content-wrapper {
		box-sizing: border-box;
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
	.content-control {
		box-sizing: border-box;
		width: 8rem;
		height:3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-weigth: bold;
		color: grey;
		border: 2px solid grey;
		background-color: #f5f5f5;
		border-radius: 1.5rem;

		&:hover {
			cursor: pointer;
			background-color: #f0f0f0;
			border-color: #909090;
		}
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
	}
	&__details {
		box-sizing: border-box;
		height: 100%;
		padding: 0.5rem;
		flex: 1;
		background-color: #f5f5f5;
		overflow: auto;
	}
}
</style>
