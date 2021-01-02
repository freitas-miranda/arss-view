import axiosMD045 from '@/plugins/axios_md045'

export const obterUltimasAuditorias = async ({ commit }) => {
  try {
    commit('setLoading', true)

    const res = await axiosMD045.get('sincronismo/nuvem-mtz/ultimos')

    if (res.data) {
      commit('setUltimasAuditorias', res.data)
    }

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
