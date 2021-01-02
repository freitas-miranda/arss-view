<template>
  <div>
    <v-overlay
      v-if="showOverlay"
      class="headline"
      :opacity="0.6"
      :value="loading"
      absolute
    >
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
      />
    </v-overlay>
    <v-row
      dense
      class="title ml-2"
    >
      <div
        v-if="exibirFormulario !== 'erro' && !isDashboardTv()"
        class="pt-2"
      >
        <v-btn
          class="white--text"
          :color="loadingCountLojas === totalLojas ? '#61b15a' : '#F44336'"
          @click="setExibirFormulario('erro')"
        >
          <v-icon
            v-if="!loading"
            left
          >
            mdi-magnify
          </v-icon>

          <v-progress-circular
            v-if="loading"
            class="mr-2"
            :size="16"
            :width="2"
            indeterminate
          />
          {{ loading ? 'Carregando dados das lojas...' : 'Dados das Lojas' }} [{{ loadingCountLojas }}/{{ totalLojas }}]
        </v-btn>
      </div>
      <v-divider />
      <v-bottom-navigation
        width="150"
        height="25"
        class="align-right"
        color="green"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              height="25"
              width="75"
              v-bind="attrs"
              v-on="on"
              @click="$router.push('/tv').catch(() => {})"
            >
              <v-icon small>
                mdi-television-play
              </v-icon>
            </v-btn>
          </template>
          <span>TV</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              height="25"
              width="75"
              v-bind="attrs"
              v-on="on"
              @click="$router.push('/dashboard').catch(() => {})"
            >
              <v-icon small>
                mdi-desktop-tower
              </v-icon>
            </v-btn>
          </template>
          <span>Desktop</span>
        </v-tooltip>
      </v-bottom-navigation>
    </v-row>
    <div
      v-if="exibirFormulario === 'dashboard'"
      class="pt-5"
    >
      <v-row
        v-if="!isDashboardTv()"
        dense
      >
        <v-col
          v-for="(fluxo, index) of filasAuditorias()"
          :key="index"
          class="mb-5"
          cols="12"
          xl="3"
          lg="6"
          md="6"
          sm="12"
          xs="12"
        >
          <cardFluxo
            :fluxo-codigo="fluxo.id"
            :fluxo-descricao="fluxo.descricao"
            :implantacao="fluxo.implantacao"
            :processados="fluxo.processados"
            :pendentes="fluxo.pendentes"
            :falhas="fluxo.falhas"
            @click="getFluxo(fluxo)"
          />
        </v-col>
      </v-row>
      <v-carousel
        v-if="isDashboardTv()"
        :show-arrows="false"
        cycle
        height="auto"
        :interval="1000 * 5"
      >
        <div
          v-for="(qtdFluxo, pagina) of qtdFluxoPorPagina()"
          :key="pagina"
        >
          <v-carousel-item
            v-if="canCreateNewPage(qtdFluxo, pagina)"
          >
            <v-row
              class="pl-5 pr-0"
              dense
            >
              <v-col
                v-for="(fluxo, index) of filaAuditoriaPorPagina(qtdFluxo, pagina)"
                :key="index"
                cols="12"
                class="custom7colsXL"
                xl="2"
                lg="3"
                md="4"
                sm="6"
                xs="12"
              >
                <cardFluxoTv
                  :fluxo-codigo="fluxo.id"
                  :fluxo-descricao="fluxo.descricao"
                  :implantacao="fluxo.implantacao"
                  :processados="fluxo.processados"
                  :pendentes="fluxo.pendentes"
                  :falhas="fluxo.falhas"
                  :data-execucao="fluxo.dataExecucao"
                  @click="getFluxo(fluxo)"
                />
              </v-col>
            </v-row>
          </v-carousel-item>
        </div>
      </v-carousel>
    </div>

    <listaFluxo
      v-if="exibirFormulario === 'lista'"
      :fluxo-card="fluxoCard"
    />
    <erroFluxo
      v-if="exibirFormulario === 'erro'"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import axiosMD045 from '@/plugins/axios_md045'
import dayjs from '@/plugins/dayjs'

