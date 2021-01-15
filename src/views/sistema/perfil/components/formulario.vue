<template>
  <validation-observer
    ref="form"
    autocomplete="off"
    tag="form"
  >
    <v-row dense>
      <v-col
        v-if="exibirFormulario !== $exibirFormulario.adicionar"
        lg="2"
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
        :sm="exibirFormulario !== $exibirFormulario.adicionar ? 10 : 12"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Descrição"
          rules="required"
          vid="descricao"
        >
          <v-text-field
            v-model="descricao"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            autofocus
            class="required"
            filled
            label="Descrição"
          />
        </validation-provider>
      </v-col>
    </v-row>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponenteSistemaPerfilFormulario',
  data () {
    return {
      descricao: null
    }
  },
  computed: {
    ...mapState('sistemaPerfil', [
      'dadosExibir',
      'exibirFormulario'
    ])
  },
  created () {
    if (this.exibirFormulario === this.$exibirFormulario.exibir) {
      this.descricao = this.dadosExibir.descricao
    }
  },
  methods: {
    ...mapActions('sistemaPerfil', [
      'editar',
      'salvar'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate()) {
        if (this.exibirFormulario === this.$exibirFormulario.adicionar) {
          this.salvar({
            descricao: this.descricao
          })
        } else {
          this.editar({
            id: this.dadosExibir.id,
            descricao: this.descricao
          })
        }
      }
    }
  }
}
</script>
