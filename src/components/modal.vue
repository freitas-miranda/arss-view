<template>
  <v-dialog
    :value="value"
    :width="largura"
    persistent
  >
    <v-card>
      <v-toolbar
        class="toolbar-modal"
        dark
        flat
      >
        <v-btn
          dark
          icon
          @click="$emit('input', false)"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-toolbar-title class="text-h6">
          {{ titulo }}
        </v-toolbar-title>
        <v-spacer />
        <slot name="maisOpcoes" />
      </v-toolbar>
      <v-card-text
        v-if="value"
        class="scroll-modal"
      >
        <slot />
      </v-card-text>
      <v-divider v-if="!ocultarRodape" />
      <v-card-actions v-if="!ocultarRodape">
        <slot name="acao" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponenteModal',
  props: {
    largura: {
      default: 1200,
      type: [Number, String]
    },
    ocultarRodape: {
      default: false,
      type: Boolean
    },
    titulo: {
      required: true,
      type: String
    },
    value: {
      default: false,
      required: true,
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
  .toolbar-modal {
    background: linear-gradient(90deg, rgba(0,121,107,1) 0%, rgb(21, 146, 129) 100%) !important;
  }

  .scroll-modal {
    max-height: 700px;
    overflow-y: auto !important;
  }
</style>
