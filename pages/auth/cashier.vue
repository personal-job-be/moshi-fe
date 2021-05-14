<template>
  <div class="columns mt-4">
    <div class="column is-4"></div>
    <div class="column is-4">
      <h1 class="title is-3">Login</h1>
      <div v-if="!$auth.isAuthenticated">
        <span class="title is-6">Email :</span>
        <b-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="form-control"
        />
        <div class="mt-1">
          <span class="title is-6">Password :</span>
          <b-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="form-control"
            password-reveal
          />
        </div>
        <br />
        <b-button class="is-primary mt-3" @click="login">Login</b-button>
        <br /> 
        <nuxt-link to="/auth/forgot" class="mt-3">Forgot password ?</nuxt-link>
        <br />
        <nuxt-link to="/auth/register" class="mt-3"
          >Need an account? Register</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),
  mounted() {
    if (this.$auth.isAuthenticated) this.$router.push('/cashier')
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', this.form)
        // await this.$store.commit('login', this.form)
        const result = await this.$axios.post(`${this.$config.BASE_URL}/api/user/login`, this.form)
        if(result.status === 200) {
          localStorage.setItem('userJwt', `Bearer ${result.data.data.jwt}`)
          localStorage.setItem('userId', result.data.data.user.id)
          window.location.replace("/cashier");
        }
      } catch (error) {
      }
    },
  },
}
</script>
