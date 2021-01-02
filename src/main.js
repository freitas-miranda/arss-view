import '@/plugins/axios'
import '@/plugins/axios_md045'
import '@/plugins/criar_coluna'
import '@/plugins/dayjs'
import '@/plugins/exibir_formulario'
import '@/plugins/exportar_excel'
import '@/plugins/formatar_data'
import '@/plugins/formatar_numero'
import '@/plugins/notificacao'
import '@/plugins/registrar_modulo'
import '@/plugins/state_screen'
import '@/plugins/vee_validate'
import './registerServiceWorker'
import '@mdi/font/css/materialdesignicons.min.css'

import App from './App.vue'
import VUppercase from '@tiig/v-uppercase'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueMeta from 'vue-meta'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component('aviso', () => import('./components/aviso'))
Vue.component('divisao', () => import('./components/divisao'))
Vue.component('excluirRegistro', () => import('./components/excluir_registro'))
Vue.component('filtro', () => import('./components/filtro'))
Vue.component('loading', () => import('./components/loading'))
Vue.component('modal', () => import('./components/modal'))
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('pagina', () => import('./components/pagina'))
Vue.component('tabela', () => import('./components/tabela'))
Vue.component('totais', () => import('./components/totais'))

Vue.mixin({
  beforeCreate () {
    if (this.$attrs.store) {
      let path = this.$route.fullPath.replace(/-/g, '_')

      if (path === '/tv') {
        path = '/dashboard'
      }

      const modulo = require(`@/views${path}/store/`)

      this.$registrarModulo(this.$attrs.store, modulo.default)
    }
  },
  methods: {
    erroValidacao (erro) {
      return !erro.length
    }
  }
})

Vue.use(VUppercase)
Vue.use(VueClipboard)
Vue.use(VueMeta)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
