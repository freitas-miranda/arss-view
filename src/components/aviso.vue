<template>
  <v-dialog
    :value="valor"
    persistent
    width="600"
  >
    <v-card>
      <v-card-title>
        <v-icon
          :color="erro ? 'error' : 'warning'"
          size="35"
        >
          mdi-alert-circle-outline
        </v-icon>
        <span class="text-h5 ml-3 font-weight-medium">
          {{ titulo }}
        </span>
      </v-card-title>
      <v-divider />
      <v-card-text class="py-3 px-6 body-1">
        <slot />
      </v-card-text>
      <divisao />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          @click="valor = false"
        >
          <v-icon left>
            mdi-check-circle-outline
          </v-icon>
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponenteAviso',
  props: {
    erro: {
      default: '',
      type: String
    },
    titulo: {
      default: 'Aviso!',
      type: String
    },
    value: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    valor: {
      get () {
        return this.value
      },
      set (valor) {
        this.$emit('input', valor)
      }
    }
  }
}
</script>
