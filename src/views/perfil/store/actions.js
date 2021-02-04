import axios from '@/plugins/axios'
import { version } from '../../../../package.json'

export const exibir = async ({ commit }) => {
  try {
    commit('app/setLoading', true, { root: true })

    const res = await axios.get('perfil/exibir')

    if (!res.data.erro) {
      commit('setPerfil', res.data)
    }

    return res.data
  } finally {
    commit('app/setLoading', false, { root: true })
  }
}

export const reenviar = async ({ commit }) => {
  try {
    commit('app/setLoading', true, { root: true })

    const res = await axios.post('perfil/reenviar')

    return res.data
  } finally {
    commit('app/setLoading', false, { root: true })
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    commit('app/setLoading', true, { root: true })

    const res = await axios.post('perfil/salvar', dados)

    if (res.data.mensagem) {
      localStorage.setItem('login:email', window.btoa(res.data.email))
      localStorage.setItem('login:nome', window.btoa(res.data.nome))

      commit('app/setEmail', res.data.email, { root: true })
      commit('app/setNome', res.data.nome, { root: true })
      commit('setAtualizaPerfil', res.data)
    }

    return res.data
  } finally {
    commit('app/setLoading', false, { root: true })
  }
}

export const getVersion = async () => {
  return 'v' + version
}
