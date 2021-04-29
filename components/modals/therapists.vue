<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head" style="justify-content: space-between;">
      <p class="has-text-weight-bold">Tambah Therapist</p>
      <b-button class="is-success is-small" @click="$emit('close')">
        <b-icon
          icon="close"
          size="is-small"
        >
        </b-icon>
      </b-button>
    </header>
    <section class="modal-card-body">
        <b-field label="Nama : ">
            <b-input v-model="therapist.name"></b-input>
        </b-field>

        <b-field label="Komisi : ">
          <b-input type="number" v-model="therapist.comission"></b-input>
        </b-field>

        <b-field label="Absensi : ">
          <b-input type="number" v-model="therapist.absensi"></b-input>
        </b-field>
      
    </section>
    <footer class="modal-card-foot is-justify-content-center">
        <b-button type="is-success" @click="save">Simpan</b-button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      therapist: {
        name : null,
        comission : 0,
        absensi : 0,
        user : localStorage.getItem('userId')
      },
      userJwt: localStorage.getItem('userJwt')
    }
  },
  methods: {
    async save() {
      try {
        const response = await this.$axios.post(`${this.$config.BASE_URL}/api/therapists`,this.therapist, {
          headers: {
            token: this.userJwt,
          },
        }, )  
        if(response.status === 200) {
          this.$buefy.toast.open({
            message: `Data Saved Successfully`,
            type: 'is-success',
          })
          this.$emit('therapistAdded')
          this.$parent.close()
        }
      } catch (error) {
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Session Expired ',
          queue: false,
        })
        this.$store.dispatch('auth/logout') 
        this.$router.push('/')
      }
    }
  },

}
</script>

<style>

</style>