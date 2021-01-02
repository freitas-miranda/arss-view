<template>
  <v-card
    class="mx-auto ma-0 pa-0"
    width="400"
    height="70"
    :color="mudarCorCardFluxo()"
    style="cursor: pointer"
    @click="$emit('click')"
  >
    <v-card-text>
      <v-row
        class="fill-height"
      >
        <div class="corTitulo subtitle-1 font-weight-bold ml-2">
          {{ fluxoCodigo }} - {{ fluxoDescricao }}
        </div>
      </v-row>
      <v-row
        class="linhaMonitoramento fill-height"
        dense
      >
        <fila-fluxo
          :descricao="'Processados'"
          :valor="processados"
        />
        <fila-fluxo
          :descricao="'Pendentes'"
          :valor="pendentes"
        />
        <fila-fluxo
          :descricao="'Falhas'"
          :valor="falhas"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CardFluxo',
  components: {
    filaFluxo: () => import('./fila_fluxo')
  },
  props: {
    fluxoCodigo: {
      default: 0,
      type: Number
    },
    fluxoDescricao: {
      default: '',
      type: String
    },
    processados: {
      default: 0,
      type: [String, Number]
    },
    pendentes: {
      default: 0,
      type: [String, Number]
    },
    implantacao: {
      default: '',
      type: String
    },
    falhas: {
      default: 0,
      type: [String, Number]
    }
  },
  methods: {
    mudarCorCardFluxo (fluxo) {
      const fluxoNaoProcessado = !this.processados && !this.pendentes && !this.falhas
      let fluxoEstado = 'processado'

      if (this.falhas > 0) {
        fluxoEstado = 'falha'
      } else if (this.pendentes > 0) {
        fluxoEstado = 'pendente'
      } else if (!this.implantacao) {
        fluxoEstado = 'semImplantacao'
      } else if (fluxoNaoProcessado) {
        fluxoEstado = 'naoProcessado'
      }

      return this.corIdentificaoFluxo(fluxoEstado)
    },
    corIdentificaoFluxo (fluxoEstado) {
      const cor = {
        falha: '#F44336',
        pendente: '#F79400',
        processado: '#009C4D',
        naoProcessado: '#6AB2C7',
        semImplantacao: '#949494'
      }

      return cor[fluxoEstado]
    }
  }
}
</script>

<style>
  .linhaMonitoramento {
    background-color: #E0E0E0;
    border-radius: 10px;
  }
  .v-card .v-card__text {
    padding: 0px 16px;
  }
  .corTitulo {
    color: #e0e0e0
  }
</style>
