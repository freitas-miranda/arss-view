<template>
  <pagina
    subtitulo="Auditorias de importação"
    titulo="Sincronismo Estoque Nuvem x Matriz"
  >
    <loading v-model="loading" />
    <v-row dense>
      <v-col dense>
        <auditorias />
      </v-col>
    </v-row>
  </pagina>
</template>

<script>
import axiosMD045 from '@/plugins/axios_md045'
import { mapState } from 'vuex'

export default {
  name: 'PaginaSincronismo',
  components: {
    auditorias: () => import('./components/auditorias')
  },
  computed: {
    ...mapState('sincronismo', [
      'loading'
    ])
  },
  created () {
    axiosMD045.defaults.baseURL = `${process.env.VUE_APP_HOST_MD045}/api/`
  }
}
</script>
