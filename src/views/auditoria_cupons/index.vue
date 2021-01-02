<template>
  <pagina
    subtitulo="Validação do Sincronismo PDV x IGERP"
    titulo="Auditoria - Cupons PDV x IGERP"
  >
    <loading v-model="loading" />
    <v-row dense>
      <v-col
        lg="5"
        md="5"
        sm="12"
        xs="12"
      >
        <v-col dense>
          <auditorias />
        </v-col>
      </v-col>
      <v-col
        lg="7"
        md="7"
        sm="12"
        xs="12"
      >
        <v-col>
          <problemas />
        </v-col>
      </v-col>
    </v-row>
  </pagina>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PaginaAuditoriaCupons',
  components: {
    problemas: () => import('./components/problemas'),
    auditorias: () => import('./components/auditorias')
  },
  computed: {
    ...mapState('auditoriaCupons', [
      'loading'
    ])
  }
}
</script>
