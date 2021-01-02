import dayjs from '@/plugins/dayjs'
import moeda from '@tiig/moeda'

export default {
  reset: () => {},
  setDias (state, dados) {
    dados.forEach((item) => {
      item.diaMovimento = dayjs(item.diaMovimento, 'YYYY-MM-DD').format('DD/MM/YYYY')
      item.diferenca = moeda.format(item.diferenca, 3)
    })

    state.dias = dados
  },
  setDiaSelecionado (state, valor) {
    state.diaSelecionado = valor
  },
  setDataSelecionada (state, valor) {
    state.dataSelecionada = valor
  },
  setDiferencas (state, dados) {
    dados.forEach((item) => {
      item.qtdEstoque = moeda.format(item.qtdEstoque, 3)
      item.qtdLoja = moeda.format(item.qtdLoja, 3)
      item.diferenca = moeda.format(item.diferenca, 3)
    })

    state.diferencas = dados
  },
  setEmpresas (state, dados) {
    dados.forEach((item) => {
      item.maisAntigo = item.maisAntigo ? dayjs(item.maisAntigo, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
    })

    state.empresas = dados
  },
  setUltimasAuditorias (state, dados) {
    dados.forEach((item) => {
      item.auditoria = dayjs(item.auditoria, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY HH:mm:ss')
      item.fluxo = `${item.fluxoId} - ${item.fluxo}`
    })

    state.ultimasAuditorias = dados
  },
  setEmpresaSelecionada (state, valor) {
    state.empresaSelecionada = valor
  },
  setFluxos (state, dados) {
    dados.forEach((item) => {
      item.maisAntigo = dayjs(item.maisAntigo, 'YYYY-MM-DD').format('DD/MM/YYYY')
      item.fluxo = `${item.fluxoId} - ${item.fluxo}`
    })

    state.fluxos = dados
  },
  setFluxoSelecionado (state, valor) {
    state.fluxoSelecionado = valor
  },
  setLoading (state, valor) {
    state.loading = valor
  }
}
