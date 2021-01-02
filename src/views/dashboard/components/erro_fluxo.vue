<template>
  <pagina
    class="pt-2"
    subtitulo="Dados das lojas"
    titulo="Carregamento de Dados"
  >
    <filtro
      :loading="loading"
      fechar
      pesquisar
      @fechar="setExibirFormulario('dashboard')"
      @pesquisar="pesquisar()"
    >
      <v-row dense>
        <v-col
          lg="2"
          sm="2"
          cols="12"
        >
          <v-text-field
            v-model="filtro.empresa"
            v-uppercase
            filled
            hide-details
            label="Empresa"
            @keydown.enter="pesquisar()"
          />
        </v-col>
      </v-row>
    </filtro>

    <loading v-model="loading" />
    <v-card>
      <v-toolbar
        color="primary"
        dark
        dense
        flat
      >
        <v-toolbar-title class="font-weight-medium">
          CARREGAMENTO DE DADOS DAS LOJAS
        </v-toolbar-title>
      </v-toolbar>
      <tabela
        ref="tabela"
        :colunas="colunas"
        :loading="loading"
        :registros="pesquisarErros"
        @excel="exportarExcel()"
      />
    </v-card>
  </pagina>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'ListaFluxo',
  data () {
    return {
      colunas: [
        this.$criarColuna('Status', 'statusDesc', 'start', '5%'),
        this.$criarColuna('Empresa', 'empresa', 'start', '5%'),
        this.$criarColuna('Execução', 'dataExecucao', 'start', '5%'),
        this.$criarColuna('Observação', 'erro', 'start', '5%'),
        this.$criarColuna()
      ],
      filtro: {
        empresa: null
      }
    }
  },
  computed: {
    ...mapState('dashboard', [
      'fluxos',
      'auditorias',
      'loading',
      'exibirFormulario',
      'pesquisarErros'
    ])
  },
  created () {
    this.pesquisar()
  },
  destroyed () {
    this.setPesquisarErros([])
  },
  methods: {
    ...mapActions('dashboard', [
      'obterFluxos',
      'obterAuditorias'
    ]),
    ...mapMutations('dashboard', [
      'setExibirFormulario',
      'setPesquisarErros'
    ]),
    exportarExcel () {
      const arrayFilaFluxo = this.deepCloneArray(this.pesquisarErros)

      const arrayColuna = this.deepCloneArray(this.colunas)

      this.$exportarExcel(arrayFilaFluxo, arrayColuna)
    },
    pesquisar () {
      let arrayFilaFluxo = this.deepCloneArray(this.auditorias)

      arrayFilaFluxo = this.removeRegistroDuplicadoArrayPorCampo(arrayFilaFluxo, 'empresa')

      if (this.filtro.empresa) {
        arrayFilaFluxo = arrayFilaFluxo.filter((el) => el.empresa === this.filtro.empresa)
      }

      this.setPesquisarErros(arrayFilaFluxo)
    },
    deepCloneArray (array) {
      return JSON.parse(JSON.stringify(array))
    },
    removeRegistroDuplicadoArrayPorCampo (array, prop) {
      array = array.filter((element, index, self) =>
        index === self.findIndex((el) => (
          el.empresa === element[prop]
        ))
      )
      return array
    }
  }
}
</script>
