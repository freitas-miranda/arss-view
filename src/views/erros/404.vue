<template>
  <v-container
    class="container-404"
    fluid
    fill-height
    pa-0
  >
    <v-row
      align="center"
      no-gutters
    >
      <v-col
        class="d-flex justify-center"
        cols="12"
      >
        <span
          class="font-weight-medium primary--text"
          style="font-size: 180px; line-height: 1;"
        >
          4
        </span>
        <v-icon
          color="primary"
          size="150"
        >
          mdi-emoticon-cry-outline
        </v-icon>
        <span
          class="font-weight-medium primary--text"
          style="font-size: 180px; line-height: 1;"
        >
          4
        </span>
      </v-col>
      <v-col
        class="d-flex justify-center font-weight-medium text-h5"
        cols="12"
      >
        Desculpe, página não encontrada!
      </v-col>
      <v-col
        class="d-flex justify-center mt-12"
        cols="12"
      >
        <v-btn
          @click="$router.go(-1)"
          color="primary"
          dark
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
  name: 'Pagina404'
}
</script>

<style lang="scss">
  .container-404 {
    background-color: #f3f3f3;
  }
</style>
