export default {
  reset: () => {},
  setDadosExibir (state, dados) {
    state.dadosExibir = dados
  },
  setExibirFormulario (state, valor) {
    state.exibirFormulario = valor
  },
  setLoading (state, valor) {
    state.loading = valor
  },
  setRegistros (state, dados) {
    state.registros = dados
  }
}
