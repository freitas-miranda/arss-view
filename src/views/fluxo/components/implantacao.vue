<template>
  <v-card flat>
    <h2> Implantação do fluxo de estoque </h2>
    <br>
    <tabela
      :colunas="colunas"
      :loading="loading"
      :registros="implantacao"
      :registros-por-pagina="100"
      remover-rodape
      @excel="exportarExcel()"
    >
      <template v-slot:[`item.desenvolvido`]="{ item }">
        <v-switch
          v-model="item.desenvolvido"
          :loading="loading"
          class="pt-0 mt-0 ml-3"
          color="secondary"
          hide-details
          readonly
          @click.stop="alterarImplantacao({
            id: item.id,
            desenvolvido: !item.desenvolvido,
            producao: item.producao
          })"
        />
      </template>
      <template v-slot:[`item.producao`]="{ item }">
        <v-switch
          v-model="item.producao"
          :loading="loading"
          class="pt-0 mt-0 ml-3"
          color="secondary"
          hide-details
          readonly
          @click.stop="alterarImplantacao({
            id: item.id,
            desenvolvido: item.desenvolvido,
            producao: !item.producao
          })"
        />
      </template>
    </tabela>
  </v-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ComponenteImplantacao',
  data () {
    return {
      colunas: [
        {
          align: 'end',
          text: 'Código',
          value: 'codigo',
          width: '1%'
        },
        {
          align: 'start',
          text: 'Descrição',
          value: 'descricao',
          width: '15%'
        },
        {
          align: 'center',
          text: 'Desenvolvido',
          value: 'desenvolvido',
          width: '5%'
        },
        {
          align: 'start',
          text: 'Em Produção',
          value: 'producao',
          width: '5%'
        },
        {
          align: 'start',
          text: 'Última Alteração',
          value: 'ultimaAlteracao',
          width: '79%'
        }
      ],
      desenvolvido: false,
      producao: false,
      ultimaAlteracao: null
    }
  },
  computed: {
    ...mapState('fluxo', [
      'implantacao',
      'loading'
    ])
  },
  methods: {
    ...mapActions('fluxo', [
      'editarImplantacao'
    ]),
    alterarImplantacao (item) {
      if (!this.loading) {
        this.editarImplantacao(item)
      }
    },
    exportarExcel () {
      this.$exportarExcel(this.implantacao, this.colunas)
    }
  }
}
</script>
