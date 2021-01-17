import axios from '@/plugins/axios'
import exibirFormulario from '@/plugins/exibir_formulario'

export const apagar = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.delete('/paciente/apagar/' + id)

    if (res.data.mensagem) {
      commit('setExibirFormulario', null)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const dropdown = async ({ commit }) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('paciente/dropdown')

    if (!res.data.erro) {
      commit('setDropdown', res.data)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.put('/paciente/editar', dados)

    if (res.data.mensagem) {
      commit('setExibirFormulario', null)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const exibir = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('/paciente/exibir/' + id)

    if (!res.data.erro) {
      commit('setDadosExibir', res.data.registro)
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

    const res = await axios.get('/paciente/listar', {
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

    const res = await axios.post('/paciente/salvar', dados)

    if (res.data.mensagem) commit('setExibirFormulario', null)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
