import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'

Vue.use(VueRouter)

const Perfil = Object.freeze({
  'Admin': 1,
  'Gestor': 2,
  'Secreataria': 3,
  'Pacientes': 4
})

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/app'),
    meta: { autenticacao: true },
    children: [
      {
        component: () => import('@/views/inicio'),
        name: 'Início',
        path: ''
      },
      {
        component: () => import('@/views/perfil'),
        path: 'perfil',
        name: 'Perfil',
        props: { store: 'perfil' }
      },
      {
        component: () => import('@/views/sistema/perfil'),
        name: 'PerfilAcesso',
        path: '/sistema/perfil',
        props: { store: 'sistemaPerfil' }
      },
      {
        component: () => import('@/views/sistema/usuario'),
        name: 'Usuários',
        path: '/sistema/usuario',
        props: { store: 'sistemaUsuario' }
      },
      {
        component: () => import('@/views/paciente'),
        name: 'Paciente',
        path: '/paciente',
        props: { store: 'paciente' }
      },
      {
        component: () => import('@/views/agendamento'),
        name: 'Agendamento',
        path: '/agendamento',
        props: { store: 'agendamento' }
      }
    ]
  },
  {
    path: '',
    component: () => import('@/layouts/autenticacao'),
    meta: { autenticacao: false },
    children: [
      {
        component: () => import('@/views/autenticacao/alterar_senha'),
        name: 'Alteração de senha',
        path: '/alterar-senha/:token',
        props: { store: 'alterarSenha' }
      },
      {
        component: () => import('@/views/autenticacao/cadastrar'),
        name: 'Criar conta',
        path: '/cadastrar',
        props: { store: 'criarConta' }
      },
      {
        component: () => import('@/views/autenticacao/confirmar_cadastro'),
        name: 'Confirmar Cadastro',
        path: '/confirmar-cadastro/:token',
        props: { store: 'confirmarCadastro' }
      },
      {
        path: '/login',
        name: 'Acesse sua conta',
        component: () => import('@/views/autenticacao/login')
      },
      {
        component: () => import('@/views/autenticacao/recuperar_senha'),
        name: 'Recuperação de senha',
        path: '/recuperar-senha',
        props: { store: 'recuperarSenha' }
      }
    ]
  },
  {
    path: '/confirmar-email/:token',
    name: 'Confirmação de E-mail',
    component: () => import('@/views/confirmar_email')
  },
  {
    path: '/proibido',
    name: 'Proibido',
    component: () => import('@/views/erro/403')
  },
  {
    path: '*',
    name: 'Página não encontrada',
    component: () => import('@/views/erro/404')
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
    if (localStorage.getItem('login:token')) next()
    else next('login')
  } else if (to.matched.some(record => record.meta.autenticacao === false)) {
    if (localStorage.getItem('login:token')) next('/')
    else next()
  } else next()

  if (to.matched[0].path !== '*' && to.path !== '/login' && to.path !== '/' && to.path !== '/proibido') {
    const perfil = (localStorage.getItem('login:perfil'))
    if (to.path === '/sistema/usuario') {
      if (perfil !== window.btoa(Perfil.Admin)) next('/proibido')
      else next()
    } else next()
  } else next()
})

export default router
