import Vue from 'vue'
import axios from 'axios'

const Axios = axios.create({
  baseURL: `${process.env.VUE_APP_HOST_MD060}/api/`
})

Axios.interceptors.response.use((response) => {
  if (response.data) {
    if (typeof response.data.mensagem === 'string') Vue.prototype.$notificacao(response.data.mensagem)
    else if (response.data.md060 && typeof response.data.md060.mensagem === 'string') Vue.prototype.$notificacao(response.data.md060.mensagem)
    else if (typeof response.data.erro === 'string') Vue.prototype.$notificacao(response.data.erro, 'erro')
  }

  return response
}, (error) => {
  let msg = ''

  if (error?.response?.data?.mensagem) msg = error.response.data.mensagem

  if (!error.response) {
    Vue.prototype.$notificacao(`Erro ao processar requisição. </br>${msg}`, 'erro')
  } else if (error.response.status === 403) {
    Vue.prototype.$notificacao('Usuário sem permissão', 'atencao')
  } else if (error.response.status === 404) {
    Vue.prototype.$notificacao('Requisição não encontrada!', 'erro')
  } else if (error.response.status === 500) {
    Vue.prototype.$notificacao(error.response.data.erro || msg, 'erro')
  }

  return Promise.reject(error)
})

Vue.prototype.$axiosMD060 = Axios

export default Axios
