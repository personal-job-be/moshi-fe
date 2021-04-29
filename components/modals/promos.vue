<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head" style="justify-content: space-between;">
      <p class="has-text-weight-bold">Tambah Promo</p>
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
            <b-input v-model="promo.name"></b-input>
        </b-field>

        <b-field label="Tipe : ">
          <b-select placeholder="Pilih Tipe" v-model="promo.type">
            <option
                v-for="(type,index) in types"
                :value="type.value"
                :key="index">
                {{ type.title }}
            </option>
          </b-select>
        </b-field>

        <b-field label="nilai : ">
          <b-input type="number" v-model="promo.value"></b-input>
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
      promo: {
        name : null,
        type : null,
        value : 0,
        user : localStorage.getItem('userId')
      },
      userJwt: localStorage.getItem('userJwt'),
      types : [{title : 'Rp.', value : true}, {title : '%', value : false}]
    }
  },
  methods: {
    async save() {
      if(this.promo.type === null) {
        this.$buefy.snackbar.open({
          message: 'Pilih Tipe Promo',
          queue: false,
        })
      }
      else {
        try {
          const response = await this.$axios.post(`${this.$config.BASE_URL}/api/promos`,this.promo, {
            headers: {
              token: this.userJwt,
            },
          }, )  
          if(response.status === 200) {
            this.$buefy.toast.open({
              message: `Data Saved Successfully`,
              type: 'is-success',
            })
            this.$emit('promoAdded')
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
    }
  },
}
</script>

<style>

</style>