<template>
  <v-app>
    <notificacao/>
    <router-view/>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('app', [
      'titulo'
    ])
  },
  metaInfo () {
    return {
      title: this.titulo,
      titleTemplate: 'ARSS - %s',
      meta: [
        {
          name: 'description',
          content: 'AR Sistema de Saúde'
        },
        { name: 'keywords', content: 'sistema, saúde, vuetify' }
      ]
    }
  }
}
</script>

<style lang="scss">
  #app {
    background-color: #f3f3f3 !important;
  }

  .required {
    label {
      &:after {
        content: ' *';
        color: red;
      }
    }
  }

  .v-btn {
    &:focus {
      opacity: 0.7 !important;
    }

    &:hover {
      opacity: 0.7 !important;
    }
  }
</style>
