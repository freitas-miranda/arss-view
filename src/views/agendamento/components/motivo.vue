<template>
  <div>
    <modal
      v-model="modal"
      :loading="loading"
      adicionar
      largura="1000"
      titulo="Recusar agendamento"
      @confirmar="salvarObservacao()"
      @cancelar="$emit('update:value', false)"
      @input="$emit('input', $event)"
    >
      <validation-observer
        ref="form"
        autocomplete="off"
        tag="form"
      >
        <v-card-title>
          Por favor, adicione o motivo da recusa do agendamento!
        </v-card-title>
        <v-row dense>
          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="motivo"
              rules="required|max:1000"
              vid="motivo"
            >
              <v-textarea
                v-model="observacao"
                :error-messages="errors"
                :hide-details="!errors.length"
                class="required"
                dense
                label="Motivo"
                outlined
                rows="5"
              />
            </validation-provider>
          </v-col>
        </v-row>
      </validation-observer>
      <template v-slot:acao>
        <v-btn
          color="primary"
          small
          title="Voltar"
          @click="fechar()"
        >
          <v-icon left>
            mdi-reply
          </v-icon>
          Voltar
        </v-btn>
        <v-btn
          color="warning"
          small
          @click="confirmar()"
        >
          <v-icon left>
            mdi-check-bold
          </v-icon>
          Confirmar
        </v-btn>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'ComponenteModalObservacao',

  props: {
    loading: {
      default: false,
      type: Boolean
    },
    texto: {
      required: true,
      validator: function (value) {
        return (
          typeof value === 'undefined' ||
          typeof value === 'string' ||
          value === null
        )
      }
    },
    value: {
      required: true,
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    modal: true,
    observacao: null
  }),

  watch: {
    value (valor) {
      if (valor) this.modal = true
      else this.modal = false
    }
  },

  created () {
    this.observacao = this.texto
    this.modal = this.value
  },

  methods: {
    async confirmar () {
      if (await this.$refs.form.validate()) {
        this.$emit('confirmar', this.observacao)
        this.$emit('update:value', false)
      }
    },
    fechar () {
      this.$emit('update:value', false)
    }
  }
}
</script>
