const dotenv = require('dotenv')
const env = dotenv.config({ path: '.env' }).parsed

process.env.VUE_APP_API_HOST = env.API_HOST

module.exports = {
  transpileDependencies: ['vuetify'],
  productionSourceMap: false,
  pwa: {
    name: 'ARSS',
    themeColor: '#00613B',
    msTileColor: '#00613B',
    manifestOptions: {
      background_color: '#00613B'
    }
  }
}
