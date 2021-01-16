<template>
  <div>
    <v-toolbar
      class="toolbar-titulo"
      flat
    >
      <v-toolbar-title>
        <div class="text-h5 font-weight-medium">
          {{ titulo }}
        </div>
        <div class="text-body-2">
          {{ subtitulo }}
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-container
      fluid
      grid-list-md
    >
      <v-card v-if="formulario">
        <v-toolbar
          v-if="formulario"
          color="primary"
          dense
          height="35"
        >
          <v-btn
            dark
            icon
            title="Fechar"
            @click="$emit('fechar')"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title class="titulo-formulario pl-1 text-h6 white--text">
            {{ tituloFormulario }}
          </v-toolbar-title>
          <v-spacer />
          <v-menu
            v-if="maisOpcoes"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                :loading="loading"
                color="white"
                dark
                small
                outlined
                v-on="on"
              >
                <v-icon left>
                  mdi-dots-vertical
                </v-icon>
                Mais Opções
              </v-btn>
            </template>
            <v-list
              class="pa-0"
              dense
            >
              <v-list-item
                v-if="excluir"
                @click="excluirRegistro = true"
              >
                <v-list-item-icon class="mr-3">
                  <v-icon color="error">
                    mdi-delete
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Excluir Registro
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <slot name="mais-opcoes" />
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-card-text class="pa-2">
          <excluir-registro
            v-model="excluirRegistro"
            :loading="loading"
            @excluir="$emit('excluir')"
          />
          <slot />
        </v-card-text>
        <divisao />
        <v-card-actions>
          <v-btn
            v-if="adicionar || editar"
            :loading="loading"
            color="primary"
            small
            title="Confirmar"
            @click="$emit('confirmar')"
          >
            <v-icon left>
              mdi-content-save
            </v-icon>
            Confirmar
          </v-btn>
          <v-btn
            v-if="exibir"
            :loading="loading"
            color="primary"
            small
            title="Editar"
            @click="$emit('editar')"
          >
            <v-icon left>
              mdi-lead-pencil
            </v-icon>
            Editar
          </v-btn>
          <v-btn
            :loading="loading"
            color="error"
            small
            title="Cancelar"
            @click="$emit('fechar')"
          >
            <v-icon left>
              mdi-close-circle-outline
            </v-icon>
            Cancelar
          </v-btn>
          <v-spacer />
          <span
            v-if="camposObrigatorios"
            class="ml-1 text-caption"
          >
            <b style="color: Red;">
              *
            </b>
            &nbsp; Campos obrigatórios
          </span>
        </v-card-actions>
      </v-card>
      <v-card
        v-if="formulario && exibirDetalhe"
        class="mt-3"
      >
        <v-card-text>
          <slot name="exibir-detalhe" />
        </v-card-text>
      </v-card>
      <slot v-if="!formulario" />
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ComponentePagina',
  props: {
    adicionar: {
      type: Boolean
    },
    camposObrigatorios: {
      default: false,
      type: Boolean
    },
    editar: {
      type: Boolean
    },
    excluir: {
      default: false,
      type: Boolean
    },
    exibir: {
      type: Boolean
    },
    exibirDetalhe: {
      default: false,
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    maisOpcoes: {
      default: false,
      type: Boolean
    },
    subtitulo: {
      required: true,
      type: String
    },
    titulo: {
      required: true,
      type: String
    },
    tituloFormulario: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      excluirRegistro: false
    }
  },
  computed: {
    formulario () {
      return this.adicionar || this.editar || this.exibir
    }
  },
  watch: {
    editar (valor) {
      if (!valor) this.excluirRegistro = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .titulo-formulario {
    font-weight: 400 !important;
  }

  .toolbar-titulo {
    border-bottom: 2px solid #e0e0e0 !important;
    background-color: #f3f3f3 !important;
    top: auto !important;
    z-index: 1 !important;
  }
</style>
