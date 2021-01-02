export default {
  notificacao: {
    ativo: false,
    cor: null,
    icone: null,
    mensagem: null,
    tempo: null
  },
  titulo: '',
  usuario: localStorage.getItem('md058-view:usuario') ? window.atob(localStorage.getItem('md058-view:usuario')) : ''
}
