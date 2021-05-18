<template>
  <div class="columns mt-4">
    <div class="column is-4"></div>
    <div class="column is-4">
      <h1 class="title is-3">Register</h1>

      <div v-if="!$auth.isAuthenticated">
        <!-- Register -->
        <div v-if="step === steps.register">
          <span class="title is-6">Email :</span>
          <b-input
            v-model="registerForm.email"
            type="email"
            placeholder="Email"
            class="form-control"
            password-reveal
          />
          <div class="mt-1">
            <span class="title is-6">Password :</span>
            <b-input
              v-model="registerForm.password"
              placeholder="Password"
              type="password"
              class="form-control"
              password-reveal
            />
          </div>
          <div class="mt-1">
            <span class="title is-6">Konfirmasi Password :</span>
            <b-input
              v-model="registerForm.confirmPassword"
              placeholder="Konfirmasi Password"
              type="password"
              class="form-control"
              password-reveal
            />
          </div>
          <b-button type="submit" class="is-success mt-3" @click="register"
            >Register</b-button
          >
        </div>

        <div v-else @submit.prevent="confirm">
          <span class="title is-6">Email :</span>
          <b-input
            v-model="confirmForm.email"
            type="email"
            placeholder="Email"
            class="form-control"
          />
          <div class="mt-1">
            <span class="title is-6">Kode Konfirmasi :</span>
            <b-input
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

        <nuxt-link to="/auth/cashier">Have an account? Login</nuxt-link>
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
  layout: "public",
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      email: null,
      password: null,
      confirmPassword: null,
    },
    confirmForm: {
      email: '',
      code: '',
    },
    user: [
      // 0
      {
        name : 'type',
        value : 'Tidak'
      },
      // 1
      {
        name : 'therapist',
        value : 'Tidak'
      },
      // 2
      {
        name : 'promo',
        value : 'Tidak'
      },
      // 3
      {
        name : 'addMember',
        value : 'Aktif'
      },
      // 4
      {
        name : 'editMember',
        value : 'Aktif'
      },
      // 5
      {
        name : 'absensi',
        value : 'Tidak'
      },
      // 6
      {
        name : 'user',
        value : 'Tidak'
      },
      // 7
      {
        name : 'addTransaction',
        value : 'Aktif'
      },
      // 8
      {
        name : 'editTransaction',
        value : 'Tidak'
      },
      // 9
      {
        name : 'dailyReport',
        value : 'Aktif'
      },
      // 10
      {
        name : 'payroll',
        value : 'Tidak'
      },
    ]
  }),

  mounted() {
    if (this.$auth.isAuthenticated) this.$router.push('/')
  },

  methods: {
    async register() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.$buefy.toast.open({
          message: `Konfirmasi Password Tidak Sama`,
          type: 'is-danger',
        })
        return
      }
      try {
        // await this.$store.commit('register', this.registerForm)
        await this.$store.dispatch('auth/register', this.registerForm)
        this.confirmForm.email = this.registerForm.email
        this.step = this.steps.confirm
      } catch (error) {
        this.$buefy.toast.open({
          message: error.message,
          type: 'is-danger',
        })
      }
    },

    async confirm() {
      try {
        // await this.$store.commit('confirmRegistration', this.confirmForm)
        // await this.$store.commit('login', this.registerForm)
        await this.$store.dispatch('auth/confirmRegistration', this.confirmForm)
        // await this.$store.dispatch('auth/login', this.registerForm)
        const result = await this.$axios.post(`${this.$config.BASE_URL}/api/user`, {
          email : this.registerForm.email,
          password : this.registerForm.password,
          user: this.user,
          }
        )
        if(result.status === 200) {
          // this.$store.commit('setJwt',result.data.data)
          localStorage.setItem('userJwt', result.data.data.jwt)
          this.$router.push('/auth/cashier')
          // window.location.replace("/auth");
        }
      } catch (error) {
        this.$buefy.toast.open({
          message: error.message,
          type: 'is-danger',
        })
      }
    },
  },
}
</script>
