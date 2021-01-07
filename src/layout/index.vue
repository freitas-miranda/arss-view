<template>
  <v-main>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="menu = !menu"/>
      <v-toolbar-title class="pl-2">
        <div class="font-weight-medium white--text">
          ARSS
        </div>
        <div class="overline white--text">
          AR Sistema de Saúde
        </div>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn
        @click="modalUsuario = true"
        outlined
      >
        <v-icon
          left
          size="20"
        >
          mdi-account-circle
        </v-icon>
        <span v-if="$store.state.app.usuario">
          {{ $store.state.app.usuario }}
        </span>
        <span v-else>
          FAÇA LOGIN
        </span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="menu"
      app
    >
      <v-app-bar color="primary">
        <v-img
          :src="logo"
          @click="$router.push('/')"
          class="ml-2 logo-app"
          height="auto"
          max-width="200"
        />
      </v-app-bar>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          :value="rotaAtiva"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in menus"
            :key="i"
            :to="item.rota"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icone"/>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.descricao"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <trocar-usuario
      v-if="modalUsuario"
      v-model="modalUsuario"
    />
    <router-view/>
  </v-main>
</template>

<script>
export default {
  name: 'Layout',
  components: {
    trocarUsuario: () => import('./components/trocar_usuario')
  },
  computed: {
    rotaAtiva () {
      return this.menus.map(item => item.rota).indexOf(this.$route.path)
    }
  },
  data () {
    return {
      logo: require('@/assets/logo2.png'),
      menu: true,
      menus: [
        {
          descricao: 'Início',
          icone: 'mdi-home',
          rota: '/'
        },
        {
          descricao: 'Exemplo',
          icone: 'mdi-text-box-check-outline',
          rota: '/exemplo'
        }
      ],
      modalUsuario: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo-app {
    cursor: pointer;
  }
</style>
