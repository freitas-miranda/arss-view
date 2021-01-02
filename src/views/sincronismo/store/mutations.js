import dayjs from '@/plugins/dayjs'
import moeda from '@tiig/moeda'

const formatarData = (data, defaultData = 'YYYY-MM-DD HH:mm:ss', formatoData = 'DD/MM/YY HH:mm:ss') => {
  const dataFormatada = dayjs(data, defaultData).format(formatoData)
  return dataFormatada
}

const formatarNumero = (valor, casaDecimal = 0, defaultValue = 0) => {
  if (!valor) {
    return defaultValue
  }
  return moeda.format(moeda.strip(valor), casaDecimal)
}

const corStatus = {
  pendente: {
    valor: 1,
    cor: '#2196F3'
  },
  iniciado: {
    valor: 2,
    cor: '#4CAF50'
  },
  finalizado: {
    valor: 3,
    cor: '#9E9E9E'
  },
  falha: {
    valor: 4,
    cor: '#F44336'
  }
}

const statusCor = (item) => {
  try {
    const objCor = Object.entries(corStatus)

    return objCor[item - 1][1] ? objCor[item - 1][1].cor : '#000000'
  } catch (e) {
    return '#000000'
  }
}

export default {
  reset: () => {},
  setLoading (state, valor) {
    state.loading = valor
  },
  setUltimasAuditorias (state, dados) {
    dados.forEach((item) => {
      item.dia = formatarData(item.dia, 'YYYY-MM-DD', 'DD/MM/YY')
      item.inicio = formatarData(item.inicio)
      item.fim = formatarData(item.fim)
      item.consolidado = formatarData(item.consolidado)
      item.ultimoProduto = Number(item.ultimoProduto)
      item.qtdProdutos = formatarNumero(item.qtdProdutos)
      item.qtdImportados = formatarNumero(item.qtdImportados)
      item.qtdRestante = formatarNumero(item.qtdRestante)
      item.segundos = formatarNumero(item.segundos)
      item.statusDesc = { chip: true, color: statusCor(item.status), text: item.statusDesc }
    })
    state.ultimasAuditorias = dados
  }
}
