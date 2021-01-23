<template>
  <v-col
    cols="12"
    md="12"
    lg="10"
    xl="8"
    offset-lg="1"
  >
    <pagina
      :adicionar="exibirFormulario === $exibirFormulario.adicionar"
      :editar="exibirFormulario === $exibirFormulario.editar"
      :exibir="exibirFormulario === $exibirFormulario.exibir"
      :loading="loading"
      :mais-opcoes="exibirFormulario === $exibirFormulario.editar"
      :titulo-formulario="titulo"
      campos-obrigatorios
      excluir
      subtitulo="Manutenção dos agendamentos"
      titulo="Agendamentos"
      @confirmar="$refs.formulario.confirmar()"
      @editar="setExibirFormulario($exibirFormulario.editar)"
      @excluir="apagar(dadosExibir.id)"
      @fechar="setExibirFormulario(null)"
    >
      <filtro
        v-if="!exibirFormulario"
        :loading="loading"
        adicionar
        pesquisar
        @adicionar="setExibirFormulario($exibirFormulario.adicionar)"
        @pesquisar="listagem()"
      >
        <validation-observer
          ref="form"
          autocomplete="off"
          tag="form"
        >
          <v-row dense>
            <v-col
              sm="2"
              cols="12"
            >
              <v-autocomplete
                v-model="statusAgendamento"
                :items="dropdownStatusAgendamento"
                filled
                hide-details
                clearable
                item-text="descricao"
                item-value="codigo"
                label="Status"
                @input="listagem()"
              />
            </v-col>
            <v-col
              sm="2"
              cols="12"
              keyup.enter="listagem()"
            >
              <v-autocomplete
                v-model="tipoAgendamento"
                :items="dropdownTipoAgendamento"
                filled
                hide-details
                clearable
                item-text="descricao"
                item-value="codigo"
                label="Tipo"
                @input="listagem()"
              />
            </v-col>
            <v-col
              sm="2"
              cols="12"
            >
              <date-picker
                v-model="dia"
                hide-details
                label="Dia"
              />
            </v-col>
            <v-col
              sm="3"
              cols="12"
            >
              <v-text-field
                v-model="paciente"
                v-uppercase
                autofocus
                filled
                hide-details
                label="Paciente"
                @click:append="listagem()"
                @keyup.enter="listagem()"
              />
            </v-col>
            <v-col
              sm="3"
              cols="12"
            >
              <v-text-field
                v-model="medico"
                v-uppercase
                autofocus
                filled
                hide-details
                label="Medico"
                @click:append="listagem()"
                @keyup.enter="listagem()"
              />
            </v-col>
          </v-row>
        </validation-observer>
      </filtro>

      <template v-slot:mais-opcoes>
        <v-list-item @click="redefinirSenhaUsuario()">
          <v-list-item-icon class="mr-3">
            <v-icon color="primary">
              mdi-key-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Redefinir Senha
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <tabela
        v-if="!exibirFormulario"
        :colunas="colunas"
        :registros="registros"
        exibir
        @excel="exportarExcel()"
        @exibir="exibir($event)"
      />

      <formulario
        v-else
        ref="formulario"
      />
    </pagina>
  </v-col>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PaginaAgendamento',
  components: {
    formulario: () => import('./components/formulario')
  },
  data () {
    return {
      codigo: null,
      colunas: [
        {
          align: 'center',
          sortable: false,
          text: 'Ação',
          value: 'acao',
          width: 10
        },
        {
          align: 'start',
          text: 'Status',
          value: 'statusPaciente',
          width: 50
        },
        {
          align: 'start',
          text: 'Tipo',
          value: 'tipo',
          width: 50
        },
        {
          align: 'start',
          text: 'Dia',
          value: 'dia',
          width: 50
        },
        {
          align: 'start',
          text: 'Hora',
          value: 'hora',
          width: 50
        },
        {
          align: 'start',
          text: 'Paciente',
          value: 'paciente',
          width: 100
        },
        {
          align: 'start',
          text: 'Medico',
          value: 'medico',
          width: 100
        },
        {
          align: 'start',
          text: 'Especialidade',
          value: 'especialidade',
          width: 50
        }
      ],
      statusPaciente: null,
      tipo: null,
      dia: null,
      hora: null,
      paciente: null,
      medico: null,
      statusAgendamento: null,
      tipoAgendamento: null
    }
  },
  computed: {
    ...mapState('agendamento', [
      'dadosExibir',
      'exibirFormulario',
      'loading',
      'registros',
      'dropdownTipoAgendamento',
      'dropdownStatusAgendamento'
    ]),
    titulo () {
      let titulo

      switch (this.exibirFormulario) {
        case this.$exibirFormulario.adicionar:
          titulo = 'Adicionar'
          break
        case this.$exibirFormulario.editar:
          titulo = 'Editar'
          break
        case this.$exibirFormulario.exibir:
          titulo = 'Exibir'
          break
      }

      return `${titulo} Agendamento`
    }
  },
  watch: {
    exibirFormulario (valor) {
      if (!valor) {
        setTimeout(() => {
          this.listagem()
        }, 300)
        this.setDadosExibir({})
      }
    }
  },
  created () {
    setTimeout(() => {
      this.listagem()
      this.dropdown()
    }, 300)
  },
  methods: {
    ...mapActions('agendamento', [
      'dropdown',
      'exibir',
      'listar'
    ]),
    ...mapMutations('agendamento', [
      'setDadosExibir',
      'setExibirFormulario'
    ]),
    async listagem () {
      if (await this.$refs.form.validate()) {
        this.listar({
          dia: this.$fdate.toSql(this.dia),
          tipoAgendamento: this.tipoAgendamento || undefined,
          statusAgendamento: this.statusAgendamento || undefined,
          paciente: this.paciente || undefined,
          medico: this.medico || undefined
        })
      }
    }
  }
}
</script>
