<template>
  <v-main>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="menu = !menu" />
      <v-toolbar-title class="pl-2">
        <template
          v-if="!isDashboardTv()"
        >
          <div class="font-weight-medium white--text">
            Implantação do Estoque
          </div>
          <div class="overline white--text">
            Controle para implantação do estoque
          </div>
        </template>
      </v-toolbar-title>
      <template
        v-if="isDashboardTv()"
      >
        <div>
          <v-img
            :src="logo"
            class="ml-2 mr-5 logo-app"
            height="auto"
            max-width="202"
            @click="voltarParaPaginaInicial()"
          />
        </div>
        <div
          style="font-size: 40px !important"
        >
          MONITORAMENTO | ESTOQUE
        </div>
      </template>
      <v-spacer />
      <v-btn
        v-if="!isDashboardTv()"
        outlined
        @click="modalUsuario = true"
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
          SEM USUÁRIO
        </span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="menu"
      class="drawer-app"
      app
    >
      <v-app-bar color="primary">
        <v-img
          :src="logo"
          class="ml-2 logo-app"
          height="auto"
          max-width="202"
          @click="voltarParaPaginaInicial()"
        />
      </v-app-bar>
      <v-treeview
        :active.sync="ativar"
        :items="menusIndex()"
        activatable
        class="treeview-drawer"
        color="primary"
        item-children="filhos"
        item-key="id"
        item-text="descricao"
        open-on-click
        return-object
        transition
      >
        <template v-slot:prepend="{ item, active }">
          <v-icon
            :color="active ? 'primary' : undefined"
            @mouseup.ctrl="abrirNovaAba(item)"
            @click="stopClickHandle($event)"
          >
            {{ item.icone }}
          </v-icon>
        </template>

        <template v-slot:label="{ item }">
          <div
            @mouseup.ctrl="abrirNovaAba(item)"
            @click="stopClickHandle($event)"
          >
            {{ item.descricao }}
          </div>
        </template>
        <template
          v-slot:append="{ item, open }"
        >
          <div
            v-if="item.filhos"
            class="mr-2"
          >
            <v-icon v-if="open">
              mdi-menu-down
            </v-icon>
            <v-icon v-else>
              mdi-menu-right
            </v-icon>
          </div>
        </template>
      </v-treeview>
    </v-navigation-drawer>
    <trocar-usuario
      v-if="modalUsuario"
      v-model="modalUsuario"
    />
    <router-view />
  </v-main>
</template>

<script>
export default {
  name: 'Layout',
  components: {
    trocarUsuario: () => import('./components/trocar_usuario')
  },
  data () {
    return {
      logo: require('@/assets/logo2.png'),
      menu: true,
      menus: [
        {
          descricao: 'Dashboard',
          icone: 'mdi-monitor-dashboard',
          rota: '/dashboard'
        },
        {
          descricao: 'Auditorias',
          icone: 'mdi-pencil-box',
          filhos: [
            {
              descricao: 'Processamento',
              icone: 'mdi-package-variant-closed',
              rota: '/auditoria'
            },
            {
              descricao: 'Cupons de Vendas',
              icone: 'mdi-cart',
              rota: '/auditoria-cupons'
            },
            {
              descricao: 'Sincronismo MTZ',
              icone: 'mdi-database-sync',
              rota: '/sincronismo'
            },
            {
              descricao: 'Últimas Auditorias',
              icone: 'mdi-pencil-outline',
              rota: '/ultimas-auditorias'
            }
          ]
        },
        {
          descricao: 'Cadastros',
          icone: 'mdi-book-open',
          filhos: [
            {
              descricao: 'Armazéns',
              icone: 'mdi-map-marker-radius',
              rota: '/armazem'
            },
            {
              descricao: 'Empresas',
              icone: 'mdi-bank',
              rota: '/empresa'
            },
            {
              descricao: 'Implantações',
              icone: 'mdi-clipboard-text',
              rota: '/implantacao'
            },
            {
              descricao: 'Fluxos',
              icone: 'mdi-hexagon-multiple',
              rota: '/fluxo'
            }
          ]
        }
      ],
      modalUsuario: false,
      ativo: []
    }
  },
  computed: {
    ativar: {
      get () {
        return this.ativo
      },
      set (valor) {
        if (valor.length) {
          this.ativo = []
          this.ativo.push(valor[0])

          if (valor[0].rota !== this.$route.path) {
            this.$router.push(valor[0].rota)
          }
        }
      }
    }
  },
  methods: {
    abrirNovaAba (item) {
      if (!item.filhos) {
        window.open(item.rota)
      }
    },
    stopClickHandle (event) {
      const ctrlClick = event.ctrlKey && event.which === 1
      return ctrlClick ? event.stopPropagation() : null
    },
    menusIndex () {
      let index = 1
      for (const menu of this.menus) {
        menu.id = index
        if (menu.filhos) {
          for (const filho of menu.filhos) {
            index++
            filho.id = index
          }
        }
        index++
      }
      return this.menus
    },
    voltarParaPaginaInicial () {
      this.$router.push('/').catch(() => {})
    },
    isDashboardTv () {
      return this.$route.fullPath === '/tv'
    }
  }
}
</script>

<style lang="scss">
  .logo-app {
    cursor: pointer;
  }
  .drawer-app {
    background-color: #FDFDFD !important;
    font-size: 0.8rem !important;
    .treeview-drawer {
      .v-treeview-node {
        margin-left: 0px;
        .v-treeview-node__root {

          .v-treeview-node__level {
            width: 0px;
          }

          .v-treeview-node__toggle  {
            visibility: hidden;
            width: 0px;
          }
          .v-treeview-node__content {
            margin-left: 0px;

            .v-treeview-node__label {
              margin-left: 20px;
            }
          }
        }

        .v-treeview-node__children  {
          .v-treeview-node__level {
            width: 15px;
          }

          .v-treeview-node__toggle  {
            visibility: hidden;
            width: 15px;
          }
        }
      }
    }
  }

</style>
