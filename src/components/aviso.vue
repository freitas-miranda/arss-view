<template>
  <v-dialog
    :value="value"
    persistent
    width="650"
  >
    <v-card>
      <v-toolbar
        color="accent"
        flat
      >
        <v-toolbar-title class="text-h5 ml-2">
          <slot name="cabecalho">
            Aviso!
          </slot>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title class="text-body-1 font-weight-regular">
        <slot />
      </v-card-title>
      <v-divider />
      <v-card-actions>
        <slot name="rodape" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponenteAviso',
  props: {
    value: {
      default: false,
      required: true,
      type: Boolean
    }
  }
}
</script>
