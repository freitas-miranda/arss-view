import '@/plugins/axios'
import '@/plugins/criar_coluna'
import '@/plugins/crypto'
import '@/plugins/dayjs'
import '@/plugins/exibir_formulario'
import '@/plugins/exportar_excel'
import '@/plugins/formatar_data'
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
import { cpf } from './plugins/cpf'
import { facade } from 'vue-input-facade'
import { fdate } from './plugins/fdate'
import { mask } from 'vue-the-mask'
import router from './router'
import store from './store'
import uppercase from './plugins/uppercase'
import vuetify from './plugins/vuetify'

Vue.prototype.$cpf = cpf
Vue.prototype.$fdate = fdate

Vue.config.productionTip = false

Vue.component('alterarSenha', () => import('./components/alterar_senha'))
Vue.component('aviso', () => import('./components/aviso'))
Vue.component('loading', () => import('./components/loading'))
Vue.component('modal', () => import('./components/modal'))
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('datePicker', () => import('./components/date_picker'))
Vue.component('divisao', () => import('./components/divisao'))
Vue.component('excluirRegistro', () => import('./components/excluir_registro'))
Vue.component('filtro', () => import('./components/filtro'))
Vue.component('pagina', () => import('./components/pagina'))
Vue.component('tabela', () => import('./components/tabela'))
Vue.component('totais', () => import('./components/totais'))

Vue.directive('mask', mask)
Vue.directive('facade', facade)
Vue.directive('uppercase', uppercase)

Vue.mixin({
  beforeCreate () {
    if (this.$attrs.store) {
      let path = this.$route.fullPath.replace(/-/g, '_')

      if (path === '/') {
        path = '/inicio'
      } else
      if (path.includes('/confirmar_cadastro')) {
        path = '/autenticacao/confirmar_cadastro'
      } else
      if (path.includes('/alterar_senha')) {
        path = '/autenticacao/alterar_senha'
      } else
      if (path.includes('/recuperar_senha')) {
        path = '/autenticacao' + path
      } else
      if (path.includes('/cadastrar')) {
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
