import '@/plugins/axios'
import '@/plugins/exibir_formulario'
import '@/plugins/notificacao'
import '@/plugins/registrar_modulo'
import '@/plugins/vee_validate'
import './registerServiceWorker'
import App from './App.vue'
import VUppercase from '@tiig/v-uppercase'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component('divisao', () => import('./components/divisao'))
Vue.component('excluirRegistro', () => import('./components/excluir_registro'))
Vue.component('filtro', () => import('./components/filtro'))
Vue.component('modal', () => import('./components/modal'))
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('pagina', () => import('./components/pagina'))
Vue.component('tabela', () => import('./components/tabela'))

Vue.mixin({
  beforeCreate () {
    if (this.$attrs.store) {
      const path = this.$route.fullPath.replace(/-/g, '_')
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
Vue.use(VueMeta)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
