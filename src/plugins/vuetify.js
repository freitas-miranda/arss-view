import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#66ACB7',
        secondary: '#424242',
        accent: '#F0F0F0',
        error: '#FF5252',
        info: '#2196F3',
        success: '#08c767',
        warning: '#FFC107',
        'ig-secondary': '#009C4D'
      }
    }
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
