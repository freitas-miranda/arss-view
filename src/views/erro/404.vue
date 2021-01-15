<template>
  <v-container
    class="container-404"
    fluid
    fill-height
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="d-flex justify-center"
        cols="12"
      >
        <v-img
          :src="logo"
          max-height="auto"
          class="ma-12"
          height="70%"
          max-width="600px"
          width="70%"
        />
      </v-col>
      <v-col
        class="d-flex justify-center"
        cols="12"
      >
        <v-btn
          color="primary"
          dark
          x-large
          @click="$router.go(-1)"
        >
          <v-icon left>
            mdi-reply
          </v-icon>
          Retornar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Pagina404',
  data () {
    return {
      logo: require('@/assets/404.png')
    }
  }
}
</script>

<style lang="scss">
  .container-404 {
    background-color: #e9e9e9;
    background-repeat: repeat;
  }
</style>
