<template>
  <pagina
    subtitulo="Validação do Estoque"
    titulo="Auditoria - Processamento de Estoque"
  >
    <loading v-model="loading" />
    <v-row dense>
      <v-col
        lg="5"
        md="6"
        sm="12"
        xs="12"
      >
        <v-col dense>
          <empresa />
        </v-col>
        <v-col>
          <fluxo />
        </v-col>
      </v-col>
      <v-col
        lg="7"
        md="7"
        sm="12"
        xs="12"
      >
        <v-col>
          <dia />
        </v-col>
        <v-col>
          <diferenca />
        </v-col>
      </v-col>
    </v-row>
  </pagina>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PaginaAuditoria',
  components: {
    dia: () => import('./components/dia'),
    diferenca: () => import('./components/diferenca'),
    empresa: () => import('./components/empresa'),
    fluxo: () => import('./components/fluxo')
  },
  computed: {
    ...mapState('auditoria', [
      'loading'
    ])
  }
}
</script>
