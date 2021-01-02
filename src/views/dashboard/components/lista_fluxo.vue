<template>
  <pagina
    class="pt-2"
    subtitulo="Auditoria de Fluxo"
    titulo="Fluxo das Lojas"
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
          {{ fluxoCard.id }} - {{ fluxoCard.descricao }}
        </v-toolbar-title>
      </v-toolbar>
      <tabela
        ref="tabela"
        :colunas="colunas"
        :loading="loading"
        :registros="pesquisarFluxo"
        @excel="exportarExcel()"
      />
      <totais
        :items="getTotais()"
      />
    </v-card>
  </pagina>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'ListaFluxo',
  props: {
    fluxoCard: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      colunas: [
        this.$criarColuna('Requisição', 'statusRequisicaoDesc', 'start', '5%'),
        this.$criarColuna('Status', 'statusDesc', 'start', '5%'),
        this.$criarColuna('Empresa', 'empresa', 'start', '5%'),
        this.$criarColuna('Processados', 'lancadosHoje', 'end', '5%'),
        this.$criarColuna('Pendentes', 'pendentes', 'end', '5%'),
        this.$criarColuna('Falhas', 'falhas', 'end', '5%'),
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
      'pesquisarFluxo'
    ])
  },
  created () {
    this.pesquisar()
  },
  destroyed () {
    this.setPesquisarFluxo([])
  },
  methods: {
    ...mapActions('dashboard', [
      'obterFluxos',
      'obterAuditorias'
    ]),
    ...mapMutations('dashboard', [
      'setExibirFormulario',
      'setPesquisarFluxo'
    ]),
    exportarExcel () {
      let arrayFilaFluxo = this.deepCloneArray(this.auditorias)
      arrayFilaFluxo = arrayFilaFluxo.filter((el) => el.fluxoId === this.fluxoCard.id)

      const arrayColuna = this.deepCloneArray(this.colunas)

      this.$exportarExcel(arrayFilaFluxo, arrayColuna)
    },
    pesquisar () {
      let arrayFilaFluxo = this.deepCloneArray(this.auditorias)
      arrayFilaFluxo = arrayFilaFluxo.filter((el) => el.fluxoId === this.fluxoCard.id || el.erro)
      if (this.filtro.empresa) {
        arrayFilaFluxo = arrayFilaFluxo.filter((el) => el.empresa === this.filtro.empresa)
      }

      for (const fila of arrayFilaFluxo) {
        fila.lancadosHoje = this.$formatarNumero(fila.lancadosHoje)
        fila.pendentes = this.$formatarNumero(fila.pendentes)
        fila.falhas = this.$formatarNumero(fila.falhas)
      }

      this.setPesquisarFluxo(arrayFilaFluxo)
    },
    getTotais () {
      const totais = [
        {
          text: 'Processados',
          value: this.$formatarNumero(this.fluxoCard.processados, 0)
        },
        {
          text: 'Pendentes',
          value: this.$formatarNumero(this.fluxoCard.pendentes, 0)
        },
        {
          text: 'Falhas',
          value: this.$formatarNumero(this.fluxoCard.falhas, 0)
        }
      ]

      return totais
    },
    deepCloneArray (array) {
      return JSON.parse(JSON.stringify(array))
    }
  }
}
</script>
