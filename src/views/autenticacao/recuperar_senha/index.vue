<template>
  <div>
    <aviso v-model="avisoNaoCadastrado">
      <p>O e-mail <b>{{ email }}</b> não está cadastrado.</p>
      <template v-slot:rodape>
        <div class="ml-4">
          Deseja efetuar o cadastro ?
        </div>
        <v-spacer />
        <v-btn
          color="secondary"
          @click="redirecionarCadastro()"
        >
          <v-icon left>
            mdi-check
          </v-icon>
          Sim
        </v-btn>
        <v-btn
          color="error"
          @click="avisoNaoCadastrado = false"
        >
          <v-icon left>
            mdi-cancel
          </v-icon>
          Não
        </v-btn>
      </template>
    </aviso>
    <v-card-title
      v-if="$vuetify.breakpoint.width > 904"
      class="px-12 py-12 mt-7 justify-center text-h5 font-weight-bold primary--text"
    >
      Recuperação de senha
    </v-card-title>
    <v-card-text :class="$vuetify.breakpoint.width > 904 ? 'px-12 mt-10' : 'px-6'">
      <validation-observer
        ref="form"
        autocomplete="off"
        tag="form"
        @keyup.enter="recuperar()"
        @submit.prevent
      >
        <v-row no-gutters>
          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="E-mail"
              rules="required|email|max:50"
              vid="email"
            >
              <v-text-field
                v-model.trim="email"
                v-lowercase
                :error-messages="errors"
                append-icon="mdi-email-outline"
                autofocus
                label="E-mail"
                outlined
              />
            </validation-provider>
          </v-col>
          <v-col
            class="mt-12 pt-2"
            cols="12"
          >
            <v-btn
              :loading="loading"
              block
              color="secondary"
              large
              @click="recuperar()"
            >
              Recuperar senha
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
  name: 'PaginaRecuperarSenha',
  data () {
    return {
      avisoNaoCadastrado: false,
      email: null,
      store: {
        nome: 'recuperarSenha',
        modulo: store
      }
    }
  },
  computed: {
    ...mapState('recuperarSenha', [
      'loading'
    ])
  },
  methods: {
    ...mapActions('recuperarSenha', [
      'recuperarSenha'
    ]),
    async recuperar () {
      if (await this.$refs.form.validate() && !this.loading) {
        const recuperacao = await this.recuperarSenha({ email: this.email })

        if (recuperacao.mensagem) this.$router.push('/login')
        else if (typeof recuperacao.erro === 'object') {
          this.$refs.form.setErrors(recuperacao.erro)

          if (recuperacao.erro.email && recuperacao.erro.email[0] === 'E-mail não cadastrado!') {
            this.avisoNaoCadastrado = true
          }
        }
      }
    },
    redirecionarCadastro () {
      this.avisoNaoCadastrado = false
      this.$router.push({ path: '/cadastrar', query: { email: this.email } })
    }
  }
}
</script>
