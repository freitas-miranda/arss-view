<template>
  <div>
    <aviso v-model="avisoNaoCadastrado">
      <p>O e-mail <b>{{ email }}</b> não está cadastrado.</p>
      <template v-slot:rodape>
        <v-row no-gutters>
          <v-col
            :class="{ 'text-center mb-2': $vuetify.breakpoint.xs }"
            class="pl-4"
            cols="12"
            sm="6"
          >
            Deseja efetuar o cadastro ?
          </v-col>
          <v-col
            :class="{ 'text-center': $vuetify.breakpoint.xs, 'text-right': !$vuetify.breakpoint.xs }"
            class="pr-4"
            cols="12"
            sm="6"
          >
            <v-btn
              class="mr-1"
              color="secondary"
              @click="redirecionarCadastro()"
            >
              <v-icon left>
                mdi-check
              </v-icon>
              Sim
            </v-btn>
            <v-btn
              class="ml-1"
              color="error"
              @click="avisoNaoCadastrado = false"
            >
              <v-icon left>
                mdi-cancel
              </v-icon>
              Não
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </aviso>
    <v-card-title
      v-if="$vuetify.breakpoint.width > 904"
      class="px-12 py-12 mt-2 justify-center text-h5 font-weight-bold primary--text"
    >
      ACESSAR O SISTEMA
    </v-card-title>
    <v-card-text :class="$vuetify.breakpoint.width > 904 ? 'px-12' : 'px-6'">
      <validation-observer
        ref="form"
        autocomplete="off"
        tag="form"
        @keyup.enter="efetuarLogin()"
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
                ref="email"
                v-model.trim="email"
                v-lowercase
                :error-messages="errors"
                append-icon="mdi-email-outline"
                label="E-mail"
                outlined
              />
            </validation-provider>
          </v-col>
          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="Senha"
              rules="required|max:64"
              vid="senha"
            >
              <a @click="$router.push('/recuperar-senha')">
                <div class="mt-1 text-right">
                  Esqueceu sua senha?
                </div>
              </a>
              <v-text-field
                ref="senha"
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
            class="mt-2 pb-1"
            cols="12"
          >
            <v-btn
              :loading="loadingLogin"
              block
              color="secondary"
              large
              @click="efetuarLogin()"
            >
              Efetuar Login
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
              :loading="loadingLogin"
              block
              color="secondary"
              large
              @click="$router.push('/cadastrar')"
            >
              Cadastrar-se
            </v-btn>
          </v-col>
        </v-row>
      </validation-observer>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PaginaLogin',
  data () {
    return {
      avisoNaoCadastrado: false,
      email: null,
      exibirSenha: false,
      senha: null
    }
  },
  computed: {
    ...mapState('app', [
      'loadingLogin'
    ])
  },
  mounted () {
    if (localStorage.getItem('login:email')) {
      this.email = window.atob(localStorage.getItem('login:email'))

      this.$nextTick(() => {
        this.$refs.senha.focus()
      })
    } else {
      this.$refs.email.focus()
    }
  },
  methods: {
    ...mapActions('app', [
      'login'
    ]),
    async efetuarLogin () {
      if (await this.$refs.form.validate() && !this.loading) {
        const login = await this.login({
          email: this.email,
          senha: this.$crypto(this.senha)
        })

        if (login.token) this.$router.push('/')
        else if (typeof login.erro === 'object') {
          this.$refs.form.setErrors(login.erro)

          if (login.erro.email && login.erro.email[0] === 'E-mail não cadastrado!') {
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
