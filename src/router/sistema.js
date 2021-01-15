export default [
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
  }
]
