<template>
  <pagina
    :adicionar="exibirFormulario === $exibirFormulario.adicionar"
    :editar="exibirFormulario === $exibirFormulario.editar"
    :exibir="exibirFormulario === $exibirFormulario.exibir"
    :exibir-detalhe="exibirFormulario !== $exibirFormulario.adicionar"
    :loading="loading"
    :mais-opcoes="exibirFormulario === $exibirFormulario.editar"
    :titulo-formulario="titulo"
    campos-obrigatorios
    excluir
    subtitulo="Cadastro de Fluxos"
    titulo="Fluxo"
    @confirmar="$refs.formulario.confirmar()"
    @editar="setExibirFormulario($exibirFormulario.editar)"
    @excluir="apagar(dadosExibir.id)"
    @fechar="setExibirFormulario(null)"
  >
    <filtro
      v-if="!exibirFormulario"
      :loading="loading"
      adicionar
      pesquisar
      mais-filtros
      @adicionar="setExibirFormulario($exibirFormulario.adicionar)"
      @pesquisar="listagem()"
    >
      <validation-observer
        ref="form"
        autocomplete="off"
        tag="form"
      >
        <v-row dense>
          <v-col
            lg="2"
            sm="2"
            cols="12"
          >
            <validation-provider
              v-slot="{ errors }"
              name="Código"
              rules="numeric"
              vid="codigo"
            >
              <v-text-field
                v-model="codigo"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                autofocus
                filled
                label="Código"
                @click:append="listagem()"
                @keyup.enter="listagem()"
              />
            </validation-provider>
          </v-col>
          <v-col
            lg="5"
            sm="5"
            cols="12"
          >
            <v-text-field
              v-model="descricao"
              v-uppercase
              filled
              hide-details
              label="Descrição"
              @click:append="listagem()"
              @keyup.enter="listagem()"
            />
          </v-col>
          <v-col
            lg="3"
            sm="3"
            cols="12"
          >
            <v-autocomplete
              v-model="tipoBanco"
              :items="tipoBancoList"
              auto-select-first
              filled
              hide-details
              item-text="descricao"
              item-value="item"
              label="Tipo de Banco"
              @input="listagem()"
            />
          </v-col>
          <v-col
            lg="2"
            sm="2"
            cols="12"
          >
            <v-text-field
              v-model="tabela"
              v-uppercase
              filled
              hide-details
              label="Tabela"
              @click:append="listagem()"
              @keyup.enter="listagem()"
            />
          </v-col>
        </v-row>
      </validation-observer>
      <template v-slot:mais-filtros>
        <v-row dense>
          <v-col
            lg="3"
            sm="3"
            cols="12"
          >
            <v-select
              v-model="armazemSaidaId"
              :items="armazens"
              filled
              multiple
              hide-details
              item-text="descricao"
              item-value="id"
              label="Armazém Saída"
              @input="listagem()"
            />
          </v-col>
          <v-col
            lg="3"
            sm="3"
            cols="12"
          >
            <v-select
              v-model="armazemEntradaId"
              :items="armazens"
              filled
              multiple
              hide-details
              item-text="descricao"
              item-value="id"
              label="Armazém Entrada"
              @input="listagem()"
            />
          </v-col>
        </v-row>
      </template>
    </filtro>
    <tabela
      v-if="!exibirFormulario"
      :colunas="colunas"
      :loading="loading"
      :registros="registros"
      exibir
      @excel="exportarExcel()"
      @exibir="exibir($event)"
    >
      <template v-slot:[`item.desenvolvido`]="{ item }">
        <v-progress-linear
          :value="item.pDev"
          height="17"
          background-opacity="0.5"
          rounded
        >
          <strong class="white--text body-2">
            {{ Math.ceil(item.pDev) }}%
          </strong>
        </v-progress-linear>
      </template>
      <template v-slot:[`item.producao`]="{ item }">
        <v-progress-linear
          :value="item.pProd"
          height="17"
          background-opacity="0.5"
          rounded
        >
          <strong class="white--text body-2">
            {{ Math.ceil(item.pProd) }}%
          </strong>
        </v-progress-linear>
      </template>
      <template v-slot:item.rotinaMigrada="{ item }">
        <v-checkbox
          v-model="item.rotinaMigrada"
          :label="getLabelRotina(item.rotinaMigrada)"
          readonly
          hide-details
        />
      </template>
    </tabela>
    <formulario
      v-else
      ref="formulario"
    />
    <template
      v-if="exibirFormulario !== $exibirFormulario.adicionar"
      v-slot:exibir-detalhe
    >
      <implantacao />
    </template>
  </pagina>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PaginaFluxo',
  components: {
    formulario: () => import('./components/formulario'),
    implantacao: () => import('./components/implantacao')
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
          width: '2%'
        },
        {
          align: 'end',
          text: 'Código',
          value: 'id',
          width: '2%'
        },
        {
          align: 'start',
          text: 'Descrição',
          value: 'descricao',
          width: '15%'
        },
        {
          align: 'start',
          text: 'Armazém de Saída',
          value: 'armazemSaidaDesc',
          width: '10%'
        },
        {
          align: 'start',
          text: 'Armazém de Entrada',
          value: 'armazemEntradaDesc',
          width: '10%'
        },
        {
          align: 'center',
          text: 'Desenvol.',
          value: 'desenvolvido',
          width: '6%'
        },
        {
          align: 'center',
          text: 'Produção',
          value: 'producao',
          width: '6%'
        },
        {
          align: 'start',
          text: 'Lanç. Documento',
          value: 'rotinaMigrada',
          width: '5%'
        },
        {
          align: 'end',
          text: 'Tipo Banco',
          value: 'tipoBancoDesc',
          width: '5%'
        },
        {
          align: 'start',
          text: 'Tabela',
          value: 'tabela',
          width: '5%'
        },
        {
          align: 'start',
          text: 'Última Alteração',
          value: 'ultimaAlteracao',
          width: '34%'
        }
      ],
      descricao: null,
      tipoBanco: null,
      tabela: null,
      armazemSaidaId: null,
      armazemEntradaId: null,
      ultimaAlteracao: null
    }
  },
  computed: {
    ...mapState('fluxo', [
      'dadosExibir',
      'exibirFormulario',
      'loading',
      'tipoBancoList',
      'registros',
      'armazens'
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

      return `${titulo} Fluxo`
    }
  },
  watch: {
    exibirFormulario (valor) {
      if (!valor) {
        setTimeout(() => {
          this.listagem()
        }, 300)
        this.setDadosExibir({})
      }
    }
  },
  created () {
    setTimeout(() => {
      this.listagem()
    }, 300)

    this.getArmazens()
  },
  methods: {
    ...mapActions('fluxo', [
      'apagar',
      'exibir',
      'listar',
      'getArmazens'
    ]),
    ...mapMutations('fluxo', [
      'setDadosExibir',
      'setExibirFormulario'
    ]),
    async listagem () {
      if (await this.$refs.form.validate()) {
        this.listar({
          id: this.codigo || undefined,
          descricao: this.descricao || undefined,
          tipoBanco: this.tipoBanco || undefined,
          armazemSaidaId: this.armazemSaidaId || undefined,
          armazemEntradaId: this.armazemEntradaId || undefined
        })
      }
    },
    getLabelRotina (status) {
      return status ? 'Migrado' : 'Pendente'
    },
    exportarExcel () {
      this.$exportarExcel(this.registros, this.colunas)
    }
  }
}
</script>
