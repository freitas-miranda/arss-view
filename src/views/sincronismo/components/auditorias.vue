<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      dense
      flat
    >
      <v-toolbar-title class="font-weight-medium">
        Últimas Importações
      </v-toolbar-title>
    </v-toolbar>
    <tabela
      ref="tabela"
      :colunas="colunas"
      :loading="loading"
      :registros="ultimasAuditorias"
      item-key="id"
      selecionar-linha
      @excel="exportarExcel()"
      @input="mostrarError($event)"
    />
    <v-col
      v-if="mensagemErro"
      cols="12"
    >
      <v-textarea
        :value="mensagemErro"
        label="Mensagem de Erro"
        rows="2"
        outlined
        readonly
        error
        auto-grow
      />
    </v-col>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UltimasAuditoriasSincronismo',
  data () {
    return {
      colunas: [
        this.$criarColuna('Status', 'statusDesc', 'start', '5%'),
        this.$criarColuna('Empresa', 'codEmp', 'start', '5%'),
        this.$criarColuna('Dia', 'dia', 'start', '5%'),
        this.$criarColuna('Produtos', 'qtdProdutos', 'start', '5%'),
        this.$criarColuna('Importados', 'qtdImportados', 'start', '5%'),
        this.$criarColuna('Restante', 'qtdRestante', 'start', '5%'),
        this.$criarColuna('Último Produto', 'ultimoProduto', 'start', '5%'),
        this.$criarColuna('Início', 'inicio', 'start', '5%'),
        this.$criarColuna('Fim', 'fim', 'start', '5%'),
        this.$criarColuna('Segundos', 'segundos', 'start', '5%'),
        this.$criarColuna('Consolidado', 'consolidado', 'start', '5%')
      ],
      mensagemErro: ''
    }
  },
  computed: {
    ...mapState('sincronismo', [
      'ultimasAuditorias',
      'loading'
    ])
  },
  created () {
    this.obterUltimasAuditorias()
  },
  methods: {
    ...mapActions('sincronismo', [
      'obterUltimasAuditorias'
    ]),
    exportarExcel () {
      this.$exportarExcel(this.ultimasAuditorias, this.colunas)
    },
    mostrarError (registro) {
      const registroNotIsEmpty = Array.isArray(registro) && registro.length > 0
      if (registroNotIsEmpty) {
        const objRegistro = registro[0]
        // 4 - FALHA
        this.mensagemErro = objRegistro.status === 4 && objRegistro.observacao
      } else {
        this.mensagemErro = ''
      }
    }
  }
}
</script>
