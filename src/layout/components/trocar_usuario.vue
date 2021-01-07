<template>
  <modal
    v-model="modal"
    @confirmar="confirmarUsuario()"
    adicionar
    campos-obrigatorios
    largura="600"
    titulo="Faça Login"
  >
    <ValidationObserver
      autocomplete="off"
      ref="form"
      tag="form"
    >
      <v-row dense>
        <v-col cols="12">
          <ValidationProvider
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
            />
          </ValidationProvider>
        </v-col>
      </v-row>
    </ValidationObserver>
  </modal>
</template>

<script>
export default {
  name: 'ComponenteTrocarUsuario',
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
  data () {
    return {
      usuario: this.$store.state.app.usuario
    }
  },
  methods: {
    async confirmarUsuario () {
      if (await this.$refs.form.validate()) {
        localStorage.setItem('arss:usuario', window.btoa(this.usuario))

        this.$store.commit('app/setUsuario', this.usuario)
        this.modal = false
      }
    }
  },
  props: {
    value: {
      required: true,
      type: Boolean
    }
  }
}
</script>
