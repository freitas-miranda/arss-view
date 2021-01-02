const corStatus = {
  fluxo: {
    Processados: {
      valor: 1,
      cor: '#4CAF50'
    },
    pendentes: {
      valor: 2,
      cor: '#F79400'
    },
    falha: {
      valor: 3,
      cor: '#F44336'
    }
  },
  erro: {
    ok: {
      valor: 1,
      cor: '#4CAF50'
    },
    falha: {
      valor: 2,
      cor: '#F44336'
    }
  }
}

const statusCor = (opcao, item) => {
  try {
    const objCor = Object.entries(corStatus[opcao])

    return objCor[item - 1][1] ? objCor[item - 1][1].cor : '#000000'
  } catch (e) {
    return '#000000'
  }
}

export default {
  reset: () => {},
  setFluxos (state, dados) {
    state.fluxos = dados
  },
  setAuditorias (state, dados) {
    state.auditorias = dados
  },
  setLoading (state, valor) {
    state.loading = valor
  },
  setLoadingCountLojas (state, valor) {
    state.loadingCountLojas = valor
  },
  setTotalLojas (state, valor) {
    state.totalLojas = valor
  },
  setExibirFormulario (state, valor) {
    state.exibirFormulario = valor
  },
  setPesquisarFluxo (state, dados) {
    dados.forEach((item) => {
      if (item.falhas) {
        item.status = 3 // falha
        item.statusDesc = 'FALHA'
      } else if (item.pendentes) {
        item.status = 2 // Pendente
        item.statusDesc = 'PENDENTE'
      } else {
        item.status = 1 // Processado
        item.statusDesc = 'PROCESSADO'
      }

      if (item.erro) {
        item.statusRequisicao = 2 // falha
        item.statusRequisicaoDesc = 'ERRO'
      } else {
        item.statusRequisicao = 1 // Processado
        item.statusRequisicaoDesc = 'OK'
      }

      item.statusDesc = { chip: true, color: statusCor('fluxo', item.status), text: item.statusDesc }
      item.statusRequisicaoDesc = { chip: true, color: statusCor('erro', item.statusRequisicao), text: item.statusRequisicaoDesc }
    })
    state.pesquisarFluxo = dados
  },
  setPesquisarErros (state, dados) {
    dados.forEach((item) => {
      if (item.erro) {
        item.status = 2 // falha
        item.statusDesc = 'ERRO'
      } else {
        item.status = 1 // Processado
        item.statusDesc = 'OK'
      }

      item.statusDesc = { chip: true, color: statusCor('erro', item.status), text: item.statusDesc }
    })
    state.pesquisarErros = dados
  }
}
