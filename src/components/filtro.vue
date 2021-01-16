<template>
  <v-card class="mb-4">
    <v-toolbar
      color="primary"
      dark
      dense
      flat
      height="35"
    >
      <v-btn
        v-if="fechar"
        icon
        title="Retornar"
        small
        @click="$emit('fechar')"
      >
        <v-icon
          dark
        >
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-toolbar-title class="pl-0 subtitle-1 font-weight-medium">
        Filtro de pesquisa
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-expansion-panels
      class="expansion-panels-filtro"
      flat
    >
      <v-expansion-panel
        ref="expand"
        readonly
      >
        <v-expansion-panel-header
          :hide-actions="!maisFiltros"
          class="pa-1 pl-2 pr-2"
          disable-icon-rotate
        >
          <slot />
          <template
            v-if="maisFiltros"
            v-slot:actions
          >
            <v-btn
              class="ml-2 botao-mais-filtros"
              color="primary"
              outlined
              title="Mais Filtros"
              @click="expandir()"
            >
              <v-icon color="primary">
                mdi-filter-plus
              </v-icon>
            </v-btn>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          class="pa-0"
          eager
        >
          <slot name="mais-filtros" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <divisao />
    <v-card-actions>
      <v-btn
        v-if="pesquisar"
        :loading="loading"
        color="primary"
        small
        @click="$emit('pesquisar')"
      >
        <v-icon left>
          mdi-magnify
        </v-icon>
        Pesquisar
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="adicionar"
        color="primary"
        small
        @click="$emit('adicionar')"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Adicionar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ComponenteFiltro',
  props: {
    adicionar: {
      default: false,
      type: Boolean
    },
    fechar: {
      default: false,
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    maisFiltros: {
      default: false,
      type: Boolean
    },
    pesquisar: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    expandir () {
      this.$refs.expand.isActive = !this.$refs.expand.isActive
    }
  }
}
</script>

<style lang="scss">
  .botao-mais-filtros {
    height: 55px !important;
  }

  .expansion-panels-filtro {
    border-radius: 0px !important;

    .v-expansion-panel {
      .v-expansion-panel-content {
        border-top: 2px rgba(0, 0, 0, 0.12) solid;

        .v-expansion-panel-content__wrap {
          padding: 4px 8px 4px 8px !important;
        }
      }
    }
  }
</style>
