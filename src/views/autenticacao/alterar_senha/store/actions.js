import axios from '@/plugins/axios'

export const alterarSenha = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('controle-acesso/autenticacao/redefinir-senha', dados)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const obterRecuperacao = async ({ commit }, token) => {
  try {
    commit('setLoadingPrincipal', true)

    const res = await axios.get('controle-acesso/autenticacao/obter-recuperacao/' + token)

    if (!res.data.erro) commit('setDadosRecuperacao', res.data)

    return res.data
  } finally {
    commit('setLoadingPrincipal', false)
  }
}
