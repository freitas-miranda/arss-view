<template>
  <v-overlay
    :absolute="absoluto"
    :opacity="0.15"
    :value="value"
  >
    <v-progress-circular
      indeterminate
      size="64"
    />
  </v-overlay>
</template>

<script>
export default {
  name: 'ComponenteLoading',
  props: {
    absoluto: {
      default: false,
      type: Boolean
    },
    value: {
      default: false,
      type: Boolean,
      required: true
    }
  }
}
</script>
