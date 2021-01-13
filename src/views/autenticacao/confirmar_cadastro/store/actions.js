import axios from '@/plugins/axios'

export const confirmarCadastro = async ({ commit }, dados) => {
  try {
    commit('setLoading', true)

    const res = await axios.post('controle-acesso/autenticacao/confirmar-cadastro', dados)

    return res.data
  } finally {
    commit('setLoading', false)
  }
}

export const obterSolicitacao = async ({ commit }, token) => {
  try {
    commit('setLoadingPrincipal', true)

    const res = await axios.get('controle-acesso/autenticacao/obter-solicitacao/' + token)

    if (!res.data.erro) commit('setDadosSolicitacao', res.data)

    return res.data
  } finally {
    commit('setLoadingPrincipal', false)
  }
}
