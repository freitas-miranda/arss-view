import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'

Vue.use(VueRouter)

const routes = [
  {
    children: [
      {
        component: () => import('@/views/inicio'),
        name: 'Início',
        path: ''
      },
      {
        component: () => import('@/views/empresa'),
        name: 'Empresa',
        path: '/empresa',
        props: { store: 'empresa' }
      },
      {
        component: () => import('@/views/armazem'),
        name: 'Armazém',
        path: '/armazem',
        props: { store: 'armazem' }
      },
      {
        component: () => import('@/views/fluxo'),
        name: 'Fluxo',
        path: '/fluxo',
        props: { store: 'fluxo' }
      },
      {
        component: () => import('@/views/implantacao'),
        name: 'Implantação',
        path: '/implantacao',
        props: { store: 'implantacao' }
      },
      {
        component: () => import('@/views/auditoria'),
        name: 'Auditoria',
        path: '/auditoria',
        props: { store: 'auditoria' }
      },
      {
        component: () => import('@/views/auditoria_cupons'),
        name: 'Auditoria Cupons',
        path: '/auditoria-cupons',
        props: { store: 'auditoriaCupons' }
      },
      {
        component: () => import('@/views/sincronismo'),
        name: 'sincronismo',
        path: '/sincronismo',
        props: { store: 'sincronismo' }
      },
      {
        component: () => import('@/views/dashboard'),
        name: 'dashboard',
        path: '/dashboard',
        props: { store: 'dashboard' },
        alias: '/tv'
      },
      {
        component: () => import('@/views/ultimas_auditorias'),
        name: 'Últimas Auditorias',
        path: '/ultimas-auditorias',
        props: { store: 'ultimasAuditorias' }
      }
    ],
    component: () => import('@/layout'),
    meta: { autenticacao: false },
    path: '/'
  },
  {
    component: () => import('@/views/erro/404'),
    meta: { autenticacao: false },
    name: 'Página não encontrada',
    path: '*'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _from, next) => {
  store.commit('app/setTitulo', to.name)

  if (to.matched.some(record => record.meta.autenticacao)) {
    if (localStorage.getItem('md058-view:token')) {
      next()
    } else {
      next('login')
    }
  } else {
    if (localStorage.getItem('md058-view:token')) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
