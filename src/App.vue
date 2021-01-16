<template>
  <v-app>
    <notificacao />
    <loading v-model="loading" />
    <router-view />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('app', [
      'loading',
      'titulo'
    ])
  },
  metaInfo () {
    return {
      title: this.titulo,
      titleTemplate: 'ARSS - %s',
      meta: [
        { name: 'description', content: 'AR Sistema de Saúde' },
        { name: 'keywords', content: 'arss, sistema, saúde, vuetify' }
      ]
    }
  },
  mounted () {
    const Halter = new FontFace('Halter', 'url(/fonts/Halter.ttf)')
    const Hestina = new FontFace('Hestina', 'url(/fonts/Hestina.otf)')

    Halter.load().then((font) => {
      document.fonts.add(font)
    })

    Hestina.load().then((font) => {
      document.fonts.add(font)
    })
  }
}
</script>

<style lang="scss">
  ::-webkit-scrollbar-track {
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar {
    background-color: #F5F5F5;
    height: 9px;
    width: 9px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #5ca8c3;
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
      opacity: 0.6;
    }

    &:hover {
      opacity: 0.6;
    }
  }

  .theme--light {
    .v-input--is-disabled {
      input, textarea {
        color: rgba(0, 0, 0, 0.7) !important;
      }
    }
  }

</style>
