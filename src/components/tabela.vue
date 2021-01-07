<template>
  <v-data-table
    :color="color"
    :headers="colunas"
    :item-key="itemKey"
    :items="registros"
    :items-per-page="rowsPerPage"
    :loading="loading"
    :mobile-breakpoint="0"
    :page="page"
    :server-items-length="itensServidor"
    :show-select="selecionarRegistros"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :value="value"
    @input="$emit('input', $event)"
    class="tabela elevation-2"
    dense
    hide-default-footer
    ref="tabela"
  >
    <template v-slot:header.data-table-select="{ props, on }">
      <v-simple-checkbox
        :color="color"
        :indeterminate="props.indeterminate"
        :value="props.value"
        @input="on.input($event)"
      />
    </template>
    <template v-slot:item.data-table-select="{ select, isSelected }">
      <v-simple-checkbox
        :color="color"
        :value="isSelected"
        @input="select($event)"
      />
    </template>
    <template
      v-for="coluna in colunas"
      v-slot:[concatenarSlot(coluna.value)]="{ item, value }"
    >
      <div
        v-if="coluna.value === 'acao'"
        :key="`${coluna.value}-${item[itemKey]}`"
      >
        <slot
          :item="item"
          :value="value"
          name="item.acao"
        >
          <v-btn
            v-if="acessar"
            :color="color"
            :loading="loading"
            @click="$emit('acessar', item[itemKey])"
            class="botao-acao-tabela"
            icon
            title="Acessar Registro"
          >
            <v-icon size="20">
              mdi-open-in-app
            </v-icon>
          </v-btn>
          <v-btn
            v-if="exibir"
            :color="color"
            :loading="loading"
            @click="$emit('exibir', item[itemKey])"
            class="botao-acao-tabela"
            icon
            title="Exibir registro"
          >
            <v-icon size="20">
              mdi-eye-outline
            </v-icon>
          </v-btn>
          <v-btn
            v-if="escolher"
            :color="color"
            :loading="loading"
            @click="$emit('escolher', item[itemKey])"
            class="botao-acao-tabela"
            icon
            title="Escolher registro"
          >
            <v-icon size="20">
              mdi-check-bold
            </v-icon>
          </v-btn>
          <v-btn
            v-if="editar"
            :color="color"
            :loading="loading"
            @click="$emit('editar', item[itemKey])"
            class="botao-acao-tabela"
            icon
            title="Editar Registro"
          >
            <v-icon size="20">
              mdi-lead-pencil
            </v-icon>
          </v-btn>
          <v-btn
            v-if="excluir"
            :loading="loading"
            @click="$emit('excluir', item[itemKey])"
            class="botao-acao-tabela"
            color="error"
            icon
            title="Excluir Registro"
          >
            <v-icon size="20">
              mdi-delete
            </v-icon>
          </v-btn>
        </slot>
      </div>
      <div
        v-if="coluna.value === 'status'"
        :key="`${coluna.value}-${item[itemKey]}`"
      >
        <slot
          :item="item"
          :value="value"
          name="item.status"
        >
          <div
            v-html="value.status"
            :style="`color: ${value.cor}`"
            class="font-weight-medium"
          />
        </slot>
      </div>
      <div
        v-if="['acao', 'status'].indexOf(coluna.value) === -1"
        :key="`${coluna.value}-${item[itemKey]}`"
      >
        <slot
          :item="item"
          :name="`item.${coluna.value}`"
          :value="value"
        >
          {{ value }}
        </slot>
      </div>
    </template>
    <template v-if="!removerRodape" v-slot:footer>
      <v-divider />
      <v-toolbar class="body-2" dense flat height="35">
        Registros: <b class="ml-1">{{ totalRegistros }}</b>
        <v-spacer />
        <span v-if="!$vuetify.breakpoint.xs">
          Por página
        </span>
        <v-select
          v-if="!$vuetify.breakpoint.xs"
          v-model="rowsPerPage"
          :color="color"
          :items="[5, 10, 15, 30, 50, 100]"
          class="linhas-pagina ml-3"
          hide-details
        />
        <div v-if="!$vuetify.breakpoint.xs" class="pa-3" />
        <v-btn
          @click="--page"
          :disabled="loading || desabilitarPaginaAnterior"
          color="grey darken-1"
          icon
          small
        >
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        {{ paginaAtual }} &nbsp;-&nbsp; {{ totalPaginas || 1 }}
        <v-btn
          :disabled="loading || desabilitarPaginaPosterior"
          @click="++page"
          color="grey darken-1"
          icon
          small
        >
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ComponenteTabela',
  computed: {
    desabilitarPaginaAnterior () {
      return Object.keys(this.paginacao).length
        ? this.paginacao.pagina === 1 || this.paginacao.pagina === undefined
        : this.page === 1
    },
    desabilitarPaginaPosterior () {
      return Object.keys(this.paginacao).length
        ? this.paginacao.pagina === this.paginacao.totalPaginas ||
            this.paginacao.totalPaginas === 0
        : this.page === Math.ceil(this.registros.length / this.rowsPerPage) ||
            Math.ceil(this.registros.length / this.rowsPerPage) === 0
    },
    itensServidor () {
      return Object.keys(this.paginacao).length
        ? this.paginacao.totalRegistros
        : -1
    },
    paginaAtual () {
      return Object.keys(this.paginacao).length
        ? this.paginacao.pagina
        : this.page
    },
    totalPaginas () {
      return Object.keys(this.paginacao).length
        ? this.paginacao.totalPaginas
        : Math.ceil(this.registros.length / this.rowsPerPage)
    },
    totalRegistros () {
      return Object.keys(this.paginacao).length
        ? this.paginacao.totalRegistros
        : this.registros.length
    }
  },
  created () {
    this.rowsPerPage = this.registrosPorPagina
  },
  data () {
    return {
      linhaSelecionada: null,
      page: 1,
      registroSelecionado: null,
      rowsPerPage: null,
      sortBy: [],
      sortDesc: []
    }
  },
  destroyed () {
    if (this.navegacao) {
      window.removeEventListener('keydown', this.navegacaoTeclado)
    }
  },
  methods: {
    concatenarSlot (coluna) {
      return `item.${coluna}`
    },
    keyLinha (linha) {
      const key = this.itemKey.split(', ')

      if (key.length === 1) return linha[key[0]]
      else {
        const keys = {}

        key.forEach(item => {
          keys[item] = linha[item]
        })

        return keys
      }
    },
    navegacaoTeclado (event) {
      if (event.keyCode === 40) {
        if (!this.linhaSelecionada) {
          this.linhaSelecionada = this.$refs.tabela._vnode.child._vnode.child._vnode.children[0].children[0].children[2].children[0].elm
        } else {
          if (this.linhaSelecionada.rowIndex < this.registros.length) {
            this.linhaSelecionada.style.backgroundColor = ''
            this.linhaSelecionada = this.linhaSelecionada.nextElementSibling
          }
        }

        this.linhaSelecionada.focus()
        this.linhaSelecionada.style.backgroundColor = 'rgb(205, 205, 205)'

        this.registroSelecionado = this.registros[
          this.linhaSelecionada.rowIndex - 1
        ]
      } else if (event.keyCode === 38) {
        if (this.linhaSelecionada && this.linhaSelecionada.rowIndex > 1) {
          this.linhaSelecionada.style.backgroundColor = ''
          this.linhaSelecionada = this.linhaSelecionada.previousElementSibling

          this.linhaSelecionada.focus()
          this.linhaSelecionada.style.backgroundColor = 'rgb(205, 205, 205)'

          this.registroSelecionado = this.registros[
            this.linhaSelecionada.rowIndex - 1
          ]
        }
      } else if (event.keyCode === 13) {
        if (this.registroSelecionado) {
          this.$emit('navegacao', this.keyLinha(this.registroSelecionado))
        }
      } else {
        if (this.linhaSelecionada) {
          this.linhaSelecionada.style.backgroundColor = ''
          this.linhaSelecionada = null
          this.registroSelecionado = null

          this.$emit('navegacao', null)
        }
      }
    },
    requisicao ({ page, linhas, sort }) {
      if (linhas || sort) page = 1

      this.$emit('paginacao', {
        ordenacao: this.sortBy[0],
        ordenacao_tipo:
          this.sortDesc[0] === true
            ? 'desc'
            : this.sortDesc[0] === false
              ? 'asc'
              : undefined,
        pagina: page,
        registros: this.rowsPerPage
      })
    }
  },
  mounted () {
    if (this.navegacao) {
      window.addEventListener('keydown', this.navegacaoTeclado)
    }
  },
  props: {
    acessar: {
      default: false,
      type: Boolean
    },
    color: {
      default: 'primary',
      type: String
    },
    colunas: {
      required: true,
      type: Array
    },
    editar: {
      default: false,
      type: Boolean
    },
    escolher: {
      default: false,
      type: Boolean
    },
    excluir: {
      default: false,
      type: Boolean
    },
    exibir: {
      default: false,
      type: Boolean
    },
    itemKey: {
      default: 'id',
      type: String
    },
    loading: {
      default: false,
      type: Boolean
    },
    navegacao: {
      default: false,
      type: Boolean
    },
    paginacao: {
      default: () => {
        return {}
      },
      type: Object
    },
    registros: {
      default: () => {
        return []
      },
      type: Array
    },
    registrosPorPagina: {
      default: 15,
      type: Number
    },
    removerRodape: {
      default: false,
      type: Boolean
    },
    selecionarRegistros: {
      default: false,
      type: Boolean
    },
    value: {
      type: Array
    }
  },
  watch: {
    page (valor) {
      if (Object.keys(this.paginacao).length) {
        const paginar =
          valor > this.paginacao.totalPaginas
            ? this.paginacao.totalPaginas
            : valor

        this.requisicao({ page: paginar })
      }
    },
    rowsPerPage (valor) {
      if (Object.keys(this.paginacao).length) {
        this.requisicao({ linhas: valor })
      }
    },
    sortDesc (valor) {
      if (Object.keys(this.paginacao).length) this.requisicao({ sort: valor })
    }
  }
}
</script>

<style lang="scss">
.botao-acao-tabela {
  height: 29px !important;
  width: 29px !important;
}

.linhas-pagina {
  font-size: 14px !important;
  margin-bottom: 10px !important;
  max-width: 56px !important;

  .v-input__control {
    .v-input__slot {
      .v-select__slot {
        .v-select__selections {
          .v-select__selection {
            margin-bottom: 0px !important;
            min-width: 1;
          }
        }
      }
    }
  }
}

.tabela {
  border-collapse: collapse;
  white-space: nowrap;

  thead {
    th {
      background-color: #eeeeee;
    }
  }

  tbody {
    tr {
      &:nth-child(even) {
        background-color: #f5f5f5;
      }

      &:not(:last-child) {
        td {
          &:not(.v-data-table__mobile-row) {
            border-bottom: none !important;
          }
        }
      }
    }
  }
}
</style>
