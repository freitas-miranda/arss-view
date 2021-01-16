<template>
  <div>
    <loading v-model="loadingPrincipal" />
    <v-card-title
      v-if="$vuetify.breakpoint.width > 904"
      class="px-12 pt-12 mt-5 pb-10 justify-center text-h5 font-weight-bold primary--text"
    >
      Alteração de senha
    </v-card-title>
    <v-card-text :class="$vuetify.breakpoint.width > 904 ? 'px-12' : 'px-6'">
      <div class="text-center grey--text pb-10">
        <div class="text-subtitle-1 font-weight-medium">
          {{ dadosRecuperacao.nome }}
        </div>
        <div class="text-subtitle-2 font-weight-regular">
          {{ dadosRecuperacao.email }}
        </div>
      </div>
      <validation-observer
        ref="form"
        autocomplete="off"
        tag="form"
      >
        <v-row no-gutters>
          <v-col
            cols="6"
            class="pr-1"
          >
            <validation-provider
              v-slot="{ errors }"
              name="Senha"
              rules="required|senha|max:64|min:6|confirmed:senhaConfirmacao"
              vid="senha"
            >
              <v-text-field
                v-model="senha"
                :append-icon="exibirSenha ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline'"
                :error-messages="errors"
                :type="exibirSenha ? 'text' : 'password'"
                autofocus
                label="Senha"
                outlined
                @click:append="exibirSenha = !exibirSenha"
              />
            </validation-provider>
          </v-col>
          <v-col
            class="pl-1"
            cols="6"
          >
            <validation-provider
              v-slot="{ errors }"
              name="Confirmar Senha"
              rules="required|senha|max:64|min:6"
              vid="senhaConfirmacao"
            >
              <v-text-field
                v-model="senhaConfirmacao"
                :append-icon="exibirSenhaConfirmacao ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline'"
                :error-messages="errors"
                :type="exibirSenhaConfirmacao ? 'text' : 'password'"
                label="Confirmar Senha"
                outlined
                @click:append="exibirSenhaConfirmacao = !exibirSenhaConfirmacao"
              />
            </validation-provider>
          </v-col>
          <v-col
            class="mt-2 pt-4 pb-3"
            cols="12"
          >
            <v-btn
              :loading="loading"
              block
              color="secondary"
              large
              @click="confirmar()"
            >
              Alterar Senha
            </v-btn>
          </v-col>
          <v-col
            v-if="$vuetify.breakpoint.width < 905"
            class="pt-0 pb-0 ou"
          >
            ou
          </v-col>
          <v-col
            v-if="$vuetify.breakpoint.width < 905"
            class="pt-1"
            cols="12"
          >
            <v-btn
              :loading="loading"
              block
              color="secondary"
              large
              @click="$router.push('/login')"
            >
              Retornar ao Login
            </v-btn>
          </v-col>
        </v-row>
      </validation-observer>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from './store'

export default {
  name: 'PaginaAlterarSenha',
  data () {
    return {
      exibirSenha: false,
      exibirSenhaConfirmacao: false,
      senha: null,
      senhaConfirmacao: null,
      store: {
        nome: 'alterarSenha',
        modulo: store
      }
    }
  },
  computed: {
    ...mapState('alterarSenha', [
      'dadosRecuperacao',
      'loading',
      'loadingPrincipal'
    ])
  },
  async created () {
    const recuperacao = await this.obterRecuperacao(this.$route.params.token)

    if (recuperacao.erro) this.$router.push('/login')
  },
  methods: {
    ...mapActions('alterarSenha', [
      'alterarSenha',
      'obterRecuperacao'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate() && !this.loading) {
        const confirmacao = await this.alterarSenha({
          id: this.dadosRecuperacao.id,
          senha: this.$crypto(this.senha),
          senhaConfirmacao: this.$crypto(this.senhaConfirmacao)
        })

        if (confirmacao.mensagem) this.$router.push('/login')
        else if (typeof confirmacao.erro === 'object') {
          this.$refs.form.setErrors(confirmacao.erro)
        }
      }
    }
  }
}
</script>
