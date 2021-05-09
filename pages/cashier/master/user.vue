<template>
  <div class="section">
    <div class="title is-5">Master > Absensi</div>
    <div class="box">
      <b-field label="User : ">
        <b-select placeholder="Pilih User" v-model="choosenUser" @input="getPermission">
          <option
              v-for="(user,index) in userList"
              :value="user.id"
              :key="index">
              {{ user.username }}
          </option>
        </b-select>
      </b-field>
      <div v-if="user.length > 0" class="columns">
        <div class="column is-4">
          <div class="title is-5">Master</div>

          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Tipe Pijatan </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[0].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[0].value}}
              </b-switch>              
            </div>
          </div>

          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Therapist </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[1].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[1].value}}
              </b-switch>              
            </div>
          </div>
          
          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Promo </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[2].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[2].value}}
              </b-switch>              
            </div>
          </div>

          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Tambah Member </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[3].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[3].value}}
              </b-switch>              
            </div>
          </div>

          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Edit Member </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[4].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[4].value}}
              </b-switch>              
            </div>
          </div>

          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Absensi </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[5].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[5].value}}
              </b-switch>              
            </div>
          </div>

          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">User Management </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[6].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[6].value}}
              </b-switch>              
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="title is-5">Transaksi</div>
          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Tambah Transaksi </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[7].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[7].value}}
              </b-switch>              
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Edit Transaksi </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[8].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[8].value}}
              </b-switch>              
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="title is-5">Laporan</div>

          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Laporan Harian </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[9].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[9].value}}
              </b-switch>              
            </div>
          </div>

          <div class="columns">
            <div class="column is-6">
              <div class="subtitle is-6 mt-2">Laporan Payroll </div>
            </div>
            <div class="column is-6">
              <b-switch 
                  class="ml-3"
                  v-model="user[10].value"
                  true-value="Aktif"
                  false-value="Tidak">
                  {{user[10].value}}
              </b-switch>              
            </div>
          </div>
        </div>
      </div>
      <div class="is-flex is-justify-content-center">
        <b-button class="is-success" @click="save">Simpan</b-button>
      </div>
      <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userList : null,
        userJwt : localStorage.getItem('userJwt'),
        choosenUser: null,
        isFullPage: true,
        isLoading: false,
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
            value : 'Tidak'
          },
          // 4
          {
            name : 'editMember',
            value : 'Tidak'
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
            value : 'Tidak'
          },
          // 8
          {
            name : 'editTransaction',
            value : 'Tidak'
          },
          // 9
          {
            name : 'dailyReport',
            value : 'Tidak'
          },
          // 10
          {
            name : 'payroll',
            value : 'Tidak'
          },
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init() {
        try {
          const result = await this.$axios.get(`${this.$config.BASE_URL}/api/user`,{
            headers: {
              token: this.userJwt,
            },
          })
          this.userList = result.data.data
        } catch (error) {
          this.$buefy.snackbar.open({
            message: 'Session Expired ',
            queue: false,
          })
          this.$store.dispatch('auth/logout') 
          this.$router.push('/')
        }
      },
      async save() {
        if(this.choosenUser !== null)
        {
          try {
            this.isLoading = true
            const response = await this.$axios.put(`${this.$config.BASE_URL}/api/user/permission/${this.choosenUser}`,{
              permission : this.user
            },{
              headers: {
                token: this.userJwt,
              },
            })
            if (response.status === 200)
            {
              this.$buefy.toast.open({
                message: `Data Saved Successfully`,
                type: 'is-success',
              })
              this.isLoading = false
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
        else
        {
          this.$buefy.toast.open({
            message: `Silakan Pilih User`,
            type: 'is-danger',
          })
        }
      },
      async getPermission() {
        try {
          this.isLoading = true
          const response = await this.$axios.get(`${this.$config.BASE_URL}/api/user/findone/${this.choosenUser}`,{
            headers: {
              token: this.userJwt
            }
          })
          if (response.status === 200)
          {
            if( response.data.data.permission !== undefined)
              this.user = response.data.data.permission
            this.isLoading = false
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

<style lang="scss" scoped>

</style>