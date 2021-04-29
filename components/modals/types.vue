<template>
<div class="modal-card" style="width: auto">
    <header class="modal-card-head" style="justify-content: space-between;">
      <p class="has-text-weight-bold">Tambah Tipe Pijatan</p>
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
            <b-input v-model="type.name"></b-input>
        </b-field>

        <b-field label="Harga Dasar : ">
          <b-input type="number" v-model="type.basePrice"></b-input>
        </b-field>

        <b-field label="Harga Customer : ">
          <b-input type="number" v-model="type.salePrice"></b-input>
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
      type: {
        name : null,
        basePrice : 0,
        salePrice : 0,
        user : localStorage.getItem('userId')
      },
      userJwt: localStorage.getItem('userJwt')
    }
  },
  methods: {
    async save() {
      try {
        const response = await this.$axios.post(`${this.$config.BASE_URL}/api/types`,this.type, {
          headers: {
            token: this.userJwt,
          },
        }, )  
        if(response.status === 200) {
          this.$buefy.toast.open({
            message: `Data Saved Successfully`,
            type: 'is-success',
          })
          this.$emit('typeAdded')
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