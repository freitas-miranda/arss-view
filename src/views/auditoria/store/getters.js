import moeda from '@tiig/moeda'

export const total = (state) => {
  const totalEstoque = moeda.format(state.diferencas.reduce((acumulador, valorAtual) => {
    return acumulador + moeda.strip(valorAtual.qtdEstoque)
  }, 0), 3)

  const totalLoja = moeda.format(state.diferencas.reduce((acumulador, valorAtual) => {
    return acumulador + moeda.strip(valorAtual.qtdLoja)
  }, 0), 3)

  const totalDiferenca = moeda.format(state.diferencas.reduce((acumulador, valorAtual) => {
    return acumulador + moeda.strip(valorAtual.diferenca)
  }, 0), 3)

  return {
    totalEstoque,
    totalLoja,
    totalDiferenca
  }
}
