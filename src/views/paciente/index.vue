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
      subtitulo="Manutenção dos pacientes"
      titulo="Pacientes"
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
              sm="3"
              cols="12"
            >
              <validation-provider
                v-slot="{ errors }"
                name="CPF"
                rules="numeric"
                vid="cpf"
              >
                <v-text-field
                  v-model="cpf"
                  :error-messages="errors"
                  :hide-details="erroValidacao(errors)"
                  autofocus
                  filled
                  label="CPF"
                  @click:append="listagem()"
                  @keyup.enter="listagem()"
                />
              </validation-provider>
            </v-col>
            <v-col
              sm="9"
              cols="12"
            >
              <v-text-field
                v-model="nome"
                v-uppercase
                filled
                hide-details
                label="Nome"
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
  name: 'PaginaPaciente',
  components: {
    formulario: () => import('./components/formulario')
  },
  data () {
    return {
      colunas: [
        {
          align: 'center',
          sortable: false,
          text: 'Ação',
          value: 'acao',
          width: 50
        },
        {
          align: 'start',
          text: 'CPF',
          value: 'cpf',
          width: 150
        },
        {
          align: 'start',
          text: 'Nome',
          value: 'nome',
          width: 300
        },
        {
          align: 'start',
          text: 'Telefone',
          value: 'telefoneNumero',
          width: 150
        },
        {
          sortable: false
        }
      ],
      cpf: null,
      nome: null
    }
  },
  computed: {
    ...mapState('paciente', [
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

      return `${titulo} Paciente`
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
      this.dropdown()
    }, 300)
  },
  methods: {
    ...mapActions('paciente', [
      'apagar',
      'dropdown',
      'exibir',
      'listar'
    ]),
    ...mapMutations('paciente', [
      'setDadosExibir',
      'setExibirFormulario'
    ]),
    async listagem () {
      if (await this.$refs.form.validate()) {
        this.listar({
          codigo: this.codigo || undefined,
          cpf: this.cpf || undefined,
          nome: this.nome || undefined
        })
      }
    },
    exportarExcel () {
      this.$exportarExcel(this.registros, this.colunas)
    }
  }
}
</script>