export default {
  name: 'PaginaDashboard',
  components: {
    cardFluxo: () => import('./components/card_fluxo'),
    cardFluxoTv: () => import('./components/card_fluxo_tv'),
    listaFluxo: () => import('./components/lista_fluxo'),
    erroFluxo: () => import('./components/erro_fluxo')
  },
  data () {
    return {
      fluxoCard: {},
      intervaloExecucaoTv: 0,
      showOverlay: true,
      testeFull: window.screenY
    }
  },
  computed: {
    ...mapState('dashboard', [
      'fluxos',
      'auditorias',
      'loading',
      'loadingCountLojas',
      'totalLojas',
      'exibirFormulario'
    ]),
    isFullScreen () {
      return this.$stateScreen.isFullScreen
    }
  },
  watch: {
    $route (newRoute, oldRoute) {
      if (newRoute.fullPath === '/tv') {
        this.setExibirFormulario('dashboard')
        this.startIntervaloExecucaoTv()
      } else {
        if (this.intervaloExecucaoTv) {
          this.showOverlay = true
          clearInterval(this.intervaloExecucaoTv)
        }
      }
    }
  },
  created () {
    this.setExibirFormulario('dashboard')
    this.obterFluxos()
    this.obterAuditorias()
    this.startIntervaloExecucaoTv()
  },
  destroyed () {
    axiosMD045.defaults.baseURL = `${process.env.VUE_APP_HOST_MD045}/api/`
    if (this.intervaloExecucaoTv) {
      clearInterval(this.intervaloExecucaoTv)
    }
  },
  methods: {
    ...mapActions('dashboard', [
      'obterFluxos',
      'obterAuditorias'
    ]),
    ...mapMutations('dashboard', [
      'setExibirFormulario'
    ]),
    filasAuditorias () {
      if (this.fluxos.length === 0) {
        return
      }
      let auditoriaCalculo = []
      let filaFluxo = {}
      const filasArray = []
      for (const fluxo of this.fluxos) {
        auditoriaCalculo = this.deepCloneArray(this.auditorias)
        auditoriaCalculo = auditoriaCalculo.filter((el) => el.fluxoId === fluxo.id)

        const processados = this.auditorias.length ? this.calcularAuditorias(auditoriaCalculo, 'lancadosHoje') : -1
        const pendentes = this.auditorias.length ? this.calcularAuditorias(auditoriaCalculo, 'pendentes') : -1
        const falhas = this.auditorias.length ? this.calcularAuditorias(auditoriaCalculo, 'falhas') : -1

        filaFluxo = {
          id: fluxo.id,
          implantacao: fluxo.implantacao,
          descricao: fluxo.descricao,
          processados,
          pendentes,
          falhas,
          dataExecucao: this.$formatarData(dayjs().format())
        }

        filasArray.push(filaFluxo)
      }

      const orderBy = (a, b, prop, order = 'desc') => {
        let ordernacao = b[prop] - a[prop]
        if (order === 'asc') {
          ordernacao = a[prop] - b[prop]
        }

        return ordernacao
      }

      const orderByFalhasAndFluxoId = filasArray.sort((a, b) => {
        return orderBy(a, b, 'falhas') || orderBy(a, b, 'id', 'asc')
      })

      this.formatarNumerosFila(orderByFalhasAndFluxoId)

      return orderByFalhasAndFluxoId
    },
    calcularAuditorias (items, prop) {
      const calculoAuditoria = items.reduce((total, auditoria) => {
        return total + (auditoria[prop] || 0)
      }, 0)

      return Number(calculoAuditoria)
    },
    formatarNumerosFila (filas) {
      for (const fila of filas) {
        fila.processados = this.$formatarNumero(fila.processados)
        fila.pendentes = this.$formatarNumero(fila.pendentes)
        fila.falhas = this.$formatarNumero(fila.falhas)
      }
    },
    getFluxo (fluxo) {
      this.setExibirFormulario('lista')
      this.fluxoCard = Object.assign({}, fluxo)
    },
    deepCloneArray (array) {
      return JSON.parse(JSON.stringify(array))
    },
    isDashboardTv () {
      return this.$route.fullPath === '/tv'
    },
    async startIntervaloExecucaoTv () {
      this.intervaloExecucaoTv = setInterval(() => {
        this.showOverlay = false
        this.obterFluxos()
        this.obterAuditorias()
      }, 1000 * 60)
    },
    filaAuditoriaPorPagina (qtdFluxoPorPagina, qtdPagina) {
      const filaAuditoria = this.filasAuditorias()
      const filaArrayIsEmpty = Array.isArray(filaAuditoria) && filaAuditoria.length > 0

      if (filaArrayIsEmpty) {
        if (filaAuditoria.length > qtdFluxoPorPagina) {
          return filaAuditoria.slice(qtdFluxoPorPagina, this.qtdPaginaFluxo(qtdPagina))
        }
      } else {
        return []
      }
    },
    qtdFluxoPorPagina () {
      return this.isFullScreen ? [0, 35] : [0, 28]
    },
    qtdPaginaFluxo (pagina) {
      return this.isFullScreen ? 35 * (pagina + 1) : 28 * (pagina + 1)
    },
    canCreateNewPage (qtdFluxo, pagina) {
      const filaFluxoPorPagina = this.filaAuditoriaPorPagina(qtdFluxo, pagina)
      const isCardItemGreaterThanMaxPage = qtdFluxo === 0 || (filaFluxoPorPagina && filaFluxoPorPagina.length <= qtdFluxo)
      return isCardItemGreaterThanMaxPage
    }
  }
}
</script>

<style scoped>
  ::v-deep .v-carousel__item {
    padding-bottom: 60px;
  }
  ::v-deep .v-carousel__controls {
    position: fixed;
    text-align: center;
    bottom: 0px;
    width: 100%;
    background: white !important;
  }
  ::v-deep .v-carousel__controls__item{
    color: #00613B !important
  }
  @media (min-width: 1904px) {
    .custom7colsXL {
      width: 14%;
      max-width: 14%;
      flex-basis: 14%;
    }
  }
</style>
