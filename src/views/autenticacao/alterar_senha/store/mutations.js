export default {
  reset: () => {},
  setDadosRecuperacao (state, dados) {
    state.dadosRecuperacao = dados
  },
  setLoading (state, valor) {
    state.loading = valor
  },
  setLoadingPrincipal (state, valor) {
    state.loadingPrincipal = valor
  }
}
