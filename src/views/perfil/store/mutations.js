export default {
  reset: () => {},
  setAtualizaPerfil (state, dados) {
    state.perfil.nome = dados.nome
    state.perfil.email = dados.email
    state.perfil.emailConfirmacao = dados.emailConfirmacao
  },
  setPerfil (state, dados) {
    state.perfil = dados
  }
}
