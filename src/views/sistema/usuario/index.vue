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
    subtitulo="Cadastro de usuários do sistema"
    titulo="Usuário"
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
            sm="4"
            cols="12"
          >
            <v-text-field
              v-model="login"
              v-uppercase
              autofocus
              filled
              hide-details
              label="Login"
              @click:append="listagem()"
              @keyup.enter="listagem()"
            />
          </v-col>
          <v-col
            lg="2"
            sm="2"
            cols="12"
          >
            <v-autocomplete
              v-model="ativo"
              :items="dropdownAtivo"
              filled
              hide-details
              item-text="descricao"
              item-value="codigo"
              label="Ativo"
              @input="listagem()"
            />
          </v-col>
        </v-row>
      </validation-observer>
    </filtro>

    <template v-slot:mais-opcoes>
      <v-list-item @click="redefinirSenhaUsuario()">
        <v-list-item-icon class="mr-3">
          <v-icon color="primary">
            mdi-key-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Redefinir Senha
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <tabela
      v-if="!exibirFormulario"
      :colunas="colunas"
      :loading="loading"
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
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'PaginaSistemaUsuario',
  components: {
    formulario: () => import('./components/formulario')
  },
  data () {
    return {
      ativo: null,
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
          text: 'Login',
          value: 'login',
          width: '80%'
        },
        {
          align: 'start',
          text: 'Ativo',
          value: 'ativo',
          width: '15%'
        }
      ],
      dropdownAtivo: [
        {
          codigo: 1,
          descricao: 'SIM'
        },
        {
          codigo: 0,
          descricao: 'NÃO'
        }
      ],
      login: null
    }
  },
  computed: {
    ...mapState('sistemaUsuario', [
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

      return `${titulo} Usuário`
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
    ...mapActions('sistemaUsuario', [
      'apagar',
      'dropdown',
      'exibir',
      'listar',
      'redefinirSenha'
    ]),
    ...mapMutations('sistemaUsuario', [
      'setDadosExibir',
      'setExibirFormulario'
    ]),
    async listagem () {
      if (await this.$refs.form.validate()) {
        this.listar({
          ativo: this.ativo !== null ? this.ativo : undefined,
          login: this.login || undefined
        })
      }
    },
    exportarExcel () {
      this.$exportarExcel(this.registros, this.colunas)
    },
    redefinirSenhaUsuario () {
      this.redefinirSenha({
        id: this.dadosExibir.id,
        senha: this.$crypto('123')
      })
    }
  }
}
</script>
