import dayjs from '@/plugins/dayjs'

export default {
  reset: () => {},
  setDadosExibir (state, dados) {
    dados.dataNascimento = dayjs(dados.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')
    state.dadosExibir = dados
  },
  setDropdown (state, dados) {
    state.dropdownSexo = dados.sexo
    state.dropdownTipoSanguineo = dados.tipoSanguineo
    state.dropdownTipoTelefone = dados.tipoTelefone
  },
  setExibirFormulario (state, valor) {
    state.exibirFormulario = valor
  },
  setLoading (state, valor) {
    state.loading = valor
  },
  setRegistros (state, dados) {
    dados.forEach(item => {
      item.dataNascimento = item.dataNascimento ? dayjs(item.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY') : item.dataNascimento
    })

    state.registros = dados
  },
  setImplantacao (state, dados) {
    state.implantacao = dados
  }
}
