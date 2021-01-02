<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      dense
      flat
    >
      <v-toolbar-title class="font-weight-medium">
        Problemas
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <tabela
      v-if="problemas.length"
      ref="tabela"
      :colunas="colunas"
      :registros="problemas"
    >
      <template v-slot:[`item.acao`]="{ item }">
        <v-btn
          class="botao-acao-tabela"
          color="primary"
          icon
          title="Revalidar"
          @click.stop="revalidar(item)"
        >
          <v-icon size="20">
            mdi-history
          </v-icon>
        </v-btn>
      </template>
    </tabela>
    <v-card-text
      v-else
      class="text-center body-1 font-weight-medium"
    >
      Não há problemas de sincronismo entre o PDV e o IGERP
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AuditoriaProblemas',
  data () {
    return {
      colunas: [
        {
          align: 'start',
          text: 'Tabela',
          value: 'tabela',
          width: 70
        },
        {
          align: 'start',
          sortable: false,
          text: 'Auditoria',
          value: 'auditoriaId',
          width: 10
        },
        {
          align: 'start',
          text: 'PDV',
          value: 'pdv',
          width: 10
        },
        {
          align: 'start',
          text: 'PDV IP',
          value: 'pdv_ip',
          width: 10
        },
        {
          align: 'end',
          text: 'PDV ID',
          value: 'pdv_id',
          width: 10
        },
        {
          align: 'start',
          text: 'ID Not Sinc',
          value: 'id_not_sinc',
          width: 10
        }
      ]
    }
  },
  computed: {
    ...mapState('auditoriaCupons', [
      'auditorias',
      'problemas',
      'loading'
    ])
  },
  created () {
    this.obterProblemas()
  },
  methods: {
    ...mapActions('auditoriaCupons', [
      'obterProblemas',
      'revalidarAuditoria'
    ]),
    async revalidar (dados) {
      const result = await this.revalidarAuditoria(dados)
      if (result) {
        this.$notificacao('Sucesso!')
        this.obterProblemas()
      }
    },
    exportarExcel () {
      this.$exportarExcel(this.problemas, this.colunas)
    }
  }
}
</script>
