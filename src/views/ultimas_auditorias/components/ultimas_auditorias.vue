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
      ref="tabela"
      :colunas="colunas"
      :loading="loading"
      :registros="ultimasAuditorias"
      @excel="exportarExcel()"
    />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UltimasAuditorias',
  data () {
    return {
      colunas: [
        this.$criarColuna('Fluxo', 'fluxoId', 'start', '5%'),
        this.$criarColuna('Descrição do Fluxo', 'fluxo', 'start', '10%'),
        this.$criarColuna('Empresa', 'empresa', 'start', '5%'),
        this.$criarColuna('Auditoria', 'auditoria', 'start', '10%'),
        this.$criarColuna()
      ]
    }
  },
  computed: {
    ...mapState('ultimasAuditorias', [
      'ultimasAuditorias',
      'loading'
    ])
  },
  methods: {
    exportarExcel () {
      this.$exportarExcel(this.ultimasAuditorias, this.colunas)
    }
  }
}
</script>
