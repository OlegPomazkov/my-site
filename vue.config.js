module.exports = {
pluginOptions: {
	i18n: {
		locale: 'ru',
		fallbackLocale: 'en',
		localeDir: 'locales',
		enableInSFC: false
	}
},
chainWebpack: config => {
	config.module.rules.delete('svg');
	config.module
		.rule('svg')
		.test(/\.svg$/)
		.use()
		.loader('svg-sprite-loader');
	},
}
