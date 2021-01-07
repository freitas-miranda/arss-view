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
        component: () => import('@/views/exemplo'),
        name: 'Exemplo',
        path: '/exemplo',
        props: { store: 'exemplo' }
      }
    ],
    component: () => import('@/layout'),
    meta: { autenticacao: false },
    path: '/'
  },
  {
    component: () => import('@/views/erros/404'),
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
    if (localStorage.getItem('arss:token')) {
      next()
    } else {
      next('login')
    }
  } else {
    if (localStorage.getItem('arss:token')) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
