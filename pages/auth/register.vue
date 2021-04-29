<template>
  <div class="columns mt-4">
    <div class="column is-4"></div>
    <div class="column is-4">
      <h1 class="title is-3">Register</h1>

      <div v-if="!$auth.isAuthenticated">
        <!-- Register -->
        <div v-if="step === steps.register">
          <span class="title is-6">Email :</span>
          <input
            v-model="registerForm.email"
            type="email"
            placeholder="Email"
            class="form-control"
          />
          <br />
          <div class="mt-5">
            <span class="title is-6">Password :</span>
            <input
              v-model="registerForm.password"
              type="password"
              placeholder="Password"
              class="form-control"
            />
          </div>
          <b-button type="submit" class="is-success mt-3" @click="register"
            >Register</b-button
          >
        </div>

        <div v-else @submit.prevent="confirm">
          <span class="title is-6">Email :</span>
          <input
            v-model="confirmForm.email"
            type="email"
            placeholder="Email"
            class="form-control"
          />
          <br />
          <div class="mt-5">
            <span class="title is-6">Password :</span>
            <input
              v-model="confirmForm.code"
              placeholder="Code"
              class="form-control"
            />
          </div>
          <br />
          <b-button type="submit" class="is-success" @click="confirm"
            >Confirm</b-button
          >
        </div>

        <nuxt-link to="/login">Have an account? Login</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM',
}

export default {
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: '',
      password: '',
    },
    confirmForm: {
      email: '',
      code: '',
    },
  }),

  mounted() {
    if (this.$auth.isAuthenticated) this.$router.push('/')
  },

  methods: {
    async register() {
      try {
        // await this.$store.commit('register', this.registerForm)
        await this.$store.dispatch('auth/register', this.registerForm)
        this.confirmForm.email = this.registerForm.email
        this.step = this.steps.confirm
      } catch (error) {
        console.log({ error })
      }
    },

    async confirm() {
      try {
        // await this.$store.commit('confirmRegistration', this.confirmForm)
        // await this.$store.commit('login', this.registerForm)
        await this.$store.dispatch('auth/confirmRegistration', this.confirmForm)
        await this.$store.dispatch('auth/login', this.registerForm)
        const result = await this.$axios.post(`${this.$config.BASE_URL}/api/user`, this.registerForm)
        if(result.status === 200) {
          // this.$store.commit('setJwt',result.data.data)
          localStorage.setItem('userJwt', result.data.data.jwt)
          window.location.replace("/cashier");
        }
      } catch (error) {
        console.log({ error })
      }
    },
  },
}
</script>
