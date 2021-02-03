const dotenv = require('dotenv')
const env = dotenv.config({ path: '.env' }).parsed

process.env.VUE_APP_API_HOST = env.API_HOST
process.env.VUE_APP_PORT = env.APP_PORT

module.exports = {
  'transpileDependencies': [
    '@ianwalter/vuex-reset',
    'vuetify'
  ],
  productionSourceMap: false,
  pwa: {
    name: 'ARSS',
    themeColor: '#18BCA6',
    msTileColor: '#18BCA6',
    manifestOptions: {
      background_color: '#18BCA6'
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production' ? { ignoreOrder: true } : false
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
}
