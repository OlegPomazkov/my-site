import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		locale: 'ru'  // enum with values <'ru'|'en'>
	},

	getters: {
		currLocale: state => state.locale
	},

	mutations: {
		SET_LOCALE(state, locale) {
			state.locale = locale
		}
	},

	actions: {
		setLocale({commit}, locale) {
			commit('SET_LOCALE', locale)
		}
	},
})
