<template>
  <v-col
    cols="12"
    md="12"
    lg="10"
    xl="8"
    offset-lg="1"
  >
    <pagina
      :adicionar="exibirFormulario === $exibirFormulario.adicionar"
      :editar="exibirFormulario === $exibirFormulario.editar"
      :exibir="exibirFormulario === $exibirFormulario.exibir"
      :loading="loading"
      :mais-opcoes="exibirFormulario === $exibirFormulario.editar"
      :titulo-formulario="titulo"
      campos-obrigatorios
      excluir
      subtitulo="Manutenção dos perfis de acesso para usuários"
      titulo="Perfil de Acesso"
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
              sm="10"
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
        :registros="registros"
        exibir
        @excel="exportarExcel()"
        @exibir="exibir($event)"
      />

      <formulario
        v-else
        ref="formulario"
      />
    </pagina>
  </v-col>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PaginaSistemaPerfil',
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
          width: '5%'
        },
        {
          align: 'start',
          text: 'Descrição',
          value: 'descricao',
          width: '95%'
        }
      ],
      descricao: null
    }
  },
  computed: {
    ...mapState('sistemaPerfil', [
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

      return `${titulo} Perfil`
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
    ...mapActions('sistemaPerfil', [
      'apagar',
      'exibir',
      'listar'
    ]),
    ...mapMutations('sistemaPerfil', [
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
