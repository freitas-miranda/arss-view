<template>
  <div>
    <v-card-title
      v-if="$vuetify.breakpoint.width > 904"
      class="px-12 py-12 mt-2 justify-center text-h5 font-weight-bold primary--text"
    >
      Criar uma nova conta
    </v-card-title>
    <v-card-text :class="$vuetify.breakpoint.width > 904 ? 'px-12' : 'px-6'">
      <validation-observer
        ref="form"
        autocomplete="off"
        tag="form"
        @keyup.enter="criarConta()"
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
          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="Nome"
              rules="required|max:50"
              vid="nome"
            >
              <v-text-field
                v-model="nome"
                v-uppercase
                :error-messages="errors"
                append-icon="mdi-account-card-details-outline"
                label="Nome Completo"
                outlined
              />
            </validation-provider>
          </v-col>
          <v-col
            style="padding-top: 25px !important;"
            class="mt-2 pb-1"
            cols="12"
          >
            <v-btn
              :loading="loading"
              block
              color="secondary"
              large
              @click="criarConta()"
            >
              Cadastrar-se
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
  name: 'PaginaCadastro',
  data () {
    return {
      email: null,
      nome: null,
      store: {
        nome: 'criarConta',
        modulo: store
      }
    }
  },
  computed: {
    ...mapState('criarConta', [
      'loading'
    ])
  },
  created () {
    if (Object.keys(this.$route.query).length) {
      this.email = this.$route.query.email
    }
  },
  methods: {
    ...mapActions('criarConta', [
      'cadastrar'
    ]),
    async criarConta () {
      if (await this.$refs.form.validate() && !this.loading) {
        const cadastro = await this.cadastrar({
          nome: this.nome,
          email: this.email
        })

        if (cadastro.mensagem) this.$router.push('/login')
        else if (typeof cadastro.erro === 'object') {
          this.$refs.form.setErrors(cadastro.erro)
        }
      }
    }
  }
}
</script>
