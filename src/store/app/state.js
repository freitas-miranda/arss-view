export default {
  email: localStorage.getItem('login:email') ? window.atob(localStorage.getItem('login:email')) : null,
  nome: localStorage.getItem('login:nome') ? window.atob(localStorage.getItem('login:nome')) : null,
  perfil: localStorage.getItem('login:perfil') ? window.atob(localStorage.getItem('login:perfil')) : null,
  loading: false,
  loadingAlterarSenha: false,
  loadingLogin: false,
  loadingLogout: false,
  modalAlterarSenha: false,
  notificacao: {
    ativo: false,
    cor: null,
    icone: null,
    mensagem: null,
    tempo: null
  },
  titulo: null
}
