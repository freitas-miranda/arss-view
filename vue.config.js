const dotenv = require('dotenv')
const env = dotenv.config({ path: '.env' }).parsed

process.env.VUE_APP_API_HOST = env.API_HOST
process.env.VUE_APP_HOST_MD045 = env.HOST_MD045
process.env.VUE_APP_HOST_MD055 = env.HOST_MD055

module.exports = {
  transpileDependencies: ['vuetify'],
  productionSourceMap: false,
  css: {
    extract: process.env.NODE_ENV === 'production' ? { ignoreOrder: true } : false
  },
  pwa: {
    name: 'Controle para Implantação do Estoque',
    themeColor: '#00613B',
    msTileColor: '#00613B',
    manifestOptions: {
      background_color: '#00613B'
    }
  }
}
