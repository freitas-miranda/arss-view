<template>
  <v-dialog
    :value="value"
    persistent
    width="500"
  >
    <v-card>
      <v-toolbar
        color="primary"
        dark
        dense
      >
        <v-btn
          :loading="loading"
          dark
          icon
          text
          title="Fechar"
          @click="$emit('input', false)"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-toolbar-title>
          <span v-if="multiplos">
            Excluir Registros
          </span>
          <span v-else>
            Excluir Registro
          </span>
        </v-toolbar-title>
      </v-toolbar>
      <v-divider class="divider-app" />
      <v-card-text class="pa-5 subtitle-1">
        <span v-if="multiplos">
          Deseja realmente excluir os registros selecionados ?
        </span>
        <span v-else>
          Deseja realmente excluir o registro ?
        </span>
      </v-card-text>
      <divisao />
      <v-card-actions>
        <v-spacer />
        <v-btn
          :block="$vuetify.breakpoint.xs"
          :loading="loading"
          color="primary"
          dark
          small
          @click="$emit('excluir')"
        >
          <v-icon left>
            mdi-check-bold
          </v-icon>
          Confirmar
        </v-btn>
        <v-btn
          :block="$vuetify.breakpoint.xs"
          :loading="loading"
          color="error"
          dark
          small
          @click="$emit('input', false)"
        >
          <v-icon left>
            mdi-close-circle-outline
          </v-icon>
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponenteExcluirRegistro',
  props: {
    loading: {
      required: true,
      type: Boolean
    },
    multiplos: {
      default: false,
      type: Boolean
    },
    value: {
      required: true,
      type: Boolean
    }
  }
}
</script>
