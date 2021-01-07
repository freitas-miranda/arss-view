export default {
  notificacao: {
    ativo: false,
    cor: null,
    icone: null,
    mensagem: null,
    tempo: null
  },
  titulo: '',
  usuario: localStorage.getItem('arss:usuario') ? window.atob(localStorage.getItem('arss:usuario')) : ''
}
