<template>
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
            class="required"
            filled
            label="CPF"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="3"
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
            item-value="codigo"
            label="Sexo"
          />
        </validation-provider>
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
          clearable
          item-text="descricao"
          item-value="codigo"
          label="Tipo Sanguíneo"
        />
      </v-col>
      <v-col
        class="pt-3 pb-2"
        cols="12"
      >
        <v-subheader
          class="pt-3"
        >
          Endereço do paciente
        </v-subheader>
        <v-divider />
      </v-col>
      <v-col
        sm="8"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="EnderecoLogradouro"
          vid="enderecoLogradouro"
        >
          <v-text-field
            v-model="enderecoLogradouro"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            filled
            label="Endereço"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <v-text-field
          v-model="enderecoNumero"
          v-uppercase
          :disabled="exibirFormulario === $exibirFormulario.exibir"
          hide-details
          filled
          label="Número"
        />
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <v-text-field
          v-model="enderecoCep"
          v-mask="['#####-###']"
          :disabled="exibirFormulario === $exibirFormulario.exibir"
          hide-details
          filled
          label="CEP"
        />
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-text-field
          v-model="enderecoBairro"
          v-uppercase
          :disabled="exibirFormulario === $exibirFormulario.exibir"
          hide-details
          filled
          label="Bairro"
        />
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-text-field
          v-model="enderecoCidade"
          v-uppercase
          :disabled="exibirFormulario === $exibirFormulario.exibir"
          hide-details
          filled
          label="Cidade"
        />
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Telefone"
          rules="min:2|max:2"
          vid="telefoneNumero"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="enderecoUf"
                v-uppercase
                :maxlength="2"
                :disabled="exibirFormulario === $exibirFormulario.exibir"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                filled
                label="Estado (UF)"
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <span>Sigla do estado</span>
          </v-tooltip>
        </validation-provider>
      </v-col>
      <v-col
        class="pt-3 pb-1"
        cols="12"
      >
        <v-subheader
          class="pt-3"
        >
          Informações para contato
        </v-subheader>
        <v-divider />
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Telefone"
          rules="min:14"
          vid="telefoneNumero"
        >
          <v-text-field
            v-model="telefoneNumero"
            v-mask="['(##) ####-####', '(##) #####-####']"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            filled
            label="Número Telefone"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="3"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Tipo Telefone"
          :rules="telefoneNumero ? 'required' : ''"
          vid="telefoneTipo"
        >
          <v-autocomplete
            v-model="telefoneTipo"
            :disabled="!telefoneNumero || exibirFormulario === $exibirFormulario.exibir"
            :items="dropdownTipoTelefone"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            filled
            item-text="descricao"
            item-value="codigo"
            label="Tipo Telefone"
          />
        </validation-provider>
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Email"
          rules="email"
          vid="email"
        >
          <v-text-field
            v-model="email"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            filled
            label="E-mail"
          />
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
      altura: null,
      enderecoLogradouro: null,
      enderecoNumero: null,
      enderecoBairro: null,
      enderecoCep: null,
      enderecoCidade: null,
      enderecoUf: null,
      telefoneNumero: null,
      telefoneTipo: null,
      email: null
    }
  },
  computed: {
    ...mapState('paciente', [
      'dadosExibir',
      'dropdownSexo',
      'dropdownTipoSanguineo',
      'dropdownTipoTelefone',
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
      this.enderecoLogradouro = this.dadosExibir.enderecoLogradouro
      this.enderecoNumero = this.dadosExibir.enderecoNumero
      this.enderecoBairro = this.dadosExibir.enderecoBairro
      this.enderecoCep = this.dadosExibir.enderecoCep
      this.enderecoCidade = this.dadosExibir.enderecoCidade
      this.enderecoUf = this.dadosExibir.enderecoUf
      this.telefoneNumero = this.dadosExibir.telefoneNumero
      this.telefoneTipo = this.dadosExibir.telefoneTipo
      this.email = this.dadosExibir.email
    }
  },
  methods: {
    ...mapActions('paciente', [
      'editar',
      'salvar'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate()) {
        const dados = {
          pessoaId: this.dadosExibir.pessoaId,
          cpf: this.$cpf.strip(this.cpf),
          nome: this.nome,
          cartaoSus: this.cartaoSus,
          dataNascimento: this.$fdate.toSql(this.dataNascimento),
          sexo: this.sexo,
          tipoSanguineo: this.tipoSanguineo,
          peso: this.peso,
          altura: this.altura,
          endereco: {
            pessoaEnderecoId: this.dadosExibir.pessoaEnderecoId,
            logradouro: this.enderecoLogradouro,
            numero: this.enderecoNumero,
            bairro: this.enderecoBairro,
            cep: this.enderecoCep,
            cidade: this.enderecoCidade,
            uf: this.enderecoUf
          },
          telefone: {
            pessoaTelefoneId: this.dadosExibir.pessoaTelefoneId,
            numero: this.$cpf.strip(this.telefoneNumero),
            tipo: this.telefoneTipo
          },
          email: {
            pessoaEmailId: this.dadosExibir.pessoaEmailId,
            email: this.email
          }
        }
        if (this.exibirFormulario === this.$exibirFormulario.adicionar) {
          this.salvar(dados)
        } else {
          this.editar({
            id: this.dadosExibir.id,
            ...dados
          })
        }
      }
    }
  }
}
</script>
