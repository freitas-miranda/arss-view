<template>
  <modal
    v-model="modal"
    adicionar
    campos-obrigatorios
    largura="600"
    titulo="Informe o usuário"
    @confirmar="confirmarUsuario()"
  >
    <validation-observer
      ref="form"
      autocomplete="off"
      tag="form"
      @submit.prevent
    >
      <v-row dense>
        <v-col cols="12">
          <validation-provider
            v-slot="{ errors }"
            name="Usuário"
            rules="required"
            vid="usuario"
          >
            <v-text-field
              v-model="usuario"
              v-uppercase
              :error-messages="errors"
              :hide-details="erroValidacao(errors)"
              autofocus
              class="required"
              filled
              label="Usuário"
              @keyup.enter="confirmarUsuario()"
            />
          </validation-provider>
        </v-col>
      </v-row>
    </validation-observer>
  </modal>
</template>

<script>
export default {
  name: 'ComponenteTrocarUsuario',
  props: {
    value: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      usuario: this.$store.state.app.usuario
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
  },
  methods: {
    async confirmarUsuario () {
      if (await this.$refs.form.validate()) {
        localStorage.setItem('md058-view:usuario', window.btoa(this.usuario))

        this.$store.commit('app/setUsuario', this.usuario)
        this.modal = false
      }
    }
  }
}
</script>
