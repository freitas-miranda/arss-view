export const nomeAbreviado = (state) => {
  return state.nome ? state.nome.split(' ')[0] : ''
}
