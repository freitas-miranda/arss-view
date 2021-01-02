import axios from '@/plugins/axios'
import exibirFormulario from '@/plugins/exibir_formulario'

export const apagar = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.delete('fluxo/apagar/' + id)

    if (res.data.mensagem) {
      commit('setExibirFormulario', null)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.put('fluxo/editar', dados)

    if (res.data.mensagem) {
      commit('setExibirFormulario', null)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const editarImplantacao = async ({ dispatch, commit, state }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.put('fluxo-implantacao/editar-implantacao', dados)

    if (res.data.mensagem) dispatch('exibir', state.dadosExibir.id)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const exibir = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('fluxo/exibir/' + id)

    if (!res.data.erro) {
      commit('setDadosExibir', res.data.registro)
      commit('setImplantacao', res.data.implantacao)
      commit('setExibirFormulario', exibirFormulario.exibir)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const listar = async ({ commit }, parametros) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('fluxo/listar', {
      params: parametros
    })

    if (!res.data.erro) {
      commit('setRegistros', res.data.registros)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('fluxo/salvar', dados)

    await axios.post('fluxo-implantacao/vincular')

    if (res.data.mensagem) commit('setExibirFormulario', null)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const getArmazens = async ({ commit }) => {
  const res = await axios.get('armazem/dropdown')

  if (!res.data.erro) {
    commit('setArmazens', res.data.registros)
  }
  return res.data
}
