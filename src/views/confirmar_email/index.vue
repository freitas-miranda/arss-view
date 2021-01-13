<template>
  <div />
</template>

<script>
export default {
  name: 'PaginaConfirmarEmail',
  async created () {
    try {
      this.$store.commit('app/setLoading', true)

      await this.$axios.post('/perfil/confirmar-email', { token: this.$route.params.token })
    } finally {
      if (localStorage.getItem('login:token')) this.$router.push('/')
      else this.$router.push('/login')

      this.$store.commit('app/setLoading', false)
    }
  }
}
</script>
