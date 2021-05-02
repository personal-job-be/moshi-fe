<template>
 <div class="columns mt-4">
    <div class="column is-4"></div>
    <div class="column is-4">
      <h1 class="title is-3">Forgot Password</h1>
      <div v-if="!$auth.isAuthenticated && !confirm ">
        <span class="title is-6">Email :</span>
        <b-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="form-control"
        />
        <br />
        <b-button class="is-primary mt-3" @click="forgot">Send Email</b-button>
        <br /> 
      </div>
      <div v-if="!$auth.isAuthenticated && confirm ">
        <span class="title is-6">Kode Konfirmasi :</span>
        <b-input
          v-model="form.code"
          type="text"
          placeholder="Kode"
          class="form-control"
        />
        <div class="mt-1">
          <span class="title is-6">New Password :</span>
          <b-input
            v-model="form.password"
            type="Password"
            placeholder="New Password"
            class="form-control"
            password-reveal
          />
        </div>
        <div class="mt-1">
          <span class="title is-6">Confirm Password :</span>
          <b-input
            v-model="form.confirm"
            type="Password"
            placeholder="Confirm New Password"
            class="form-control"
            password-reveal
          />
        </div>
        <br />
        <b-button class="is-primary mt-3" @click="getConfirm">Konfirmasi</b-button>
        <br /> 
      </div>
      <nuxt-link to="/auth/cashier" class="mt-3">Have an account? Login</nuxt-link>
      <br />
      <nuxt-link to="/auth/register" class="mt-3"
        >Need an account? Register</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email : null,
          password : null,
          confirm : null, 
          code: null,
        },
        confirm : false,
        jwt: null,
      }
    },
    async mounted () {
      try {
        const response = await this.$axios.post(`${this.$config.BASE_URL}/api/user/login`, {
          email: this.$config.ADMIN_USER,
          password: this.$config.ADMIN_PASSWORD,
        })
        this.jwt = response.data.data.jwt
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async forgot() {
        try {
          console.log(this.form);
          await this.$store.dispatch('auth/forgot', this.form)

          this.$buefy.toast.open({
            message: `Silakan Periksa Email Anda Dan Masukkan Code Verifikasinya`,
            type: 'is-success',
          })
          this.confirm = true
        } catch (error) {
          this.$buefy.toast.open({
            message: `Email TIdak Terdaftar Dalam Sistem Kami`,
            type: 'is-danger',
          })
        }
      },
      async getConfirm() {
        if (this.form.password !== this.form.confirm) {
          this.$buefy.toast.open({
            message: `Konfirmasi Password Tidak Sama`,
            type: 'is-danger',
          })
          return
        }
        try {
          await this.$store.dispatch('auth/confimForgot', this.form)

          this.$buefy.toast.open({
            message: `Password Berhasil Diganti`,
            type: 'is-success',
          })
          this.$router.push('/auth/cashier')
          try {
            await this.$axios.post(`${this.$config.BASE_URL}/api/user/changepassword`,{
              email: this.form.email,
              password: this.form.password 
            },{
              headers: {
                token : 'Bearer ' + this.jwt
              }
            })
          } catch (error1) {
            console.log(error1);
          }
        } catch (error) {
          this.$buefy.toast.open({
            message: `Kode Anda Salah`,
            type: 'is-danger',
          })
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>