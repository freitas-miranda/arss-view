import { cpf } from '@/plugins/cpf'
import { fdate } from '@/plugins/fdate'

export default {
  reset: () => {},
  setDadosExibir (state, dados) {
    dados.dataNascimento = fdate.toView(dados.dataNascimento)
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
      item.dataNascimento = fdate.toView(item.dataNascimento)
      item.cpf = cpf.format(item.cpf)
      item.telefoneNumero = fdate.fone(item.telefoneNumero)
    })

    state.registros = dados
  }
}
