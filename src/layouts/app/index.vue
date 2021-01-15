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
      >
      <v-tabs
        v-if="$vuetify.breakpoint.width >= 700"
        align-with-title
        color="white"
        optional
      >
        <v-tab
          class="tab-menu"
          to="/"
        >
          <v-icon left>
            mdi-home-circle-outline
          </v-icon>
          Início
        </v-tab>
        <v-tab
          class="tab-menu"
          to="/sistema/usuario"
        >
          <v-icon left>
            mdi-account-multiple
          </v-icon>
          Usuários
        </v-tab>
        <v-tab
          class="tab-menu"
          to="/sistema/perfil"
        >
          <v-icon left>
            mdi-card-account-details-outline
          </v-icon>
          Perfil Acesso
        </v-tab>
        <v-tab
          class="tab-menu"
          to="/pacientes"
        >
          <v-icon left>
            mdi-account-outline
          </v-icon>
          Pacientes
        </v-tab>
        <v-tab
          class="tab-menu"
          to="/perfil"
        >
          <v-icon left>
            mdi-account-circle-outline
          </v-icon>
          Perfil
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
              <v-icon color="primary">
                mdi-logout-variant
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Sair do Portal
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.width < 700"
      :value="navegacaoRodape"
      app
      color="primary"
      grow
    >
      <v-btn
        to="/"
        style="height: inherit !important;"
        value="/"
      >
        Início
        <v-icon>
          mdi-home-circle-outline
        </v-icon>
      </v-btn>
      <v-btn
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
        to="/cartoes"
        style="height: inherit !important;"
        value="/cartoes"
      >
        Cartões
        <v-icon>
          mdi-credit-card-outline
        </v-icon>
      </v-btn>
      <v-btn
        to="/perfil"
        style="height: inherit !important;"
        value="/perfil"
      >
        Perfil
        <v-icon>
          mdi-account-circle-outline
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
      logo: require('@/assets/logo_header.png')
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
  methods: {
    ...mapActions('app', [
      'logout'
    ]),
    async sairSistema () {
      const sair = await this.logout()

      if (sair.mensagem) this.$router.push('/login')
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
</style>
