import statusCor from '@tiig/status-cor'

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
    dados.forEach((item) => {
      item.status = { cor: statusCor(item.status), status: item.status }
    })

    state.registros = dados
  }
}
