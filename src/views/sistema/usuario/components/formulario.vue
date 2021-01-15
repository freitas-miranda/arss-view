<template>
  <validation-observer
    ref="form"
    autocomplete="off"
    tag="form"
  >
    <v-row dense>
      <v-col
        :sm="exibirFormulario === $exibirFormulario.adicionar ? 3 : 5"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Login"
          rules="required"
          vid="login"
        >
          <v-text-field
            v-model="login"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            autofocus
            class="required"
            filled
            label="Login"
          />
        </validation-provider>
      </v-col>
      <v-col
        :sm="exibirFormulario === $exibirFormulario.adicionar ? 3 : 5"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Perfil"
          rules="required"
          vid="perfil"
        >
          <v-autocomplete
            v-model="perfil"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            :items="dropdownPerfil"
            class="required"
            filled
            item-text="descricao"
            item-value="id"
            label="Perfil"
          />
        </validation-provider>
      </v-col>
      <v-col
        v-if="exibirFormulario === $exibirFormulario.adicionar"
        sm="4"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Senha"
          rules="required"
          vid="senha"
        >
          <v-text-field
            v-model="senha"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            class="required"
            filled
            label="Senha"
            type="password"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Ativo"
          rules="required"
          vid="ativo"
        >
          <v-autocomplete
            v-model="ativo"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            :items="dropdownAtivo"
            class="required"
            filled
            item-text="descricao"
            item-value="codigo"
            label="Ativo"
          />
        </validation-provider>
      </v-col>
    </v-row>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponenteSistemaUsuarioFormulario',
  data () {
    return {
      ativo: null,
      dropdownAtivo: [
        {
          codigo: 1,
          descricao: 'SIM'
        },
        {
          codigo: 0,
          descricao: 'NÃO'
        }
      ],
      login: null,
      perfil: null,
      senha: null
    }
  },
  computed: {
    ...mapState('sistemaUsuario', [
      'dadosExibir',
      'dropdownPerfil',
      'exibirFormulario'
    ])
  },
  created () {
    if (this.exibirFormulario === this.$exibirFormulario.exibir) {
      this.ativo = this.dadosExibir.ativo
      this.login = this.dadosExibir.login
      this.perfil = this.dadosExibir.perfilId
    }
  },
  methods: {
    ...mapActions('sistemaUsuario', [
      'editar',
      'salvar'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate()) {
        if (this.exibirFormulario === this.$exibirFormulario.adicionar) {
          this.salvar({
            ativo: this.ativo,
            login: this.login,
            perfilId: this.perfil,
            senha: this.$crypto(this.senha)
          })
        } else {
          this.editar({
            id: this.dadosExibir.id,
            ativo: this.ativo,
            login: this.login,
            perfilId: this.perfil
          })
        }
      }
    }
  }
}
</script>
