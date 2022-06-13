module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				appId: 'Yandex.Music',
				win: {
					icon: 'dist_electron/icons/win/icon.ico'
				},
				mac: {
					icon: 'dist_electron/icons/mac/icon.icns'
				}
			}
		}
	},
	chainWebpack: config => config.resolve.extensions.prepend('.mjs').prepend('.wasm')
};
