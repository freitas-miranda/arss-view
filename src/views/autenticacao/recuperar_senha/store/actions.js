import axios from '@/plugins/axios'

export const recuperarSenha = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('controle-acesso/autenticacao/recuperar-senha', dados)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}
