export default {
  setEmail (state, valor) {
    state.email = valor
  },
  setLoading (state, valor) {
    state.loading = valor
  },
  setLoadingAlterarSenha (state, valor) {
    state.loadingAlterarSenha = valor
  },
  setLoadingLogin (state, valor) {
    state.loadingLogin = valor
  },
  setLoadingLogout (state, valor) {
    state.loadingLogout = valor
  },
  setModalAlterarSenha (state, valor) {
    state.modalAlterarSenha = valor
  },
  setNome (state, valor) {
    state.nome = valor
  },
  setNotificacao (state, { ativo, cor, icone, mensagem, tempo }) {
    state.notificacao = {
      ativo,
      cor,
      icone,
      mensagem,
      tempo
    }
  },
  setTitulo (state, titulo) {
    state.titulo = titulo
  }
}
