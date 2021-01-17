import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import store from '../store'

const Axios = axios.create({
  baseURL: `${process.env.VUE_APP_API_HOST}/api/`,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('login:token')
  }
})

Axios.interceptors.response.use((response) => {
  if (response.data) {
    if (typeof response.data.mensagem === 'string') Vue.prototype.$notificacao(response.data.mensagem)
    else if (typeof response.data.erro === 'string') Vue.prototype.$notificacao(response.data.erro, 'erro')
    else if (typeof response.data.atencao === 'string') Vue.prototype.$notificacao(response.data.atencao, 'atencao')
    else if (typeof response.data.informacao === 'string') Vue.prototype.$notificacao(response.data.informacao, 'informacao')
  }

  return response
}, (error) => {
  if (!error.response) {
    Vue.prototype.$notificacao('Erro ao processar requisição. Tente novamente!', 'erro')
  } else if (error.response.status === 401) {
    localStorage.removeItem('login:token')
    localStorage.removeItem('login:nome')

    store.commit('app/setNome', null)

    router.push('/login')
  } else if (error.response.status === 403) {
    Vue.prototype.$notificacao('Usuário sem permissão', 'atencao')
  } else if (error.response.status === 404) {
    Vue.prototype.$notificacao('Requisição não encontrada!', 'erro')
  } else if (error.response.status === 500) {
    Vue.prototype.$notificacao(error.response.data.erro || 'Erro ao processar requisição. Tente novamente!', 'erro')
  }

  return Promise.reject(error)
})

Vue.prototype.$axios = Axios

export default Axios
