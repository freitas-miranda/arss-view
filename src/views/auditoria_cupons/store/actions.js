import axiosMD055 from '@/plugins/axios_md055'
import axiosMD060 from '@/plugins/axios_md060'

export const obterUltimasAuditorias = async ({ commit }) => {
  try {
    commit('setLoading', true)
    const res = await axiosMD055.get('md060/pdv-igerp/ultimas-auditorias')
    if (res.data) commit('setUltimasAuditorias', res.data)
    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const obterProblemas = async ({ commit }) => {
  try {
    commit('setLoading', true)
    const res = await axiosMD055.get('md060/pdv-igerp/problemas')
    if (res.data) commit('setProblemas', res.data)
    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const revalidarAuditoria = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    axiosMD060.defaults.baseURL = `http://estapi-${dados.empresa}:8060/api`

    const res = await axiosMD060.post('auditoria/notas-fiscais/revalidar', {
      auditorias: [dados.auditoriaId]
    })

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
