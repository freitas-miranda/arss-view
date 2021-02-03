<template>
  <v-data-table
    ref="tabela"
    :color="color"
    :headers="colunas"
    :item-key="itemKey"
    :items="registros"
    :items-per-page="rowsPerPage"
    :loading="loading"
    :mobile-breakpoint="0"
    :page="page"
    :server-items-length="itensServidor"
    :single-select="selecionarLinha"
    :show-select="selecionarRegistros"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :value="valor"
    class="tabela elevation-2"
    dense
    hide-default-footer
    @input="$emit('input', $event)"
    @click:row="clickLinha"
  >
    <template v-slot:[`header.data-table-select`]="{ props, on }">
      <v-simple-checkbox
        :color="color"
        :indeterminate="props.indeterminate"
        :ripple="false"
        :value="props.value"
        @input="on.input($event)"
      />
    </template>
    <template
      v-slot:[`header.excel`]
    >
      <v-btn
        v-if="excel"
        color="primary darken-1"
        icon
        small
        @click="$emit('excel')"
      >
        <v-icon>
          mdi-microsoft-excel
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:[`item.data-table-select`]="{ select, isSelected }">
      <v-simple-checkbox
        :color="color"
        :ripple="false"
        :value="isSelected"
        @input="select($event)"
      />
    </template>
    <template
      v-for="coluna in colunas"
      v-slot:[concatenarSlot(coluna.value)]="item"
    >
      <div
        v-if="coluna.value === 'acao'"
        :key="`${coluna.value}-${item.item[itemKey]}`"
      >
        <slot
          :item="item.item"
          :value="item.value"
          name="item.acao"
        >
          <v-btn
            v-if="acessar"
            :color="color"
            :loading="loading"
            class="botao-acao-tabela"
            icon
            title="Acessar Registro"
            @click="$emit('acessar', item.item[itemKey])"
          >
            <v-icon size="20">
              mdi-open-in-app
            </v-icon>
          </v-btn>
          <v-btn
            v-if="exibir"
            :color="color"
            :loading="loading"
            class="botao-acao-tabela"
            icon
            title="Exibir registro"
            @click="$emit('exibir', item.item[itemKey])"
          >
            <v-icon size="20">
              mdi-eye-outline
            </v-icon>
          </v-btn>
          <v-btn
            v-if="escolher"
            :color="color"
            :loading="loading"
            class="botao-acao-tabela"
            icon
            title="Escolher registro"
            @click="$emit('escolher', item.item[itemKey])"
          >
            <v-icon size="20">
              mdi-check
            </v-icon>
          </v-btn>
          <v-btn
            v-if="editar"
            :color="color"
            :loading="loading"
            class="botao-acao-tabela"
            icon
            title="Editar Registro"
            @click="$emit('editar', item.item[itemKey])"
          >
            <v-icon size="20">
              mdi-lead-pencil
            </v-icon>
          </v-btn>
          <v-btn
            v-if="excluir"
            :loading="loading"
            class="botao-acao-tabela"
            color="error"
            icon
            title="Excluir Registro"
            @click="$emit('excluir', item.item[itemKey])"
          >
            <v-icon size="20">
              mdi-delete
            </v-icon>
          </v-btn>
        </slot>
      </div>
      <div
        v-if="coluna.value === 'status'"
        :key="`${coluna.value}-${item.item[itemKey]}`"
      >
        <slot
          :item="item.item"
          :value="item.value"
          name="item.status"
        >
          <div
            :style="`color: ${item.value.cor}`"
            class="font-weight-medium"
          >
            {{ item.value.status }}
          </div>
        </slot>
      </div>
      <div
        v-if="['acao', 'status'].indexOf(coluna.value) === -1"
        :key="`${coluna.value}-${item.item[itemKey]}`"
      >
        <slot
          :item="item.item"
          :name="`item.${coluna.value}`"
          :value="item.value ? item.value.item : undefined"
        >
          {{ item.value }}
        </slot>
      </div>
    </template>
    <template
      v-if="totais.length"
      v-slot:[`body.append`]
    >
      <tr>
        <td
          v-for="(total, index) in totais"
          :key="index"
          :class="`text-${total.align} font-weight-medium`"
          :style="`pointer-events: none; width: ${total.width};`"
        >
          {{ total.value }}
        </td>
      </tr>
    </template>
    <template
      v-if="!removerRodape"
      v-slot:footer
    >
      <v-divider />
      <v-toolbar
        class="body-2"
        dense
        flat
        height="35"
      >
        Registros: <b class="ml-1">{{ totalRegistros }}</b>
        <v-spacer />
        <span v-if="!$vuetify.breakpoint.xs">
          Por página
        </span>
        <v-select
          v-if="!$vuetify.breakpoint.xs"
          v-model="rowsPerPage"
          :color="color"
          :items="[5, 10, 15, 25, 30, 50, 100]"
          class="linhas-pagina ml-3"
          hide-details
        />
        <div
          v-if="!$vuetify.breakpoint.xs"
          class="pa-3"
        />
        <v-btn
          :disabled="loading || desabilitarPaginaAnterior"
          color="grey darken-1"
          icon
          small
          @click="--page"
        >
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        {{ paginaAtual }} &nbsp;-&nbsp; {{ totalPaginas || 1 }}
        <v-btn
          :disabled="loading || desabilitarPaginaPosterior"
          color="grey darken-1"
          icon
          small
          @click="++page"
        >
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.${statusTag}`]="{ value }">
      <v-chip
        v-if="value && value.chip"
        :color="value.color"
        :text-color="'white'"
        class="my-1 font-weight-bold"
        small
      >
        {{ value.text }}
      </v-chip>
    </template>
    <template v-slot:[`item.${statusRequisicaoDesc}`]="{ value }">
      <v-chip
        v-if="value && value.chip"
        :color="value.color"
        :text-color="'white'"
        class="my-1 font-weight-bold"
        small
      >
        {{ value.text }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ComponenteTabela',
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
    excel: {
      default: true,
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
      default: 25,
      type: Number
    },
    removerRodape: {
      default: false,
      type: Boolean
    },
    selecionarLinha: {
      default: false,
      type: Boolean
    },
    selecionarRegistros: {
      default: false,
      type: Boolean
    },
    statusTag: {
      type: String,
      default: 'statusDesc'
    },
    statusRequisicaoDesc: {
      type: String,
      default: 'statusRequisicaoDesc'
    },
    totais: {
      default: () => [],
      type: Array
    },
    valor: {
      default: () => [],
      type: Array
    }
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
  },
  created () {
    this.rowsPerPage = this.removerRodape ? -1 : this.registrosPorPagina
    this.adicionarColunaBotaoExcel()
  },
  destroyed () {
    if (this.navegacao) {
      window.removeEventListener('keydown', this.navegacaoTeclado)
    }
  },
  mounted () {
    if (this.navegacao) {
      window.addEventListener('keydown', this.navegacaoTeclado)
    }
  },
  methods: {
    clickLinha (item, row) {
      if (this.selecionarLinha) row.select(true)

      this.$emit('linha', item)
    },
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

        this.registroSelecionado = this.registros[this.linhaSelecionada.rowIndex - 1]
      } else if (event.keyCode === 38) {
        if (this.linhaSelecionada && this.linhaSelecionada.rowIndex > 1) {
          this.linhaSelecionada.style.backgroundColor = ''
          this.linhaSelecionada = this.linhaSelecionada.previousElementSibling

          this.linhaSelecionada.focus()
          this.linhaSelecionada.style.backgroundColor = 'rgb(205, 205, 205)'

          this.registroSelecionado = this.registros[this.linhaSelecionada.rowIndex - 1]
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
    },
    adicionarColunaBotaoExcel () {
      const temColunaExcel = this.colunas.some(el => el.value === 'excel')
      if (!temColunaExcel) {
        this.colunas.push(this.$criarColuna('', 'excel', 'end', '5%', false))
      }
    }
  }
}
</script>

<style lang="scss">
tr.v-data-table__selected {
  background: rgb(205, 205, 205) !important;
}

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
