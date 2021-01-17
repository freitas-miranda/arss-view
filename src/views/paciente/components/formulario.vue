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
          name="CPF"
          rules="required|max:14"
          vid="cpf"
        >
          <v-text-field
            v-model="cpf"
            v-mask="['###.###.###-##']"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            autofocus
            class="required"
            filled
            label="CPF"
          />
        </validation-provider>
      </v-col>
      <v-col
        :sm="exibirFormulario !== $exibirFormulario.adicionar ? 5 : 7"
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
            class="required"
            filled
            label="Nome"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Cartão SUS"
          rules="numeric"
          vid="cartaoSus"
        >
          <v-text-field
            v-model="cartaoSus"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            filled
            label="Cartão SUS"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="data nascimento"
          rules="required"
          vid="dataNascimento"
        >
          <date-picker
            v-model="dataNascimento"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            class="required"
            label="Nascimento"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Sexo"
          rules="required"
          vid="perfil"
        >
          <v-autocomplete
            v-model="sexo"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            :items="dropdownSexo"
            class="required"
            filled
            item-text="descricao"
            item-value="id"
            label="Sexo"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <v-autocomplete
          v-model="tipoSanguineo"
          :disabled="exibirFormulario === $exibirFormulario.exibir"
          :items="dropdownTipoSanguineo"
          filled
          hide-details
          item-text="descricao"
          item-value="id"
          label="Tipo Sanguíneo"
        />
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Peso"
          rules="numeric"
          vid="peso"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="peso"
                :disabled="exibirFormulario === $exibirFormulario.exibir"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                filled
                label="Peso (kg)"
                type="number"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <span>Peso em quilos</span>
          </v-tooltip>
        </validation-provider>
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Altura"
          rules="numeric"
          vid="altura"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="altura"
                :disabled="exibirFormulario === $exibirFormulario.exibir"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                filled
                label="Altura (m)"
                type="number"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <span>Altura em metros</span>
          </v-tooltip>
        </validation-provider>
      </v-col>
    </v-row>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponentePacienteFormulario',
  data () {
    return {
      codigo: null,
      cpf: null,
      nome: null,
      cartaoSus: null,
      dataNascimento: null,
      sexo: null,
      tipoSanguineo: null,
      peso: null,
      altura: null
    }
  },
  computed: {
    ...mapState('paciente', [
      'dadosExibir',
      'dropdownSexo',
      'dropdownTipoSanguineo',
      'exibirFormulario'
    ])
  },
  created () {
    if (this.exibirFormulario === this.$exibirFormulario.exibir) {
      this.cpf = this.dadosExibir.cpf
      this.nome = this.dadosExibir.nome
      this.cartaoSus = this.dadosExibir.cartaoSus
      this.dataNascimento = this.dadosExibir.dataNascimento
      this.sexo = this.dadosExibir.sexo
      this.tipoSanguineo = this.dadosExibir.tipoSanguineo
      this.peso = this.dadosExibir.peso
      this.altura = this.dadosExibir.altura
    }
  },
  methods: {
    ...mapActions('paciente', [
      'editar',
      'salvar'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate()) {
        if (this.exibirFormulario === this.$exibirFormulario.adicionar) {
          this.salvar({
            pessoaId: this.dadosExibir.id,
            cpf: this.$cpf.strip(this.cpf),
            nome: this.nome,
            cartaoSus: this.cartaoSus,
            dataNascimento: this.dataNascimento ? this.$day(this.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            sexo: this.sexo,
            tipoSanguineo: this.tipoSanguineo,
            peso: this.peso,
            altura: this.altura
          })
        } else {
          this.editar({
            id: this.dadosExibir.id,
            pessoaId: this.dadosExibir.id,
            cpf: this.$cpf.strip(this.cpf),
            nome: this.nome,
            cartaoSus: this.cartaoSus,
            dataNascimento: this.dataNascimento ? this.$day(this.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            sexo: this.sexo,
            tipoSanguineo: this.tipoSanguineo,
            peso: this.peso,
            altura: this.altura
          })
        }
      }
    }
  }
}
</script>
