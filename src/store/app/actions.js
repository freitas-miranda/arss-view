import axios from '@/plugins/axios'

export const alterarSenha = async ({ commit }, dados) => {
  try {
    commit('setLoadingAlterarSenha', true)

    const res = await axios.post('controle-acesso/autenticacao/alterar-senha', dados)

    if (res.data.mensagem) commit('setModalAlterarSenha', false)

    return res.data
  } finally {
    commit('setLoadingAlterarSenha', false)
  }
}

export const login = async ({ commit }, dados) => {
  try {
    commit('setLoadingLogin', true)

    const res = await axios.post('controle-acesso/autenticacao/login', dados)

    if (res.data.token) {
      localStorage.setItem('login:token', res.data.token)
      localStorage.setItem('login:email', window.btoa(dados.email))
      localStorage.setItem('login:nome', window.btoa(res.data.nome))

      commit('app/setEmail', dados.email, { root: true })
      commit('app/setNome', res.data.nome, { root: true })

      axios.defaults.headers['Authorization'] = 'Bearer ' + res.data.token
    }

    return res.data
  } finally {
    commit('setLoadingLogin', false)
  }
}

export const logout = async ({ commit }) => {
  try {
    commit('setLoadingLogout', true)

    const res = await axios.post('controle-acesso/autenticacao/logout')

    if (res.data.mensagem) {
      localStorage.removeItem('login:token')
      localStorage.removeItem('login:nome')

      commit('app/setNome', null, { root: true })

      axios.defaults.headers['Authorization'] = undefined
    }

    return res.data
  } finally {
    commit('setLoadingLogout', false)
  }
}
