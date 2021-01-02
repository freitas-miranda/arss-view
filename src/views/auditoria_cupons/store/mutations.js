import dayjs from '@/plugins/dayjs'

export default {
  reset: () => {},
  setUltimasAuditorias (state, dados) {
    dados.forEach((item) => {
      item.ultimaAuditoria = dayjs(item.ultimaAuditoria, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YY HH:mm:ss')
    })
    state.ultimasAuditorias = dados
  },
  setProblemas (state, valor) {
    state.problemas = valor
  },
  setLoading (state, valor) {
    state.loading = valor
  }
}
