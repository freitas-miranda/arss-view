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
      subtitulo="Manutenção dos usuários do sistema"
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
              sm="3"
              cols="12"
            >
              <v-text-field
                v-model="nome"
                v-uppercase
                autofocus
                filled
                hide-details
                label="Nome"
                @click:append="listagem()"
                @keyup.enter="listagem()"
              />
            </v-col>
            <v-col
              sm="3"
              cols="12"
            >
              <v-text-field
                v-model="email"
                v-lowercase
                autofocus
                filled
                hide-details
                label="E-mail"
                @click:append="listagem()"
                @keyup.enter="listagem()"
              />
            </v-col>
            <v-col
              sm="2"
              cols="12"
            >
              <v-text-field
                v-model="perfil"
                v-uppercase
                autofocus
                filled
                hide-details
                label="Perfil"
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
  name: 'PaginaSistemaUsuario',
  components: {
    formulario: () => import('./components/formulario')
  },
  data () {
    return {
      ativo: null,
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
          text: 'Nome',
          value: 'nome',
          width: '30%'
        },
        {
          align: 'start',
          text: 'E-mail',
          value: 'email',
          width: '30%'
        },
        {
          align: 'start',
          text: 'Perfil de Acesso',
          value: 'perfil',
          width: '15%'
        },
        {
          align: 'end',
          text: 'Ativo',
          value: 'ativo',
          width: '10%'
        }
      ],
      email: null,
      nome: null,
      perfil: null,
      dropdownAtivo: [
        {
          codigo: 1,
          descricao: 'SIM'
        },
        {
          codigo: 0,
          descricao: 'NÃO'
        }
      ]
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
          codigo: this.codigo || undefined,
          email: this.email || undefined,
          nome: this.nome || undefined,
          perfil: this.perfil || undefined
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
