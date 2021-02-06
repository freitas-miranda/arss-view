<template>
  <v-main>
    <v-app-bar
      :elevation="$vuetify.breakpoint.width < 700 ? '3' : undefined"
      app
      class="app-bar"
      dense
    >
      <img
        :src="logo"
        draggable="false"
        height="auto"
        width="50"
        @click="voltarParaPaginaInicial()"
      >
      <v-tabs
        v-if="$vuetify.breakpoint.width >= 700"
        align-with-title
        color="white"
        optional
      >
        <v-tab
          v-if="acessarSistemaUsuario === true"
          class="tab-menu"
          to="/sistema/usuario"
        >
          <v-icon
            class="icon-tab"
            left
          >
            mdi-account-multiple
          </v-icon>
          Usuários
        </v-tab>
        <v-tab
          v-if="acessarSistemaPerfil === true"
          class="tab-menu"
          to="/sistema/perfil"
        >
          <v-icon
            class="icon-tab"
            left
          >
            mdi-card-account-details-outline
          </v-icon>
          Perfil
        </v-tab>
        <v-tab
          v-if="acessarPacientes === true"
          class="tab-menu"
          to="/paciente"
        >
          <v-icon
            class="icon-tab"
            left
          >
            mdi-account-outline
          </v-icon>
          Pacientes
        </v-tab>
        <v-tab
          v-if="acessarAgendamentos === true"
          class="tab-menu"
          to="/agendamento"
        >
          <v-icon
            class="icon-tab"
            left
          >
            mdi-calendar-clock
          </v-icon>
          Agendamentos
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-menu
        bottom
        close-on-click
        offset-y
        :open-on-hover="!$vuetify.breakpoint.xs"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            :loading="loadingLogout"
            color="white"
            text
            large
            v-on="on"
          >
            <span v-if="$vuetify.breakpoint.width >= 1000">
              {{ nome }}
            </span>
            <span v-else>
              {{ nomeAbreviado }}
            </span>
            <v-icon right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list class="list-opcoes-usuario">
          <v-list-item @click="sairSistema()">
            <v-list-item-icon>
              <v-icon color="secondary">
                mdi-logout-variant
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Sair
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="acessarPerfil()">
            <v-list-item-icon>
              <v-icon color="secondary">
                mdi-account-circle-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Perfil
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.width < 700"
      :value="navegacaoRodape"
      app
      color="secondary"
      grow
    >
      <v-btn
        v-if="acessarSistemaUsuario === true"
        to="/sistema/usuario"
        style="height: inherit !important;"
        value="/sistema/usuario"
      >
        Usuários
        <v-icon>
          mdi-account-multiple
        </v-icon>
      </v-btn>
      <v-btn
        v-if="acessarAgendamentos === true"
        to="/agendamento"
        style="height: inherit !important;"
        value="/agendamento"
      >
        Agenda
        <v-icon>
          mdi-calendar-clock
        </v-icon>
      </v-btn>
      <v-btn
        v-if="acessarPacientes === true"
        to="/paciente"
        style="height: inherit !important;"
        value="/paciente"
      >
        Pacientes
        <v-icon>
          mdi-account-outline
        </v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-slide-x-transition mode="out-in">
      <router-view />
    </v-slide-x-transition>
  </v-main>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'LayoutAplicacao',
  data () {
    return {
      logo: require('@/assets/logo_header.png'),
      acessarSistemaUsuario: false,
      acessarSistemaPerfil: false,
      acessarPacientes: false,
      acessarAgendamentos: false
    }
  },
  computed: {
    ...mapGetters('app', [
      'nomeAbreviado'
    ]),
    ...mapState('app', [
      'loadingLogout',
      'modalAlterarSenha',
      'nome'
    ]),
    navegacaoRodape () {
      return this.$route.path
    }
  },
  created () {
    setTimeout(() => {
      this.configurarAbas()
    }, 300)
  },
  methods: {
    ...mapActions('app', [
      'logout',
      'rotaAutorizadaSinc'
    ]),
    async sairSistema () {
      const sair = await this.logout()

      if (sair.mensagem) this.$router.push('/login')
    },
    async acessarPerfil () {
      const path = '/perfil'
      if (this.$route.path !== path) this.$router.push(path)
    },
    voltarParaPaginaInicial () {
      this.$router.push('/').catch(() => {})
    },
    async configurarAbas () {
      this.acessarSistemaUsuario = await this.rotaAutorizadaSinc('/sistema/usuario')
      this.acessarSistemaPerfil = await this.rotaAutorizadaSinc('/sistema/perfil')
      this.acessarPacientes = await this.rotaAutorizadaSinc('/paciente')
      this.acessarAgendamentos = await this.rotaAutorizadaSinc('/agendamento')
    }
  }
}
</script>

<style lang="scss">
  .app-bar {
    background: linear-gradient(90deg, rgb(102, 172, 183) 0%, rgb(14, 148, 192) 100%) !important;
  }

  .divider-opcoes-usuario {
    border-color: rgba(0, 0, 0, 0.05) !important;
  }

  .list-opcoes-usuario {
    padding: 0px !important;
  }

  .tab-menu {
    &:hover {
      opacity: 0.6;
    }

    &.v-tab--active {
      pointer-events: none;
    }

    &:not(.v-tab--active) {
      color: #ffffffad !important;

      .v-icon {
        color: #ffffffad !important;
      }
    }
  }

  .v-main__wrap {
    background-color: #f0f0f0;
  }

  .icon-tab {
    color: #f0f0f0 !important;
  }

</style>
