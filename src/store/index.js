import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		locale: 'ru',  // enum with values <'ru'|'en'>
		palette: 'pastel'
	},

	getters: {
		currLocale: state => state.locale,
		currPalette: state => state.palette
	},

	mutations: {
		UPDATE_SETTING(state, {setting, value}) {
			state[setting] = value
		},
	},

	actions: {
		updateSetting({commit}, {setting, value}) {
			commit('UPDATE_SETTING', {
				setting: setting,
				value:value
			})
		},
	},
})
