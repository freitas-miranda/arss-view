<template>
  <v-snackbar
    v-model="ativo"
    :color="notificacao.cor"
    :timeout="notificacao.tempo"
    class="notificacao"
    app
    top
  >
    <div class="notificacao-icone">
      <div class="notificacao-icone-aux">
        <v-icon
          dark
          size="30"
        >
          {{ notificacao.icone }}
        </v-icon>
      </div>
      </div>
    <div
      v-html="notificacao.mensagem"
      class="notificacao-texto"
    />
    <template v-slot:action>
      <v-btn
        @click="ativo = false"
        class="notificacao-close"
        dark
        icon
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ComponenteNotificação',
  computed: {
    ...mapState('app', [
      'notificacao'
    ]),
    ativo: {
      get () {
        return this.notificacao.ativo
      },
      set (valor) {
        if (!valor) {
          this.setNotificacao({
            ativo: false,
            cor: null,
            icone: null,
            mensagem: null,
            tempo: null
          })
        }
      }
    }
  },
  methods: {
    ...mapMutations('app', [
      'setNotificacao'
    ])
  }
}
</script>

<style lang="scss">
  .notificacao {
    .v-snack__wrapper {

      .v-snack__content {
        display: flex !important;
        height: auto;
        padding: 0px;
      }
    }
  }

  .notificacao-icone {
    align-self: normal;
    background-color: rgba(0, 0, 0, 0.1);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 0 25px 0 25px;
    top: 50%;
  }

  .notificacao-icone-aux {
    padding-top: 11px !important;
    padding-bottom: 11px !important;
    position: sticky;
    top: 13%;
  }

  .notificacao-texto {
    align-self: center;
    margin-left: 15px;
  }
</style>
