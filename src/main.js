import '@/plugins/axios'
import '@/plugins/crypto'
import '@/plugins/dayjs'
import '@/plugins/in_array'
import '@/plugins/notificacao'
import '@/plugins/registrar_modulo'
import '@/plugins/vee_validate'
import './registerServiceWorker'
import 'animate.css'
import App from './App.vue'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueMeta from 'vue-meta'
import { mask } from 'vue-the-mask'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component('alterarSenha', () => import('./components/alterar_senha'))
Vue.component('aviso', () => import('./components/aviso'))
Vue.component('loading', () => import('./components/loading'))
Vue.component('modal', () => import('./components/modal'))
Vue.component('notificacao', () => import('./components/notificacao'))

Vue.directive('mask', mask)

Vue.mixin({
  beforeCreate () {
    if (this.$attrs.store) {
      let path = this.$route.fullPath.replace(/-/g, '_')

      if (path === '/') path = '/inicio'
      else if (path.includes('/confirmar_cadastro')) {
        path = '/autenticacao/confirmar_cadastro'
      } else if (path.includes('/alterar_senha')) {
        path = '/autenticacao/alterar_senha'
      } else if (path.includes('/recuperar_senha')) {
        path = '/autenticacao' + path
      } else if (path.includes('/cadastrar')) {
        path = '/autenticacao/cadastrar'
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

Vue.use(VueClipboard)
Vue.use(VueMeta)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
