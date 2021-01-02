import dayjs from '@/plugins/dayjs'

const formatarData = (data, defaultData = 'YYYY-MM-DD HH:mm:ss', formatoData = 'DD/MM/YY HH:mm:ss') => {
  const dataFormatada = dayjs(data, defaultData).format(formatoData)
  return dataFormatada
}

export default {
  reset: () => {},
  setLoading (state, valor) {
    state.loading = valor
  },
  setUltimasAuditorias (state, dados) {
    dados.forEach((item) => {
      item.auditoria = formatarData(item.auditoria)
    })
    state.ultimasAuditorias = dados
  }
}
