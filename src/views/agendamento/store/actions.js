import axios from '@/plugins/axios'
import exibirFormulario from '@/plugins/exibir_formulario'

export const dropdown = async ({ commit }) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('/agendamento/dropdown')

    if (!res.data.erro) {
      commit('setDropdown', res.data)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const confirmarAgendamento = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.put('/agendamento/confirmar', {
      id: id
    })

    if (res.data.mensagem) {
      commit('setExibirFormulario', null)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const cancelarAgendamento = async ({ commit }, formulario) => {
  try {
    commit('setLoading', true)

    const res = await axios.put('/agendamento/cancelar', {
      id: formulario.id,
      motivo: formulario.observacao
    })

    if (res.data.mensagem) {
      commit('setExibirFormulario', null)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const voltarParaSolicitado = async ({ commit }, id) => {
  try {
    commit('setLoading', true)

    const res = await axios.put('/agendamento/iniciar', {
      id: id
    })

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

    const res = await axios.get('/agendamento/exibir/' + id)

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

    const res = await axios.get('/agendamento/listar', {
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
