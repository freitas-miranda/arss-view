import { fdate } from '@/plugins/fdate'

export default {
  reset: () => {},
  setDadosExibir (state, dados) {
    dados.dia = fdate.toView(dados.dia)
    dados.telefonePaciente = fdate.fone(dados.telefonePaciente)
    state.dadosExibir = dados
  },
  setDropdown (state, dados) {
    state.dropdownTipoAgendamento = dados.tipoAgendamento
    state.dropdownStatusAgendamento = dados.statusAgendamento
  },
  setExibirFormulario (state, valor) {
    state.exibirFormulario = valor
  },
  setLoading (state, valor) {
    state.loading = valor
  },
  setRegistros (state, dados) {
    dados.forEach(item => {
      item.dia = fdate.toView(item.dia)
    })

    state.registros = dados
  }
}
