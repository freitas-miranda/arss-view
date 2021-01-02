<template>
  <v-app>
    <notificacao />
    <router-view />
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
      titleTemplate: 'Implantação do Estoque - %s',
      meta: [
        {
          name: 'description',
          content: 'Controle da implantação do estoque'
        },
        { name: 'keywords', content: 'implantacao, estoque, vuetify' }
      ]
    }
  }
}
</script>

<style lang="scss">
  #app {
    background-color: #f3f3f3 !important;
  }

  ::-webkit-scrollbar-track {
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar {
    background-color: #F5F5F5;
    height: 9px;
    width: 9px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #00613B;
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

  .theme--light {
    .v-input--is-disabled {
      input, textarea {
        color: rgba(0, 0, 0, 0.7) !important;
      }
    }
  }

  .v-textarea {
    .v-input__control {
      .v-input__slot {
        .v-text-field__slot {
          textarea {
            line-height: 1.3 !important;
            margin-top: 30px !important;
          }
        }
      }
    }
  }

  .v-input--selection-controls {
    margin-top: 5px !important;
    margin-bottom: 5px !important;
    padding-top: 0px !important
  }

</style>
