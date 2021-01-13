<template>
  <v-snackbar
    v-model="ativo"
    :color="notificacao.cor"
    :timeout="notificacao.tempo"
    class="notificacao"
    rounded="lg"
    center
    top
  >
    <div class="d-flex">
      <div class="notificacao-icone d-flex align-self-auto">
        <div class="align-self-center">
          <v-icon
            dark
            size="30"
          >
            {{ notificacao.icone }}
          </v-icon>
        </div>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div
        class="align-self-center ml-3 mr-2"
        v-html="notificacao.mensagem"
      />
      <!-- eslint-enable vue/no-v-html -->
    </div>

    <template v-slot:action>
      <v-btn
        icon
        @click="ativo = false"
      >
        <v-icon dark>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ComponenteNotificacao',
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
        padding: 0px;
      }
    }
  }

  .notificacao-icone {
    background-color: rgba(0, 0, 0, 0.1);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 20px;
  }
</style>
