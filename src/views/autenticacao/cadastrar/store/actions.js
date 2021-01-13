import axios from '@/plugins/axios'

export const cadastrar = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('controle-acesso/autenticacao/cadastrar', dados)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
