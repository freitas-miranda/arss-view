<template>
  <v-container
    fill-height
    fluid
    pa-0
  >
    <v-row
      align="center"
      class="linha-autenticacao"
      justify="center"
      dense
    >
      <v-card
        v-if="$vuetify.breakpoint.width > 904"
        class="card-autenticacao-principal animated bounceIn"
      >
        <v-row no-gutters>
          <v-col cols="5">
            <v-card
              class="card-autenticacao-portal"
              color="secondary"
              dark
              flat
            >
              <v-card-title
                style="padding-top: 120px !important;"
                class="justify-center pt-12"
              >
                <v-img
                  :src="require('@/assets/logo.png')"
                  height="auto"
                  max-width="150"
                />
              </v-card-title>
              <v-card-text
                style="padding-top: 85px !important;"
                class="text-center"
              >
                <v-btn
                  v-if="$route.path === '/login' || $route.path === '/login/'"
                  color="white"
                  large
                  outlined
                  @click="$router.push('/cadastrar')"
                >
                  <v-icon left>
                    mdi-account-plus-outline
                  </v-icon>
                  Cadastrar-se
                </v-btn>
                <v-btn
                  v-else-if="$route.path === '/cadastrar' || $route.name === 'Confirmar Cadastro' || $route.path === '/recuperar-senha' || $route.name === 'Alteração de senha'"
                  large
                  outlined
                  @click="$router.push('/login')"
                >
                  <v-icon left>
                    mdi-login-variant
                  </v-icon>
                  Retornar ao Login
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="7">
            <v-fade-transition mode="out-in">
              <router-view />
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        v-else
        class="card-autenticacao-mobile"
      >
        <v-card-title class="justify-center">
          <v-img
            :src="require('@/assets/logo.png')"
            height="auto"
            max-width="90"
          />
        </v-card-title>
        <router-view />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LayoutAutenticacao',
  computed: {}
}
</script>

<style lang="scss">
  .card-autenticacao-mobile {
    transition: all 0.4s ease-in-out 0s;
    width: 450px;

    @media (max-width: 600px) {
      height: 100%;
      width: 100%;
    }
  }

  .card-autenticacao-portal {
    border-radius: 20px 0px 0px 20px !important;
    height: 450px;
  }

  .card-autenticacao-principal {
    border-radius: 20px !important;
    height: 450px;
    transition: all 0.2s ease-in-out 0s;
    width: 900px;
  }

  .linha-autenticacao {
    height: 100vh;
    max-width: 101% !important;
    background-color: #fafafa;
    background-image: url('../../assets/autenticacao.svg');
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;

    @media (max-width: 600px) {
      height: 100%;
    }
  }

  .ou {
    color: #aaa7a7;
    display: flex;
    align-items: center;
    text-align: center;

    &::before,
    &::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid #e8e8e8;
    }

    &::before {
      margin-right: .25em;
    }

    &::after {
      margin-left: .25em;
    }
  }
</style>
