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
    subtitulo="Cadastro Tipos de Implantação"
    titulo="Implantação"
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
            sm="3"
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
            lg="3"
            sm="4"
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
        </v-row>
      </validation-observer>
    </filtro>
    <tabela
      v-if="!exibirFormulario"
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
  name: 'PGinaImplantaO',
  components: {
    formulario: () => import('./components/formulario')
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
          width: '96%'
        }
      ],
      descricao: null
    }
  },
  computed: {
    ...mapState('implantacao', [
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

      return `${titulo} Implantação`
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
    ...mapActions('implantacao', [
      'apagar',
      'exibir',
      'listar'
    ]),
    ...mapMutations('implantacao', [
      'setDadosExibir',
      'setExibirFormulario'
    ]),
    async listagem () {
      if (await this.$refs.form.validate()) {
        this.listar({
          id: this.codigo || undefined,
          descricao: this.descricao || undefined
        })
      }
    },
    exportarExcel () {
      this.$exportarExcel(this.registros, this.colunas)
    }
  }
}
</script>
