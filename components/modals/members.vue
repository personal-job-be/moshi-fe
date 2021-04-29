<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head" style="justify-content: space-between;">
      <p class="has-text-weight-bold">Tambah Member</p>
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
            <b-input v-model="member.name"></b-input>
        </b-field>
        
        <b-field label="Alamat : ">
            <b-input v-model="member.address"></b-input>
        </b-field>

        <b-field label="HP : ">
            <b-input v-model="member.hp"></b-input>
        </b-field>

        <b-field label="Jenis Kelamin : ">
          <b-select placeholder="Pilih Jenis Kelamin" v-model="member.gender">
            <option
                v-for="(gender,index) in genders"
                :value="gender.value"
                :key="index">
                {{ gender.title }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Komentar : ">
          <b-input maxlength="200" type="textarea" v-model="member.comment"></b-input>
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
      userJwt: localStorage.getItem('userJwt'),
      member: {
        name : null,
        address : null,
        gender : null,
        hp : null,
        comment : null,
        code : null,
        initial : null,
        user : localStorage.getItem('userId')
      },
      genders : [{title : 'Pria', value : true}, {title : 'Wanita', value : false}]
    }
  },
  methods: {
    async save() {
      if(this.member.gender === null) {
        this.$buefy.snackbar.open({
          message: 'Pilih Gender',
          queue: false,
        })
      }
      else {
        this.member.code = await this.createCode()
        try {
          const response = await this.$axios.post(`${this.$config.BASE_URL}/api/members`,this.member, {
            headers: {
              token: this.userJwt,
            },
        }, )  
          if(response.status === 200) {
            this.$buefy.toast.open({
              message: `Data Saved Successfully`,
              type: 'is-success',
            })
            this.$emit('memberAdded')
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

    async createCode(){
      this.member.initial = this.member.name.substring(0,1).toUpperCase()
      try {
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/members/initial/${this.member.initial}`, {
          headers: {
            token: this.userJwt,
          },
        }, )  
        if(response.status === 200) {
          return response.data.data
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