<template>
  <validation-observer
    ref="form"
    autocomplete="off"
    tag="form"
  >
    <v-row dense>
      <v-col
        lg="1"
        md="1"
        sm="2"
        cols="2"
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
        lg="5"
        md="6"
        sm="7"
        cols="10"
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
  name: 'ComponenteArmazemFormulario',
  data () {
    return {
      descricao: null
    }
  },
  computed: {
    ...mapState('armazem', [
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
    ...mapActions('armazem', [
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
