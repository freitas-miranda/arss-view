<template>
  <modal
    v-model="modal"
    largura="750"
    titulo="Alterar senha"
  >
    <validation-observer
      ref="form"
      autocomplete="off"
      style="width: 100%;"
      tag="form"
    >
      <v-row>
        <v-col
          sm="6"
          cols="12"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Senha"
            rules="required|senha|max:64|min:6|confirmed:senhaConfirmacao"
            vid="senha"
          >
            <v-text-field
              ref="senha"
              v-model="senha"
              :append-icon="exibirSenha ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline'"
              :error-messages="errors"
              :hide-details="erroValidacao(errors)"
              :type="exibirSenha ? 'text' : 'password'"
              label="Senha"
              outlined
              @click:append="exibirSenha = !exibirSenha"
            />
          </validation-provider>
        </v-col>
        <v-col
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
    <template v-slot:acao>
      <v-spacer />
      <v-btn
        :loading="loadingAlterarSenha"
        color="error"
        @click="fechar()"
      >
        <v-icon left>
          mdi-cancel
        </v-icon>
        Cancelar
      </v-btn>
      <v-btn
        :loading="loadingAlterarSenha"
        color="success"
        dark
        @click="alterar()"
      >
        <v-icon left>
          mdi-check
        </v-icon>
        Alterar Senha
      </v-btn>
    </template>
  </modal>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'ComponenteAlterarSenha',
  data () {
    return {
      exibirSenha: false,
      exibirSenhaConfirmacao: false,
      senha: null,
      senhaConfirmacao: null
    }
  },
  computed: {
    ...mapState('app', [
      'loadingAlterarSenha',
      'modalAlterarSenha'
    ]),
    modal: {
      get () {
        return this.modalAlterarSenha
      },
      set (valor) {
        this.setModalAlterarSenha(valor)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.senha.focus()
    }, 200)
  },
  methods: {
    ...mapActions('app', [
      'alterarSenha'
    ]),
    ...mapMutations('app', [
      'setModalAlterarSenha'
    ]),
    async alterar () {
      if (await this.$refs.form.validate()) {
        this.alterarSenha({
          senha: this.$crypto(this.senha),
          senhaConfirmacao: this.$crypto(this.senhaConfirmacao)
        })
      }
    },
    fechar () {
      this.setModalAlterarSenha(false)
    }
  }
}
</script>
