import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },
  theme: {
    themes: {
      light: {
        primary: '#00613B',
        secondary: '#009C4D',
        error: '#EB2F06'
      }
    }
  }
})
