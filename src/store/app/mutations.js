export default {
  setNotificacao (state, { ativo, cor, icone, mensagem, tempo }) {
    state.notificacao = {
      ativo,
      cor,
      icone,
      mensagem,
      tempo
    }
  },
  setTitulo (state, valor) {
    state.titulo = valor
  },
  setUsuario (state, valor) {
    state.usuario = valor
  }
}
