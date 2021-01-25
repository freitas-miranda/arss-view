<template>
  <v-col
    cols="12"
    md="12"
    lg="10"
    xl="8"
    offset-lg="1"
  >
    <div>
      <v-toolbar
        class="toolbar-titulo"
        flat
      >
        <v-toolbar-title>
          <div class="text-h5 font-weight-medium">
            Agendamentos
          </div>
          <div class="text-body-2">
            Manutenção dos agendamentos
          </div>
        </v-toolbar-title>
      </v-toolbar>
      <v-container
        fluid
        grid-list-md
      >
        <filtro
          v-if="!exibirFormulario"
          :loading="loading"
          pesquisar
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

        <tabela
          v-if="!exibirFormulario"
          :colunas="colunas"
          :registros="registros"
          exibir
          @excel="exportarExcel()"
          @exibir="exibir($event)"
        />

        <v-card
          v-else
        >
          <v-toolbar
            color="primary"
            dense
            height="35"
          >
            <v-btn
              dark
              icon
              title="Fechar"
              @click="setExibirFormulario(null)"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
            <v-toolbar-title class="titulo-formulario pl-1 text-h6 white--text">
              Controle de Agendamentos
            </v-toolbar-title>
          </v-toolbar>
          <motivo
            :id="dadosExibir.id"
            :observacao="dadosExibir.observacao"
            :value.sync="modalMotivoRecusa"
            :loading="loading"
            @input="resetMotivo"
            @cancelar="resetMotivo"
            @confirmar="cancelarAgendamento($event)"
          />
          <formulario class="pl-1 pr-1 pt-2 pb-2 mx-1" />
          <divisao />
          <v-card-actions>
            <v-btn
              v-if="exibir"
              :loading="loading"
              color="primary"
              small
              title="Voltar"
              @click="setExibirFormulario(null)"
            >
              <v-icon left>
                mdi-reply
              </v-icon>
              Voltar
            </v-btn>
            <v-btn
              v-if="podeConfirmar()"
              :loading="loading"
              color="success"
              small
              title="Confirmar"
              @click="confirmarAgendamento(dadosExibir.id)"
            >
              <v-icon left>
                mdi-check-all
              </v-icon>
              Confirmar Agendamento
            </v-btn>
            <v-btn
              v-if="podeCancelar()"
              :loading="loading"
              color="error"
              small
              title="Cancelar"
              @click="modalMotivoRecusa = true"
            >
              <v-icon left>
                mdi-alarm-off
              </v-icon>
              Cancelar Agendamento
            </v-btn>
            <v-spacer />
            <v-btn
              v-if="podeVoltarParaSolicitado()"
              :loading="loading"
              color="warning"
              small
              title="Solicitado"
              @click="voltarParaSolicitado(dadosExibir.id)"
            >
              <v-icon left>
                mdi-sync
              </v-icon>
              Voltar Para Solicitado
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </v-col>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PaginaAgendamento',
  components: {
    formulario: () => import('./components/formulario'),
    motivo: () => import('./components/motivo')
  },
  data () {
    return {
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
          value: 'statusAgendamento',
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
      tipo: null,
      dia: null,
      hora: null,
      paciente: null,
      medico: null,
      statusAgendamento: null,
      tipoAgendamento: null,
      modalMotivoRecusa: false
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
      'fechar',
      'listar',
      'confirmarAgendamento',
      'cancelarAgendamento',
      'voltarParaSolicitado'
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
    },
    exportarExcel () {
      this.$exportarExcel(this.registros, this.colunas)
    },
    resetMotivo () {
      this.modalMotivoRecusa = false
      this.modalMotivoRecusa = this.dadosExibir.motivo
    },
    podeConfirmar () {
      // 1-Solicitado; 2-Confirmado; 3-Iniciado; 4-Finalizado; 5-Cancelado
      return this.exibir && (this.dadosExibir.statusId === 1)
    },
    podeCancelar () {
      // 1-Solicitado; 2-Confirmado; 3-Iniciado; 4-Finalizado; 5-Cancelado
      return this.exibir && (this.dadosExibir.statusId === 1)
    },
    podeVoltarParaSolicitado () {
      // 1-Solicitado; 2-Confirmado; 3-Iniciado; 4-Finalizado; 5-Cancelado
      return this.exibir && (this.dadosExibir.statusId !== 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .titulo-formulario {
    font-weight: 400 !important;
  }

  .toolbar-titulo {
    border-bottom: 2px solid #e0e0e0 !important;
    background-color: #f3f3f3 !important;
    top: auto !important;
    z-index: 1 !important;
  }

</style>
