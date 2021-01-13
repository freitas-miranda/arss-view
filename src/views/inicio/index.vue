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
        class="ma-12"
        height="70%"
        max-width="600px"
        width="70%"
      />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PGinaInCio',
  data () {
    return {
      logo: require('@/assets/logo_inicio.png')
    }
  }
}
</script>
