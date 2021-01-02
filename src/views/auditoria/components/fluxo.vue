<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      dense
      flat
    >
      <v-toolbar-title class="font-weight-medium">
        Fluxos
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text
      v-if="fluxos.length"
      class="pa-2 card-text-fluxos"
    >
      <v-row dense>
        <v-col
          v-for="(fluxo, index) in fluxos"
          :key="index"
          cols="12"
        >
          <v-card
            :style="fluxoSelecionado && fluxo.fluxoId !== fluxoSelecionado ? 'opacity: 0.5;' : ''"
            class="card-fluxos"
            color="blue-grey"
            dark
            shaped
            @click="obterDias(fluxo.fluxoId)"
          >
            <v-card-title class="body-2 font-weight-medium pb-2">
              {{ fluxo.fluxo }}
            </v-card-title>
            <v-card-text class="white--text pb-2">
              <v-row>
                <v-col cols="7">
                  Problemas:
                  <b>
                    {{ fluxo.problemas }}
                  </b>
                  <v-spacer />
                  Mais Antigo:
                  <b>
                    {{ fluxo.maisAntigo }}
                  </b>
                </v-col>
                <v-col cols="5">
                  Banco:
                  <b>
                    {{ fluxo.banco }}
                  </b>
                  <v-spacer />
                  Tabela:
                  <b>
                    {{ fluxo.tabela }}
                  </b>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text
      v-else
      class="text-center body-1 font-weight-medium"
    >
      Selecione uma empresa!
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AuditoriaFluxos',
  computed: {
    ...mapState('auditoria', [
      'fluxos',
      'fluxoSelecionado'
    ])
  },
  methods: {
    ...mapActions('auditoria', [
      'obterDias'
    ])
  }
}
</script>

<style lang="scss">
  .card-fluxos {
    &:hover {
      opacity: 0.8;
    }
  }

  .card-text-fluxos {
    max-height: 785px !important;
    overflow-y: auto !important;
  }
</style>
