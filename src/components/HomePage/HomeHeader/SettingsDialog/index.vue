<template>
	<div class="header-settings">
		<settings-section
			:section="localeSection"
			@item-clicked="handleLocaleItemClicked"
		/>

		<settings-section
			:section="paletteSection"
			@item-clicked="handlePaletteItemClicked"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import SettingsSection from './SettingsSection'

import { LOCALES } from '@/assets/constants/locales'
import { PALETTES } from '@/assets/constants/palettes'
import { setPalette } from '@/utils/utils'

export default {
	components: {
		SettingsSection
	},

	data() {
		let palettes = []

		PALETTES.forEach( item => {
			palettes.push({
				value: item.name,
				label: item.label
			})
		})

		return {
			localeSection: {
				title: 'locale_title',
				list: LOCALES,
				isActive: null
			},
			paletteSection: {
				title: 'palette_title',
				list: palettes,
				isActive: null
			}
		}
	},

	computed: {
		...mapGetters([
			'currLocale',
			'currPalette'
		])
	},

	mounted() {
		this.localeSection.isActive = this.currLocale
	},

	methods: {
		handleLocaleItemClicked(num) {
			this.$i18n.locale = this.localeSection.list[num].value
			this.$store.dispatch('updateSetting', {
				setting: 'locale',
				value: this.localeSection.list[num].value
			})
			this.localeSection.isActive = this.currLocale
		},
		handlePaletteItemClicked(num) {
			setPalette(this.paletteSection.list[num].value)
			this.$store.dispatch('updateSetting', {
				setting: 'palette',
				value: this.paletteSection.list[num].value
			})
			this.paletteSection.isActive = this.currPalette
		},
	}
}
</script>

<style lang="scss">
.header-settings {
	box-sizing: border-box;
	width: 15rem;
	height: auto;
	padding: 0.3rem;
}
</style>
