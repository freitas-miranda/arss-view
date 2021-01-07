<template>
  <ValidationObserver
    autocomplete="off"
    ref="form"
    tag="form"
  >
    <v-row dense>
      <v-col
        lg="3"
        sm="4"
        cols="12"
      >
        <ValidationProvider
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
        </ValidationProvider>
      </v-col>
      <v-col
        lg="2"
        sm="3"
        cols="12"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="Status"
          rules="required"
          vid="status"
        >
          <v-autocomplete
            v-model="status"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            :items="opcao2"
            auto-select-first
            class="required"
            clearable
            filled
            item-text="descricao"
            item-value="item"
            label="Status"
          />
        </ValidationProvider>
      </v-col>
    </v-row>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponenteExemploFormulario',
  computed: {
    ...mapState('exemplo', [
      'dadosExibir',
      'exibirFormulario',
      'opcao2'
    ])
  },
  created () {
    if (this.exibirFormulario === this.$exibirFormulario.exibir) {
      this.descricao = this.dadosExibir.descricao
      this.status = this.dadosExibir.statusCodigo
    }
  },
  data () {
    return {
      descricao: null,
      status: null
    }
  },
  methods: {
    ...mapActions('exemplo', [
      'editar',
      'salvar'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate()) {
        if (this.exibirFormulario === this.$exibirFormulario.adicionar) {
          this.salvar({
            descricao: this.descricao,
            status: this.status
          })
        } else {
          this.editar({
            id: this.dadosExibir.id,
            descricao: this.descricao,
            status: this.status
          })
        }
      }
    }
  }
}
</script>
