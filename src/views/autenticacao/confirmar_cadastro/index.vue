<template>
  <div>
    <loading v-model="loadingPrincipal" />
    <v-card-title
      v-if="$vuetify.breakpoint.width > 904"
      class="px-12 py-9 mt-2 justify-center text-h5 font-weight-bold primary--text"
    >
      Confirmar cadastro
    </v-card-title>
    <v-card-text :class="{ 'px-12': $vuetify.breakpoint.width > 904, 'px-6': !$vuetify.breakpoint.width > 904 }">
      <div
        class="pb-3 text-center grey--text"
      >
        <div class="text-subtitle-1 font-weight-medium mt-2 pt-2 pb-0">
          {{ dadosSolicitacao.nome }}
        </div>
        <div class="text-subtitle-2 font-weight-regular mt-2 pt-2 pb-6">
          {{ dadosSolicitacao.email }}
        </div>
      </div>
      <validation-observer
        ref="form"
        autocomplete="off"
        tag="form"
      >
        <v-row>
          <v-col
            :class="{ 'pr-1': !$vuetify.breakpoint.xs }"
            cols="12"
            sm="6"
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
                label="Senha"
                outlined
                @click:append="exibirSenha = !exibirSenha"
              />
            </validation-provider>
          </v-col>
          <v-col
            :class="{ 'pl-1': !$vuetify.breakpoint.xs }"
            cols="12"
            sm="6"
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
            class="pb-1"
            cols="12"
          >
            <v-btn
              :loading="loading"
              block
              color="primary"
              large
              @click="confirmar()"
            >
              Confirmar Cadastro
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
              color="primary"
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
  name: 'PaginaConfirmacaoCadastro',
  data () {
    return {
      cartao: null,
      exibirSenha: false,
      exibirSenhaConfirmacao: false,
      senha: null,
      senhaConfirmacao: null,
      store: {
        nome: 'confirmarCadastro',
        modulo: store
      },
      uf: null
    }
  },
  computed: {
    ...mapState('confirmarCadastro', [
      'dadosSolicitacao',
      'loading',
      'loadingPrincipal'
    ])
  },
  async created () {
    const solicitacao = await this.obterSolicitacao(this.$route.params.token)

    if (solicitacao.erro) this.$router.push('/login')
  },
  methods: {
    ...mapActions('confirmarCadastro', [
      'confirmarCadastro',
      'obterSolicitacao'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate() && !this.loading) {
        const confirmacao = await this.confirmarCadastro({
          solicitacaoId: this.dadosSolicitacao.id,
          email: this.dadosSolicitacao.email,
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
