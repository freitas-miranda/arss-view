<template>
  <v-container fluid>
    <v-dialog
      v-model="modalSenha"
      width="400"
    >
      <v-card>
        <div>
          <div class="pa-2 d-flex justify-center">
            <v-img
              :src="logo"
              max-width="90px"
            />
          </div>
          <div
            :class="{ 'caption': $vuetify.breakpoint.xs }"
            class="font-weight-medium d-flex justify-center pa-2"
          >
            Para continuar, por favor digite sua senha atual!
          </div>
        </div>
        <v-divider />
        <v-card-text class="pa-5">
          <validation-observer
            ref="formSenha"
            autocomplete="off"
            tag="form"
            @keyup.enter="salvarPerfil()"
            @submit.prevent
          >
            <validation-provider
              ref="formSenha"
              v-slot="{ errors }"
              name="Senha"
              rules="required|senha|max:64|min:6"
              vid="senhaAtual"
            >
              <v-text-field
                v-model="senhaAtual"
                :append-icon="exibirSenhaAtual ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline'"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                :type="exibirSenhaAtual ? 'text' : 'password'"
                autofocus
                label="Senha"
                outlined
                @click:append="exibirSenhaAtual = !exibirSenhaAtual"
              />
            </validation-provider>
          </validation-observer>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            color="primary"
            block
            @click="salvarPerfil()"
          >
            <v-icon left>
              mdi-check-bold
            </v-icon>
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col
        lg="12"
        md="12"
        cols="12"
      >
        <v-card rounded="lg">
          <v-card-title>
            Alterar informações
          </v-card-title>
          <v-divider />
          <v-card-text>
            <validation-observer
              ref="form"
              autocomplete="off"
              tag="form"
            >
              <v-row dense>
                <v-col
                  sm="6"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Nome"
                    rules="required|max:50"
                    vid="nome"
                  >
                    <v-text-field
                      v-model="nome"
                      :disabled="!editarInformacoes"
                      :error-messages="errors"
                      :hide-details="erroValidacao(errors)"
                      label="Nome"
                      outlined
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  sm="6"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="E-mail"
                    rules="required|email|max:50"
                    vid="email"
                  >
                    <v-text-field
                      v-model="email"
                      :disabled="!editarInformacoes"
                      :error-messages="errors"
                      :hide-details="erroValidacao(errors)"
                      label="E-mail"
                      outlined
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  v-if="editarInformacoes"
                  cols="12"
                >
                  <v-checkbox
                    v-model="alterarSenha"
                    class="mt-0"
                    hide-details
                    label="Alterar senha de acesso?"
                  />
                </v-col>
                <v-col
                  v-if="alterarSenha"
                  sm="6"
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Nova Senha"
                    rules="required|senha|max:64|min:6|confirmed:senhaConfirmacao"
                    vid="senhaNova"
                  >
                    <v-text-field
                      v-model="senhaNova"
                      :append-icon="exibirSenhaNova ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline'"
                      :error-messages="errors"
                      :hide-details="erroValidacao(errors)"
                      :type="exibirSenhaNova ? 'text' : 'password'"
                      label="Nova Senha"
                      outlined
                      @click:append="exibirSenhaNova = !exibirSenhaNova"
                    />
                  </validation-provider>
                </v-col>
                <v-col
                  v-if="alterarSenha"
                  sm="6"
                  cols="12"
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
                      :hide-details="erroValidacao(errors)"
                      :type="exibirSenhaConfirmacao ? 'text' : 'password'"
                      label="Confirmar Senha"
                      outlined
                      @click:append="exibirSenhaConfirmacao = !exibirSenhaConfirmacao"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
            </validation-observer>
          </v-card-text>
          <v-divider />
          <v-card-actions class="px-4">
            <v-btn
              v-if="perfil.emailConfirmacao && !editarInformacoes"
              color="primary"
              dark
              @click="reenviar()"
            >
              <v-icon left>
                mdi-email
              </v-icon>
              Reenviar e-mail
            </v-btn>
            <v-spacer />
            <v-btn
              v-if="!editarInformacoes"
              color="primary"
              @click="editarInformacoes = true"
            >
              <v-icon left>
                mdi-lead-pencil
              </v-icon>
              Editar
            </v-btn>
            <v-btn
              v-if="editarInformacoes"
              color="primary"
              @click="validarDados()"
            >
              <v-icon left>
                mdi-check-bold
              </v-icon>
              Salvar
            </v-btn>
            <v-btn
              v-if="editarInformacoes"
              color="error"
              @click="retornar()"
            >
              <v-icon left>
                mdi-reply
              </v-icon>
              Retornar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PaginaPerfil',
  data () {
    return {
      alterarSenha: false,
      editarInformacoes: false,
      email: null,
      exibirSenhaAtual: false,
      exibirSenhaNova: false,
      exibirSenhaConfirmacao: false,
      logo: require('@/assets/logo.png'),
      modalSenha: false,
      nome: null,
      senhaAtual: null,
      senhaNova: null,
      senhaConfirmacao: null
    }
  },
  computed: {
    ...mapState('perfil', [
      'perfil'
    ]),
    nomeAbreviado () {
      const preposicoes = [
        'DA',
        'DAS',
        'DE',
        'DO',
        'DOS'
      ]

      const nomeCompleto = this.perfil.nome ? this.perfil.nome.toUpperCase().split(' ') : []

      let nomeAbreviado = []

      for (let i = 0; i < nomeCompleto.length; i++) {
        if (nomeAbreviado.length === 2) break
        else {
          if (!preposicoes.some(item => item === nomeCompleto[i])) {
            nomeAbreviado.push(nomeCompleto[i].slice(0, 1))
          }
        }
      }

      return nomeAbreviado.join('')
    }
  },
  watch: {
    modalSenha (valor) {
      if (!valor) {
        this.senhaAtual = null
        this.exibirSenhaAtual = false
        this.$refs.formSenha.reset()
      }
    }
  },
  async created () {
    const exibir = await this.exibir()

    if (!exibir.erro) {
      this.nome = exibir.nome
      this.email = exibir.email
    }
  },
  methods: {
    ...mapActions('perfil', [
      'exibir',
      'reenviar',
      'salvar'
    ]),
    retornar () {
      this.modalSenha = false
      this.editarInformacoes = false
      this.alterarSenha = false
      this.nome = this.perfil.nome
      this.email = this.perfil.email
      this.senhaAtual = null
      this.senhaNova = null
      this.senhaConfirmacao = null
      this.exibirSenhaAtual = false
      this.exibirSenhaNova = false
      this.exibirSenhaConfirmacao = false
      this.$refs.form.reset()
    },
    async salvarPerfil () {
      if (await this.$refs.form.validate() && await this.$refs.formSenha.validate()) {
        const salvar = await this.salvar({
          nome: this.nome,
          email: this.email,
          senhaAtual: this.senhaAtual ? this.$crypto(this.senhaAtual) : undefined,
          senhaNova: this.senhaNova ? this.$crypto(this.senhaNova) : undefined,
          senhaConfirmacao: this.senhaConfirmacao ? this.$crypto(this.senhaConfirmacao) : undefined
        })

        if (salvar.mensagem) this.retornar()
        else if (typeof salvar.erro === 'object') {
          this.$refs.form.setErrors(salvar.erro)
          this.$refs.formSenha.setErrors(salvar.erro)
        }
      }
    },
    async validarDados () {
      if (await this.$refs.form.validate()) {
        this.modalSenha = true
      }
    }
  }
}
</script>
