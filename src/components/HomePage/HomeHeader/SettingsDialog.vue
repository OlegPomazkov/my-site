<template>
	<div class="header-settings">
		<div class="header-settings__section-title">
			{{ $t('locale_title') }}
		</div>

		<div
			class="header-settings__section-item"
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
	padding: 0.3rem;
	background-color: white;
}
</style>
