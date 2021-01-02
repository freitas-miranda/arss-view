<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      dense
      flat
    >
      <v-toolbar-title class="font-weight-medium">
        Empresas
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text
      v-if="empresas.length"
      class="pa-2"
      style="max-width: 100%; overflow: auto;"
    >
      <v-row
        dense
        class="flex-nowrap"
      >
        <v-col
          v-for="(empresa, index) in empresas"
          :key="index"
          cols="auto"
        >
          <v-card
            :style="empresaSelecionada && empresaSelecionada !== empresa.empresaFila ? 'opacity: 0.5;' : ''"
            class="card-empresas"
            color="error"
            dark
            shaped
            @click="fluxos(empresa)"
          >
            <v-card-title class="py-2 font-weight-bold">
              {{ empresa.empresa }}
            </v-card-title>
            <v-card-text class="white--text">
              Problemas:
              <b>
                {{ empresa.problemas }}
              </b>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text
      v-else
      class="text-center body-1 font-weight-medium"
    >
      Não há empresas com problemas
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axiosMD045 from '@/plugins/axios_md045'

export default {
  name: 'AuditoriaEmpresas',
  data () {
    return {
      aviso: false
    }
  },
  computed: {
    ...mapState('auditoria', [
      'empresas',
      'empresaSelecionada'
    ])
  },
  created () {
    this.obterEmpresas()
  },
  destroyed () {
    axiosMD045.defaults.baseURL = `${process.env.VUE_APP_HOST_MD045}/api/`
  },
  methods: {
    ...mapActions('auditoria', [
      'obterEmpresas',
      'obterEndpointMd045',
      'obterFluxos'
    ]),
    fluxos (empresa) {
      if (empresa.problemas > 0) {
        this.obterEndpointMd045(empresa.empresa)
        this.obterFluxos(empresa.empresaFila)
      } else this.aviso = true
    }
  }
}
</script>

<style lang="scss">
  .card-empresas {
    &:hover {
      opacity: 0.8;
    }
  }

  .error-card-empresas {
    padding-top: 10px;
    line-height: 0.99rem;
  }

  .success-card-empresas {
    padding-top: 25px;
  }

  .info-card-empresas {
    padding: 10px;
  }
</style>
