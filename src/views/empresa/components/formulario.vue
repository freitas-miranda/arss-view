<template>
  <validation-observer
    ref="form"
    autocomplete="off"
    tag="form"
  >
    <v-row>
      <v-col
        lg="2"
        md="2"
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="ID"
          rules="required|numeric"
          vid="id"
        >
          <v-text-field
            v-model="id"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            autofocus
            class="required"
            filled
            label="ID"
          />
        </validation-provider>
      </v-col>
      <v-col
        lg="2"
        md="2"
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Grupo"
          rules="required"
          vid="grupo"
        >
          <v-text-field
            v-model="grupo"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            class="required"
            filled
            label="Grupo"
          />
        </validation-provider>
      </v-col>
      <v-col
        lg="2"
        md="2"
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Empresa"
          rules="required"
          vid="empresa"
        >
          <v-text-field
            v-model="codigo"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            class="required"
            filled
            label="Empresa"
          />
        </validation-provider>
      </v-col>
      <v-col
        lg="6"
        md="6"
        sm="6"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="CNPJ"
          rules="required"
          vid="cnpj"
        >
          <v-text-field
            v-model="cnpj"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            class="required"
            filled
            label="CNPJ"
          />
        </validation-provider>
      </v-col>
    </v-row>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponenteEmpresaFormulario',
  data () {
    return {
      cnpj: null,
      codigo: null,
      descricao: null,
      grupo: null,
      id: null
    }
  },
  computed: {
    ...mapState('empresa', [
      'dadosExibir',
      'exibirFormulario'
    ])
  },
  created () {
    if (this.exibirFormulario === this.$exibirFormulario.exibir) {
      this.id = this.dadosExibir.id
      this.grupo = this.dadosExibir.grupo
      this.codigo = this.dadosExibir.codigo
      this.cnpj = this.dadosExibir.cnpj
    }
  },
  methods: {
    ...mapActions('empresa', [
      'editar',
      'salvar'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate()) {
        if (this.exibirFormulario === this.$exibirFormulario.adicionar) {
          this.salvar({
            id: this.id,
            grupo: this.grupo,
            codigo: this.codigo,
            cnpj: this.cnpj
          })
        } else {
          this.editar({
            id: this.id,
            grupo: this.grupo,
            codigo: this.codigo,
            cnpj: this.cnpj
          })
        }
      }
    }
  }
}
</script>
