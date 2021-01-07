<template>
  <pagina
    :adicionar="exibirFormulario === $exibirFormulario.adicionar"
    :editar="exibirFormulario === $exibirFormulario.editar"
    :exibir="exibirFormulario === $exibirFormulario.exibir"
    :loading="loading"
    :mais-opcoes="exibirFormulario === $exibirFormulario.editar"
    :titulo-formulario="titulo"
    @confirmar="$refs.formulario.confirmar()"
    @editar="setExibirFormulario($exibirFormulario.editar)"
    @excluir="apagar(dadosExibir.id)"
    @fechar="setExibirFormulario(null)"
    campos-obrigatorios
    excluir
    subtitulo="Página de exemplo"
    titulo="Exemplo"
  >
    <filtro
      v-if="!exibirFormulario"
      :loading="loading"
      @adicionar="setExibirFormulario($exibirFormulario.adicionar)"
      @pesquisar="listagem()"
      adicionar
      pesquisar
    >
      <v-row dense>
        <v-col
          lg="2"
          sm="3"
          cols="12"
        >
          <v-text-field
            v-model="codigo"
            @click:append="listagem()"
            @keyup.enter="listagem()"
            append-icon="mdi-magnify"
            autofocus
            filled
            hide-details
            label="Código"
          />
        </v-col>
        <v-col
          lg="3"
          sm="4"
          cols="12"
        >
          <v-text-field
            v-model="descricao"
            v-uppercase
            @click:append="listagem()"
            @keyup.enter="listagem()"
            filled
            hide-details
            label="Descrição"
          />
        </v-col>
        <v-col
          lg="2"
          sm="3"
          cols="12"
        >
          <v-autocomplete
            v-model="status"
            :items="opcao2"
            @input="listagem()"
            auto-select-first
            clearable
            filled
            hide-details
            item-text="descricao"
            item-value="item"
            label="Status"
          />
        </v-col>
      </v-row>
    </filtro>
    <tabela
      v-if="!exibirFormulario"
      :colunas="colunas"
      :loading="loading"
      :registros="registros"
      @exibir="exibir($event)"
      exibir
    />
    <formulario
      v-else
      ref="formulario"
    />
  </pagina>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PáginaExemplo',
  components: {
    formulario: () => import('./components/formulario')
  },
  computed: {
    ...mapState('exemplo', [
      'dadosExibir',
      'exibirFormulario',
      'loading',
      'opcao2',
      'registros'
    ]),
    titulo () {
      let titulo

      switch (this.exibirFormulario) {
        case this.$exibirFormulario.adicionar:
          titulo = 'Adicionar'
          break
        case this.$exibirFormulario.editar:
          titulo = 'Editar'
          break
        case this.$exibirFormulario.exibir:
          titulo = 'Exibir'
          break
      }

      return `${titulo} Exemplo`
    }
  },
  created () {
    this.listagem()
  },
  data () {
    return {
      codigo: null,
      colunas: [
        {
          align: 'center',
          sortable: false,
          text: 'Ação',
          value: 'acao',
          width: '3%'
        },
        {
          align: 'end',
          text: 'Código',
          value: 'id',
          width: '5%'
        },
        {
          align: 'start',
          text: 'Descrição',
          value: 'descricao',
          width: '20%'
        },
        {
          align: 'start',
          text: 'Status',
          value: 'status',
          width: '70%'
        }
      ],
      descricao: null,
      status: null
    }
  },
  methods: {
    ...mapActions('exemplo', [
      'apagar',
      'exibir',
      'listar'
    ]),
    ...mapMutations('exemplo', [
      'setDadosExibir',
      'setExibirFormulario'
    ]),
    listagem () {
      this.listar({
        id: this.codigo || undefined,
        descricao: this.descricao || undefined,
        status: this.status !== null ? this.status : undefined
      })
    }
  },
  watch: {
    exibirFormulario (valor) {
      if (!valor) {
        this.listagem()
        this.setDadosExibir({})
      }
    }
  }
}
</script>
