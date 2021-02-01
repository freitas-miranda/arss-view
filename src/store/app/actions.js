import axios from '@/plugins/axios'

const Perfil = Object.freeze({
  'Admin': 1,
  'Gestor': 2,
  'Secretaria': 3,
  'Pacientes': 4,
  'Todos': 100
})

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
      localStorage.setItem('login:perfil', window.btoa(res.data.perfil))

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
      localStorage.removeItem('login:perfil')

      commit('app/setNome', null, { root: true })

      axios.defaults.headers['Authorization'] = undefined
    }

    return res.data
  } finally {
    commit('setLoadingLogout', false)
  }
}

export function rotaAutorizada (path) {
  let perfil
  switch (path) {
    case '/sistema/perfil':
      perfil = Perfil.Admin
      break
    case '/sistema/usuario':
      perfil = Perfil.Admin
      break
    case '/paciente':
      perfil = Perfil.Gestor
      break
    case '/agendamento':
      perfil = Perfil.Secretaria
      break
    default:
      perfil = Perfil.Todos
      break
  }
  const perfilLogado = (window.atob(localStorage.getItem('login:perfil')))
  return (perfilLogado <= perfil)
}
