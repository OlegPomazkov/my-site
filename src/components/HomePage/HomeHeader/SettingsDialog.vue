<template>
	<div class="header-settings">
		<div class="header-settings__section-title">
			{{ $t('locale_title') }}
		</div>

		<div
			:class="`header-settings__section-item ${isActive(k)}`"
			v-for="(item, k) in locales"
			:key="`${k}_${item.value}`"
			@click="handleItemClicked(k)"
		>
			{{ item.label }}
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

const LOCALES = [
	{
		label: "Русский",
		value: 'ru'
	},
	{
		label: "English",
		value: 'en'
	}
]

export default {
	data() {
		return {
			locales: LOCALES
		}
	},

	computed: {
		...mapGetters(['currLocale'])
	},

	methods: {
		isActive(num) {
			return this.currLocale === this.locales[num].value? 'active': ''
		},
		handleItemClicked(num) {
			this.$i18n.locale = this.locales[num].value
			this.$store.dispatch('setLocale', this.locales[num].value)
		}
	}
}
</script>

<style lang="scss">
.header-settings {
	box-sizing: border-box;
	width: 15rem;
	height: auto;
	padding: 0.3rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: white;
}
.header-settings__section-title {
	box-sizing: border-box;
	width: 100%;
	height: 2.2rem;
	padding: 0.2rem;
	margin-bottom: 0.2rem;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 1rem;
	font-weight: bold;
	color: grey;
	background-color: #f0f0f0;
}
.header-settings__section-item {
	box-sizing: border-box;
	width: 100%;
	height: 1.9rem;
	padding: 0.2rem;
	padding-left: 1rem;
	margin-bottom: 0.1rem;
	cursor: pointer;

	&.active {
		font-weight: bold;
		color: grey;
		background-color: #f8f8f8;
	}
	&:hover {
		opacity: 0.7;
	}
}
</style>
