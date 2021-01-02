import axios from '@/plugins/axios'
import axiosMD045 from '@/plugins/axios_md045'
import dayjs from '@/plugins/dayjs'

export const obterDias = async ({ commit, state }, fluxo) => {
  try {
    commit('setLoading', true)

    const res = await axios.get(`auditoria/dias/${state.empresaSelecionada}/${fluxo}`)

    if (res.data.registros) {
      commit('setDias', res.data.registros)
      commit('setFluxoSelecionado', fluxo)
      commit('setDiaSelecionado', null)
      commit('setDataSelecionada', null)
      commit('setDiferencas', [])
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const obterDiferencas = async ({ commit }, event) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('auditoria/diferencas/' + event.auditoriaId)

    if (res.data.registros) {
      commit('setDiferencas', res.data.registros)
      commit('setDiaSelecionado', event.auditoriaId)
      commit('setDataSelecionada', dayjs(event.diaMovimento, 'DD/MM/YYYY').format('YYYY-MM-DD'))
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const obterEmpresas = async ({ commit }) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('auditoria/empresas')

    if (res.data.registros) commit('setEmpresas', res.data.registros)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const obterUltimasAuditorias = async ({ commit }) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('auditoria/ultimas')

    if (res.data.registros) commit('setUltimasAuditorias', res.data.registros)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const obterEndpointMd045 = async ({ commit }, empresa) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('endpoint/exibir/MD045/' + empresa)

    if (res.data.host) {
      axiosMD045.defaults.baseURL = res.data.host + 'api/'
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const obterFluxos = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('auditoria/fluxos/' + id)

    if (res.data.registros) {
      commit('setFluxos', res.data.registros)
      commit('setEmpresaSelecionada', id)
      commit('setFluxoSelecionado', null)
      commit('setDiaSelecionado', null)
      commit('setDataSelecionada', null)
      commit('setDias', [])
      commit('setDiferencas', [])
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const processarAuditoriaDia = async ({ commit, dispatch, state }, dia) => {
  try {
    commit('setLoading', true)

    const res = await axiosMD045.post('auditoria/dia', {
      diaMovimento: dia,
      fluxoId: state.fluxoSelecionado,
      qtdDias: 1
    })

    const empresa = state.empresaSelecionada
    const fluxo = state.fluxoSelecionado

    await dispatch('obterEmpresas')
    await dispatch('obterFluxos', empresa)
    await dispatch('obterDias', fluxo)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const processarDiferenca = async ({ commit, dispatch, rootState, state }, auditoria) => {
  try {
    commit('setLoading', true)

    const res = await axiosMD045.post('auditoria/documentos', {
      auditoriaId: auditoria,
      login: rootState.app.usuario
    })

    if (state.diaSelecionado) {
      dispatch('obterDiferencas', auditoria)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const processarEnvioFila = async ({ commit, dispatch }, dados) => {
  try {
    commit('setLoading', true)

    const auditoria = dados.auditoria

    delete dados.auditoria

    const res = await axiosMD045.post('estoque/reagendar', dados)

    dispatch('obterDiferencas', auditoria)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const reagendar = async ({ commit, rootState, state }, recno) => {
  try {
    commit('setLoading', true)

    const documento = {
      diaMovimento: state.dataSelecionada,
      fluxo: [state.fluxoSelecionado],
      recno: [recno],
      login: rootState.app.usuario
    }
    const res = await axiosMD045.post('estoque/reagendar', documento)
    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const lancar = async ({ commit, rootState, state }, recno) => {
  try {
    commit('setLoading', true)
    const fila = await axiosMD045.get('estoque/filaId', {
      params: {
        fluxoId: state.fluxoSelecionado,
        origemId: recno
      }
    })
    if (fila.data.filaId) {
      const res = await axiosMD045.post('estoque/lancar', {
        filaId: fila.data.filaId,
        login: rootState.app.usuario
      })
      return res.data
    }
  } finally {
    commit('setLoading', false)
  }
}
