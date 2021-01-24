<template>
  <validation-observer
    ref="form"
    autocomplete="off"
    tag="form"
  >
    <v-row dense>
      <v-col
        sm="3"
        cols="12"
      >
        <v-text-field
          v-model="statusAgendamento"
          disabled
          hide-details
          filled
          label="Status"
        />
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <v-text-field
          v-model="tipo"
          disabled
          hide-details
          filled
          label="Tipo"
        />
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <v-text-field
          v-model="dia"
          disabled
          hide-details
          filled
          label="Dia"
        />
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <v-text-field
          v-model="hora"
          disabled
          hide-details
          filled
          label="Hora"
        />
      </v-col>
      <v-col
        sm="8"
        cols="12"
      >
        <v-text-field
          v-model="paciente"
          disabled
          hide-details
          filled
          label="Nome do Paciente"
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-text-field
          v-model="telefonePaciente"
          disabled
          hide-details
          filled
          label="Telefone"
        />
      </v-col>
      <v-col
        sm="8"
        cols="12"
      >
        <v-text-field
          v-model="medico"
          disabled
          hide-details
          filled
          label="Nome do Médico"
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-text-field
          v-model="especialidade"
          disabled
          hide-details
          filled
          label="Especialidade"
        />
      </v-col>
      <v-col
        v-if="observacao"
        sm="12"
        cols="12"
      >
        <v-textarea
          v-model="observacao"
          filled
          disabled
          hide-details
          label="Motivo do cancelamento"
          rows="2"
        />
      </v-col>
    </v-row>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponenteAgendamentoFormulario',
  data () {
    return {
      status: null,
      tipo: null,
      dia: null,
      hora: null,
      paciente: null,
      telefonePaciente: null,
      medico: null,
      especialidade: null,
      observacao: null
    }
  },
  computed: {
    ...mapState('agendamento', [
      'dadosExibir',
      'dropdownPerfil',
      'exibirFormulario',
      'dropdownTipoAgendamento',
      'dropdownStatusAgendamento'
    ])
  },
  created () {
    if (this.exibirFormulario === this.$exibirFormulario.exibir) {
      this.statusAgendamento = this.dadosExibir.statusAgendamento
      this.tipo = this.dadosExibir.tipo
      this.dia = this.dadosExibir.dia
      this.hora = this.dadosExibir.hora
      this.paciente = this.dadosExibir.paciente
      this.telefonePaciente = this.dadosExibir.telefonePaciente
      this.medico = this.dadosExibir.medico
      this.especialidade = this.dadosExibir.especialidade
      this.observacao = this.dadosExibir.observacao
    }
  },
  methods: {
    ...mapActions('agendamento', [
      'confirmar',
      'cancelar'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate()) {
        this.confirmar({
          id: this.dadosExibir.id
        })
      }
    }
  }
}
</script>
