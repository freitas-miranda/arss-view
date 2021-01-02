<template>
  <v-container
    fill-height
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-img
        :src="logo"
        max-height="auto"
        max-width="250"
      />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PaginaInicio',
  data () {
    return {
      logo: require('@/assets/logo.png')
    }
  }
}
</script>
