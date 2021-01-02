<template>
  <div class="numeroMonitorado mr-3">
    <div class="mx-auto">
      {{ descricao }}
    </div>
    <div class="title">
      <template v-if="Number(valor) === -1">
        -
      </template>
      <template v-else>
        {{ valor }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilaFluxo',
  props: {
    descricao: {
      default: '',
      type: String
    },
    valor: {
      default: 0,
      type: [String, Number]
    }
  }
}
</script>

<style>
  .numeroMonitorado {
    text-align: center;
    width: 7rem;
    color: #494747;
  }
</style>
