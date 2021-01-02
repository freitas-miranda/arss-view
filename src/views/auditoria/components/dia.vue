<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      dense
      flat
    >
      <v-toolbar-title class="font-weight-medium">
        Dias com diferenças
      </v-toolbar-title>
    </v-toolbar>
    <tabela
      v-if="dias.length"
      ref="tabela"
      :colunas="colunas"
      :registros="dias"
      item-key="auditoriaId"
      remover-rodape
      selecionar-linha
      @excel="exportarExcel()"
      @linha="obterDiferencas($event)"
    >
      <template v-slot:[`item.acao`]="{ item }">
        <v-btn
          class="botao-acao-tabela"
          color="primary"
          icon
          title="Identificar Diferenças"
          @click.stop="processarDiferenca(item.auditoriaId)"
        >
          <v-icon size="20">
            mdi-crosshairs-gps
          </v-icon>
        </v-btn>
        <v-btn
          class="botao-acao-tabela"
          color="primary"
          icon
          title="Auditar Novamente"
          @click.stop="processarAuditoriaDia($day(item.diaMovimento, 'DD/MM/YYYY').format('YYYY-MM-DD'))"
        >
          <v-icon size="20">
            mdi-security
          </v-icon>
        </v-btn>
      </template>
    </tabela>
    <v-card-text
      v-else
      class="text-center body-1 font-weight-medium"
    >
      Selecione um fluxo!
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AuditoriaDias',
  data () {
    return {
      colunas: [
        {
          align: 'center',
          sortable: false,
          text: 'Ação',
          value: 'acao',
          width: 50
        },
        {
          align: 'center',
          text: 'Movimento',
          value: 'diaMovimento',
          width: 150
        },
        {
          align: 'end',
          text: 'Diferença',
          value: 'diferenca',
          width: 150
        },
        {
          align: 'end',
          text: 'Auditoria',
          value: 'auditoriaId',
          width: 150
        },
        {
          align: 'end',
          text: 'Empresa',
          value: 'empresa',
          width: 150
        },
        {
          align: 'start',
          text: 'Armazém',
          value: 'armazem'
        }
      ]
    }
  },
  computed: {
    ...mapState('auditoria', [
      'dias',
      'diaSelecionado',
      'dataSelecionada'
    ])
  },
  watch: {
    diaSelecionado (valor) {
      if (!valor) {
        const elemento = this.$refs.tabela.$el.getElementsByClassName('v-data-table__selected')

        elemento[0].classList.remove('v-data-table__selected')
      }
    }
  },
  methods: {
    ...mapActions('auditoria', [
      'obterDiferencas',
      'processarAuditoriaDia',
      'processarDiferenca'
    ]),
    exportarExcel () {
      this.$exportarExcel(this.dias, this.colunas)
    }
  }
}
</script>
