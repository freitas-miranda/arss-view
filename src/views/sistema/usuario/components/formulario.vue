<template>
  <validation-observer
    ref="form"
    autocomplete="off"
    tag="form"
  >
    <v-row dense>
      <v-col
        v-if="exibirFormulario !== $exibirFormulario.adicionar"
        sm="2"
        cols="12"
      >
        <v-text-field
          v-model="dadosExibir.id"
          disabled
          hide-details
          filled
          label="Código"
        />
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Nome"
          rules="required"
          vid="nome"
        >
          <v-text-field
            v-model="nome"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            autofocus
            class="required"
            filled
            label="Nome"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="E-mail"
          rules="required"
          vid="email"
        >
          <v-text-field
            v-model="email"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            autofocus
            class="required"
            filled
            label="E-mail"
          />
        </validation-provider>
      </v-col>
      <v-col
        v-if="exibirFormulario === $exibirFormulario.adicionar"
        sm="2"
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
      codigo: null,
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
      email: null,
      nome: null,
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
      this.nome = this.dadosExibir.nome
      this.email = this.dadosExibir.email
      this.perfil = this.dadosExibir.perfilAcessoId
      this.ativo = this.dadosExibir.ativo
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
            nome: this.nome,
            email: this.email,
            senha: this.$crypto(this.senha),
            perfilAcessoId: this.perfil,
            ativo: this.ativo
          })
        } else {
          this.editar({
            id: this.dadosExibir.id,
            nome: this.nome,
            email: this.email,
            perfilAcessoId: this.perfil,
            ativo: this.ativo
          })
        }
      }
    }
  }
}
</script>
