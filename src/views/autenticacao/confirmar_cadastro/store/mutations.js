export default {
  reset: () => {},
  setDadosSolicitacao (state, dados) {
    state.dadosSolicitacao = dados
  },
  setLoading (state, valor) {
    state.loading = valor
  },
  setLoadingPrincipal (state, valor) {
    state.loadingPrincipal = valor
  }
}
