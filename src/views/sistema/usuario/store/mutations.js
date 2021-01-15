export default {
  reset: () => {},
  setDadosExibir (state, dados) {
    state.dadosExibir = dados
  },
  setDropdownPerfis (state, dados) {
    state.dropdownPerfil = dados
  },
  setExibirFormulario (state, valor) {
    state.exibirFormulario = valor
  },
  setLoading (state, valor) {
    state.loading = valor
  },
  setRegistros (state, dados) {
    state.registros = dados
  },
  setImplantacao (state, dados) {
    state.implantacao = dados
  }
}
