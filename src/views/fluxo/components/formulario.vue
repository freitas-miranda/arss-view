<template>
  <validation-observer
    ref="form"
    autocomplete="off"
    tag="form"
  >
    <v-row dense>
      <v-col
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
        lg="5"
        sm="5"
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
      <v-col
        lg="3"
        sm="3"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Tipo Banco"
          rules="required"
          vid="tipoBanco"
        >
          <v-autocomplete
            v-model="tipoBanco"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            :items="tipoBancoList"
            auto-select-first
            class="required"
            filled
            item-text="descricao"
            item-value="item"
            label="Tipo Banco"
          />
        </validation-provider>
      </v-col>
      <v-col
        lg="2"
        sm="2"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Tabela"
          rules="required"
          vid="tabela"
        >
          <v-text-field
            v-model="tabela"
            v-uppercase
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            class="required"
            filled
            label="Tabela"
          />
        </validation-provider>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        lg="4"
        sm="4"
        cols="12"
      >
        <v-row no-gutters>
          <v-col
            lg="12"
            sm="12"
            cols="12"
            class="pb-2"
          >
            <validation-provider
              v-slot="{ errors }"
              name="Armazém Saída"
              rules="required"
              vid="armazemSaidaId"
            >
              <v-autocomplete
                v-model="armazemSaidaId"
                :disabled="exibirFormulario === $exibirFormulario.exibir"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                :items="armazens"
                auto-select-first
                class="required"
                filled
                item-text="descricao"
                item-value="id"
                label="Armazém Saída"
              />
            </validation-provider>
          </v-col>

          <v-col
            lg="12"
            sm="12"
            cols="12"
          >
            <validation-provider
              v-slot="{ errors }"
              name="Armazém Entrada"
              rules="required"
              vid="armazemEntradaId"
            >
              <v-autocomplete
                v-model="armazemEntradaId"
                :disabled="exibirFormulario === $exibirFormulario.exibir"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                :items="armazens"
                auto-select-first
                class="required"
                filled
                item-text="descricao"
                item-value="id"
                label="Armazém Entrada"
              />
            </validation-provider>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        lg="8"
        sm="8"
        cols="12"
      >
        <validation-provider
          v-slot="{ errors }"
          name="Observacão"
          rules="max:500"
          vid="observacao"
        >
          <v-textarea
            v-model="observacao"
            :disabled="exibirFormulario === $exibirFormulario.exibir"
            :error-messages="errors"
            :hide-details="erroValidacao(errors)"
            filled
            auto-grow
            rows="5"
            row-height="18"
            label="Observação"
          />
        </validation-provider>
      </v-col>
    </v-row>
    <v-footer>
      <v-spacer />
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
          >
            <v-icon small> mdi-security </v-icon>
            {{ ultimaAlteracao }}
          </span>
        </template>
        <span> Última alteração </span>
      </v-tooltip>
    </v-footer>
  </validation-observer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponenteFluxoFormulario',
  data () {
    return {
      descricao: null,
      status: null,
      tipoBanco: null,
      tabela: null,
      armazemSaidaId: null,
      armazemEntradaId: null,
      observacao: null,
      ultimaAlteracao: null
    }
  },
  computed: {
    ...mapState('fluxo', [
      'dadosExibir',
      'exibirFormulario',
      'tipoBancoList',
      'armazens'
    ])
  },
  created () {
    if (this.exibirFormulario === this.$exibirFormulario.exibir) {
      this.descricao = this.dadosExibir.descricao
      this.tipoBanco = this.dadosExibir.tipoBanco
      this.tabela = this.dadosExibir.tabela
      this.armazemSaidaId = this.dadosExibir.armazemSaidaId
      this.armazemEntradaId = this.dadosExibir.armazemEntradaId
      this.observacao = this.dadosExibir.observacao
      this.ultimaAlteracao = this.dadosExibir.ultimaAlteracao
    }
  },
  methods: {
    ...mapActions('fluxo', [
      'editar',
      'salvar'
    ]),
    async confirmar () {
      if (await this.$refs.form.validate()) {
        if (this.exibirFormulario === this.$exibirFormulario.adicionar) {
          this.salvar({
            descricao: this.descricao,
            tipoBanco: this.tipoBanco,
            tabela: this.tabela,
            armazemSaidaId: this.armazemSaidaId,
            armazemEntradaId: this.armazemEntradaId,
            observacao: this.observacao
          })
        } else {
          this.editar({
            id: this.dadosExibir.id,
            descricao: this.descricao,
            tipoBanco: this.tipoBanco,
            tabela: this.tabela,
            armazemSaidaId: this.armazemSaidaId,
            armazemEntradaId: this.armazemEntradaId,
            observacao: this.observacao
          })
        }
      }
    }
  }
}
</script>
