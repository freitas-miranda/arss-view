<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      dense
      flat
    >
      <v-toolbar-title class="font-weight-medium">
        Últimas Auditorias
      </v-toolbar-title>
    </v-toolbar>
    <tabela
      v-if="ultimasAuditorias.length"
      ref="tabela"
      :colunas="colunas"
      :registros="ultimasAuditorias"
      item-key="empresa"
      selecionar-linha
      @excel="exportarExcel()"
    >
      ...
    </tabela>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UltimasAuditoriasCupons',
  data () {
    return {
      colunas: [
        {
          align: 'start',
          text: 'Tabela',
          value: 'tabela',
          width: 100
        },
        {
          align: 'start',
          text: 'Emp',
          value: 'empresa',
          width: 10
        },
        {
          align: 'center',
          text: 'Auditoria',
          value: 'ultimaAuditoria',
          width: 50
        },
        {
          align: 'start',
          text: 'Problemas',
          value: 'problemas',
          width: 10
        }
      ]
    }
  },
  computed: {
    ...mapState('auditoriaCupons', [
      'ultimasAuditorias',
      'loading'
    ])
  },
  created () {
    this.obterUltimasAuditorias()
  },
  methods: {
    ...mapActions('auditoriaCupons', [
      'obterUltimasAuditorias'
    ]),
    exportarExcel () {
      this.$exportarExcel(this.ultimasAuditorias, this.colunas)
    }
  }
}
</script>
