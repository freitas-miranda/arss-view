import Vue from 'vue'
import store from '../store'

const notificacao = (mensagem, tipo) => {
  store.commit('app/setNotificacao', {
    ativo: false,
    cor: '',
    icone: '',
    mensagem: '',
    tempo: -1
  })

  let cor = ''
  let icone = ''
  let tempo = 5000

  switch (tipo) {
    case undefined:
      cor = 'success'
      icone = 'mdi-check-circle-outline'
      break
    case 'informacao':
      cor = 'info'
      icone = 'mdi-information'
      break
    case 'atencao':
      cor = 'warning'
      icone = 'mdi-alert'
      break
    case 'erro':
      cor = 'error'
      icone = 'mdi-alert-circle'
      break
  }

  setTimeout(() => {
    store.commit('app/setNotificacao', {
      ativo: true,
      cor,
      icone,
      mensagem,
      tempo
    })
  }, 500)
}

Vue.prototype.$notificacao = notificacao
