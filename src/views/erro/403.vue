<template>
  <v-container
    class="container-403"
    fluid
    fill-height
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
          mdi-lock-reset
        </v-icon>
        <span
          class="font-weight-medium primary--text"
          style="font-size: 180px; line-height: 1;"
        >
          3
        </span>
      </v-col>
      <v-col
        class="d-flex justify-center font-weight-medium text-h5"
        cols="12"
      >
        Sem permissão para visualizar esta página.
      </v-col>
      <v-col
        class="d-flex justify-center mt-12"
        cols="12"
      >
        <v-btn
          color="primary"
          dark
          @click="$router.push('/')"
        >
          <v-icon left>
            mdi-reply
          </v-icon>
          Retornar página inicial
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Pagina403'
}
</script>

<style lang="scss">
  .container-403 {
    background-color: #e9e9e9;
  }
</style>
