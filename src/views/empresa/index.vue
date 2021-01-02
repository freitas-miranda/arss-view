<template>
  <pagina
    :adicionar="exibirFormulario === $exibirFormulario.adicionar"
    :editar="exibirFormulario === $exibirFormulario.editar"
    :exibir="exibirFormulario === $exibirFormulario.exibir"
    :loading="loading"
    :mais-opcoes="exibirFormulario === $exibirFormulario.editar"
    :titulo-formulario="titulo"
    campos-obrigatorios
    excluir
    subtitulo="Cadastro de Empresa"
    titulo="Empresa"
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
              name="ID"
              rules="numeric"
              vid="ID"
            >
              <v-text-field
                v-model="id"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                autofocus
                filled
                label="ID"
                @click:append="listagem()"
                @keyup.enter="listagem()"
              />
            </validation-provider>
          </v-col>
          <v-col
            lg="2"
            sm="2"
            cols="12"
          >
            <v-text-field
              v-model="grupo"
              v-uppercase
              filled
              hide-details
              label="Grupo"
              @click:append="listagem()"
              @keyup.enter="listagem()"
            />
          </v-col>
          <v-col
            lg="2"
            sm="2"
            cols="12"
          >
            <v-text-field
              v-model="codigo"
              v-uppercase
              filled
              hide-details
              label="Empresa"
              @click:append="listagem()"
              @keyup.enter="listagem()"
            />
          </v-col>
          <v-col
            lg="6"
            sm="6"
            cols="12"
          >
            <v-text-field
              v-model="cnpj"
              v-uppercase
              filled
              hide-details
              label="CNPJ"
              @click:append="listagem()"
              @keyup.enter="listagem()"
            />
          </v-col>
        </v-row>
      </validation-observer>
    </filtro>
    <tabela
      v-if="!exibirFormulario"
      ref="tabela"
      :colunas="colunas"
      :loading="loading"
      :registros="registros"
      exibir
      @exibir="exibir($event)"
      @excel="exportarExcel()"
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
  name: 'PGinaEmpresa',
  components: {
    formulario: () => import('./components/formulario')
  },
  data () {
    return {
      id: null,
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
          text: 'ID',
          value: 'id',
          width: '3%'
        },
        {
          align: 'end',
          text: 'Grupo',
          value: 'grupo',
          width: '3%'
        },
        {
          align: 'start',
          text: 'Empresa',
          value: 'codigo',
          width: '3%'
        },
        {
          align: 'start',
          text: 'CNPJ',
          value: 'cnpj',
          width: '89%'
        }
      ],
      grupo: null,
      codigo: null,
      cnpj: null
    }
  },
  computed: {
    ...mapState('empresa', [
      'dadosExibir',
      'exibirFormulario',
      'loading',
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

      return `${titulo} Empresa`
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
  },
  methods: {
    ...mapActions('empresa', [
      'apagar',
      'exibir',
      'listar'
    ]),
    ...mapMutations('empresa', [
      'setDadosExibir',
      'setExibirFormulario'
    ]),
    async listagem () {
      if (await this.$refs.form.validate()) {
        this.listar({
          id: this.id || undefined,
          grupo: this.grupo || undefined,
          codigo: this.codigo || undefined,
          cnpj: this.cnpj || undefined
        })
      }
    },
    exportarExcel () {
      this.$exportarExcel(this.registros, this.colunas)
    }
  }
}
</script>
