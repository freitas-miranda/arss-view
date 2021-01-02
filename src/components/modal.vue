<template>
  <v-dialog
    v-model="modal"
    :fullscreen="$vuetify.breakpoint.xs"
    :width="largura"
    persistent
  >
    <v-card>
      <v-toolbar
        color="primary"
        dark
        dense
      >
        <v-btn
          dark
          icon
          title="Fechar"
          @click="modal = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-toolbar-title class="titulo-modal pl-1 text-h6">
          {{ titulo }}
        </v-toolbar-title>
      </v-toolbar>
      <v-divider class="divider-modal" />
      <v-card-text class="pa-2">
        <slot />
      </v-card-text>
      <divisao />
      <v-card-actions>
        <span
          v-if="camposObrigatorios"
          class="ml-1 text-caption"
        >
          <b style="color: Red;">
            *
          </b>
          &nbsp; Campos obrigatórios
        </span>
        <v-spacer />
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
          @click="modal = false"
        >
          <v-icon left>
            mdi-close-circle-outline
          </v-icon>
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ComponenteModal',
  props: {
    adicionar: {
      default: false,
      type: Boolean
    },
    camposObrigatorios: {
      default: false,
      type: Boolean
    },
    editar: {
      default: false,
      type: Boolean
    },
    exibir: {
      default: false,
      type: Boolean
    },
    largura: {
      default: '',
      type: [Number, String]
    },
    loading: {
      type: Boolean
    },
    titulo: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    modal: {
      get () {
        return this.value
      },
      set (valor) {
        this.$emit('input', valor)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .divider-modal {
    background-color: #009C4D;
    min-height: 3px;
  }

  .titulo-modal {
    font-weight: 400 !important;
  }
</style>
