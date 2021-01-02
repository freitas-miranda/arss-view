<template>
  <pagina
    subtitulo="Auditorias de empresas"
    titulo="Últimas Auditorias"
  >
    <filtro
      :loading="loading"
      pesquisar
      @pesquisar="pesquisar()"
    >
      <validation-observer
        ref="form"
        autocomplete="off"
        tag="form"
      >
        <v-row dense>
          <v-col
            lg="1"
            sm="3"
            cols="12"
          >
            <validation-provider
              v-slot="{ errors }"
              name="Fluxo"
              rules="max:100"
              vid="fluxoId"
            >
              <v-text-field
                v-model="filtro.fluxoId"
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                filled
                label="Fluxo"
                @click:append="pesquisar()"
                @keyup.enter="pesquisar()"
              />
            </validation-provider>
          </v-col>
          <v-col
            lg="3"
            sm="4"
            cols="12"
          >
            <validation-provider
              v-slot="{ errors }"
              name="Descrição do Fluxo"
              rules="max:100"
              vid="fluxoDescricao"
            >
              <v-text-field
                v-model="filtro.fluxoDescricao"
                v-uppercase
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                filled
                label="Descrição do Fluxo"
                @click:append="pesquisar()"
                @keyup.enter="pesquisar()"
              />
            </validation-provider>
          </v-col>
          <v-col
            lg="1"
            sm="3"
            cols="12"
          >
            <validation-provider
              v-slot="{ errors }"
              name="Empresa"
              rules="max:3"
              vid="empresa"
            >
              <v-text-field
                v-model="filtro.empresa"
                v-uppercase
                :error-messages="errors"
                :hide-details="erroValidacao(errors)"
                filled
                label="Empresa"
                @click:append="pesquisar()"
                @keyup.enter="pesquisar()"
              />
            </validation-provider>
          </v-col>
        </v-row>
      </validation-observer>
    </filtro>
    <loading v-model="loading" />
    <v-row dense>
      <v-col dense>
        <ultimasAuditorias />
      </v-col>
    </v-row>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PaginaUltimasAuditorias',
  components: {
    ultimasAuditorias: () => import('./components/ultimas_auditorias')
  },
  data () {
    return {
      filtro: {
        fluxoId: null,
        fluxoDescricao: null,
        empresa: null,
        auditoria: null
      }
    }
  },
  computed: {
    ...mapState('ultimasAuditorias', [
      'loading'
    ])
  },
  created () {
    this.obterUltimasAuditorias(this.filtroPesquisa())
  },
  methods: {
    ...mapActions('ultimasAuditorias', [
      'obterUltimasAuditorias'
    ]),
    async pesquisar () {
      if (await this.$refs.form.validate()) {
        await this.obterUltimasAuditorias(this.filtroPesquisa())
      }
    },
    filtroPesquisa () {
      const filtros = {
        filtro: JSON.stringify({
          fluxoId: this.filtro.fluxoId || undefined,
          fluxoDescricao: this.filtro.fluxoDescricao || undefined,
          empresa: this.filtro.empresa || undefined
        })
      }

      return filtros
    }
  }
}
</script>
