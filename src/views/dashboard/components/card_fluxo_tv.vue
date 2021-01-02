<template>
  <v-card
    :class="'mx-2 my-1 mr-0 pr-3 pl-3'"
    width="290"
    height="160"
    :color="mudarCorCardFluxo()"
    style="cursor: pointer"
    @click="$emit('click')"
  >
    <v-row dense>
      <v-col
        cols="auto"
        style="font-size: 4.375rem"
        class="mr-auto white--text font-weight-black"
      >
        {{ fluxoCodigo }}
      </v-col>
      <v-col
        cols="auto"
        class="pt-5 white--text text-right font-weight-medium caption"
      >
        <div>
          Processados: {{ processados }}
        </div>
        <div>
          Pendentes: {{ pendentes }}
        </div>
        <div>
          Falhas: {{ falhas }}
        </div>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="auto"
        class="pt-0 white--text font-weight-medium caption"
      >
        <div class="limitaCaracteres">
          {{ fluxoDescricao }}
        </div>
        <div>
          {{ dataExecucao }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'CardFluxoTv',
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
    falhas: {
      default: 0,
      type: [String, Number]
    },
    implantacao: {
      default: '',
      type: String
    },
    dataExecucao: {
      default: '',
      type: String
    }
  },
  methods: {
    mudarCorCardFluxo () {
      const fluxoNaoProcessado = !this.processados && !this.pendentes && !this.falhas

      let fluxoEstado = 'processado'

      if (this.falhas > 0) {
        fluxoEstado = 'falha'
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
  }
  .v-card .v-card__text {
    padding: 0px 16px;
  }
  .limitaCaracteres {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
