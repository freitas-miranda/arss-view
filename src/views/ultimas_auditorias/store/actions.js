import axios from '@/plugins/axios'

export const obterUltimasAuditorias = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.get('ultimas-auditorias/listar', {
      params: dados
    })

    if (res.data.registros) commit('setUltimasAuditorias', res.data.registros)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
