<template>
  <div class="section">
    <div class="title is-5">
      <div class="columns">
        <div class="column is-4">Transaction {{htrans.note}}</div>
        <div class="column is-4">
          <b-button v-if="permission !== null && permission.filter(p => p.name ==='editTransaction' && p.value === 'Aktif').length > 0" class="is-primary mb-2 ml-3" @click="searchTrans">              
            <b-icon
                icon="magnify"
                size="is-small"
                class="mr-2">
            </b-icon>Pencarian Transaksi
          </b-button>
        </div>
        <div class="column">
          <b-datepicker
            v-model="dateSelected"
            placeholder="Click to select..."
            icon="calendar-today"
          >
          </b-datepicker>
        </div>
      </div>
    </div>
    
    <div class="columns">
      <div class="column is-4">
        <div class="box">       
          <div class="title is-5" >Data Member</div>
          <b-field label="Kode Member : ">
            <b-input v-model="member.kode" disabled></b-input>
          </b-field>
          <b-field label="Nama Member : ">
            <b-input v-model="member.name"></b-input>
          </b-field>
          <b-field label="Alamat Member : ">
            <b-input v-model="member.address"></b-input>
          </b-field>
          <b-field label="HP Member : ">
            <b-input v-model="member.hp"></b-input>
          </b-field>
          <b-button v-if="permission !== null && permission.filter(p => p.name ==='editMember' && p.value === 'Aktif').length > 0" class="is-success mb-2 mt-3" @click="editMember">Simpan Member</b-button>
          <b-button v-if="!isFirst" class="is-primary mb-2 mt-3" @click="changeMember">Ganti Member</b-button>
        </div>
      </div>
      <div class="column">
        <members origin='1' @getMember='getMember' ref="member"/>
      </div>
    </div>
    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <b-field label="Jenis Promo : ">
            <b-select placeholder="Pilih Promo" v-model="massage.promo">
              <option
                  v-for="(promo,index) in promos"
                  :value="promo.id"
                  :key="index">
                  {{ promo.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="Therapist : ">
            <b-select placeholder="Pilih Therapist" v-model="massage.therapist">
              <option
                  v-for="(therapist,index) in therapists"
                  :value="therapist.id"
                  :key="index">
                  {{ therapist.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="Pijatan : ">
            <b-select placeholder="Pilih Pijatan" v-model="massage.type">
              <option
                  v-for="(type,index) in types"
                  :value="type.id"
                  :key="index">
                  {{ type.name }} - {{ `Rp. ${parseFloat(type.sale_price).toLocaleString('id-ID')}` }}
                                
              </option>
            </b-select>
          </b-field>            
          
          <b-button class="is-success" @click="save">Tambah</b-button>
        </div>
      </div>

      <b-table
        :data="isEmpty ? [] : dtrans"
        :bordered="isBordered"
        :striped="isStriped"
        :hoverable="isHoverable"
        :loading="isLoading"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :default-sort-direction="defaultSortDirection"
        default-sort="user.first_name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        class="mt-3"
      >
        <b-table-column field="Promo" label="Jenis Promo" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.promo.name }}
          </div>
          <div v-else>
            <b-select placeholder="Pilih Promo" v-model="editedDtrans.promo">
              <option
                  v-for="(promo,index) in promos"
                  :value="promo.id"
                  :key="index">
                  {{ promo.name }}
              </option>
            </b-select>
          </div>
        </b-table-column>

        <b-table-column field="Therapist" label="Therapist" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.therapist.name}}
          </div>
          <div v-else>
            <b-select placeholder="Pilih Therapist" v-model="editedDtrans.therapist">
              <option
                  v-for="(therapist,index) in therapists"
                  :value="therapist.id"
                  :key="index">
                  {{ therapist.name }}
              </option>
            </b-select>
          </div>
        </b-table-column>

        <b-table-column field="Massage" label="Jenis Pijatan" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.type.name }}
          </div>
          <div v-else>
            <b-select placeholder="Pilih Pijatan" v-model="editedDtrans.type">
              <option
                  v-for="(type,index) in types"
                  :value="type.id"
                  :key="index">
                  {{ type.name }} - {{ `Rp. ${parseFloat(type.sale_price).toLocaleString('id-ID')}` }}                               
              </option>
            </b-select>
          </div>
        </b-table-column>

        <b-table-column field="Price" label="Harga Pijatan" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ `Rp. ${parseFloat(props.row.type.sale_price).toLocaleString('id-ID')}` }}
          </div>
          <div v-else>
            (Harga Muncul Setelah Save)
          </div>
        </b-table-column>

        <b-table-column field="Disc" label="Potongan" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            <div v-if="props.row.promo.type">
              {{`Rp. ${parseFloat(props.row.promo.value).toLocaleString('id-ID')}`}}
            </div>
            <div v-else>
              {{ props.row.promo.value }} %
            </div>
          </div>
          <div v-else>
            (Potongan Muncul Setelah Save)
          </div>
        </b-table-column>

        <b-table-column field="After_disc" label="Subtotal" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{`Rp. ${parseFloat(props.row.subtotal).toLocaleString('id-ID')}`}}
          </div>
          <div v-else>
            (Subtotal Muncul Setelah Save)
          </div>
        </b-table-column>

        <b-table-column field="Action" label="Aksi" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            <b-button class="is-small is-info" @click="edit(props.row)">
              <b-icon
                  icon="book-edit"
                  size="is-small">
              </b-icon>
            </b-button>
            <b-button class="is-small is-danger" @click="confirmationDelete(props.row)">
              <b-icon
                  icon="delete"
                  size="is-small">
              </b-icon>
            </b-button>
          </div>
          <div v-else>
            <b-button class="is-small is-success" @click="update(props.row)">
              <b-icon
                  icon="content-save"
                  size="is-small">
              </b-icon>
            </b-button>
            <b-button class="is-small is-danger" @click="cancel(props.row)">
              <b-icon
                  icon="cancel"
                  size="is-small">
              </b-icon>
            </b-button>
          </div>
        </b-table-column>

        <template #empty>
            <div class="has-text-centered">No records</div>
        </template>
      </b-table>
      <div class="title is-5 has-text-right mt-3 mr-5">
        Total : {{`Rp. ${parseFloat(htrans.total).toLocaleString('id-ID')}`}}
      </div>
      <div class="is-flex is-justify-content-center">
        <b-button class="is-success mr-2" @click="print">Print Nota</b-button>
        <b-button class="is-primary" @click="fetchData">Transaksi Baru</b-button>
      </div>
    </div>
    <b-loading :is-full-page="isFullPage" v-model="isFullLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import Members from '@/components/members'
import SearchTransaction from '@/components/modals/searchTransaction'
export default {
  components: {
    Members,
    SearchTransaction
  },
  data() {
    return {
      dateSelected : new Date(),
      // dropdown data
      promos : {},
      therapists : {},
      types : {},
      // member data
      member : {},
      // single massage
      massage : {},
      // htrans
      htrans : {
        total : 0
      },
      // dtrans 
      dtrans : [],
      editedDtrans : {
        therapist : null,
        type : null,
        promo : null,
        user : localStorage.getItem('userId')
      },
      userJwt : localStorage.getItem('userJwt'),
      isFirst : true,
      user: localStorage.getItem('userId'),
      isEmpty : false,
      isLoading : false,
      isHoverable : true,
      isStriped : true,
      isBordered : true,
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      permission: null,
      isFullLoading: false,
      isFullPage: true,
    }
  },

  async mounted() {
    this.fetchData()
    try {
      const response = await this.$axios.get(`${this.$config.BASE_URL}/api/user/findone/${this.user}`, {
        headers : {
          token: this.userJwt
        }
      })  
      console.log(response.data.data.permission);
      if(response.status === 200) {
        this.permission = response.data.data.permission
      }
    } catch (error) {
      this.$buefy.snackbar.open({
        message: 'Session Expired ',
        queue: false,
      })
      this.$store.dispatch('auth/logout') 
      this.$router.push('/')
    }
  },

  methods: {
    newTransaction() {
      this.promos = {}
      this.therapists = {}
      this.types = {}
      this.member = {}
      this.massage = {}
      this.htrans = {
        total : 0
      }
      this.dtrans = []
      this.editedDtrans = {
        therapist : null,
        type : null,
        promo : null,
        user : localStorage.getItem('userId')
      }
      this.isFirst = true
    },

    async notePrint() {
      // const day = new Date()
      const day= this.dateSelected
      const date = day.getDate().toString().length === 1 ? '0'+ day.getDate().toString() : day.getDate()
      let getMonth = day.getMonth() + 1
      const month = getMonth.toString().length === 1 ? '0'+ getMonth.toString() : getMonth
      const generateDate = `N${date}${month}${day.getFullYear()}`
      try {
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/htrans/${generateDate}`,{
          headers: {
            token: this.userJwt,
          },
        })
        return response.data.data

      } catch (error) {
        this.isLoading = false
          this.$buefy.snackbar.open({
            message: 'Session Expired ',
            queue: false,
          })
        this.$store.dispatch('auth/logout') 
        this.$router.push('/')
      }
    },

    async fetchData() {
      this.newTransaction()
      let result = {}

      try {
          // PROMO
        result = await this.$axios.get(`${this.$config.BASE_URL}/api/promos/all`,{
          headers: {
            token: this.userJwt,
          },
        })
        this.promos = result.data.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        this.massage.promo = this.promos.filter(promo => promo.name.toUpperCase() === 'REGULAR')
          .map(promo => promo.id)
          .reduce(promo => promo)

        // THERAPIST
        result = await this.$axios.get(`${this.$config.BASE_URL}/api/therapists/all`,{
          headers: {
            token: this.userJwt,
          },
        })
        this.therapists = result.data.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

        // MASSAGE
        result = await this.$axios.get(`${this.$config.BASE_URL}/api/types/all`,{
          headers: {
            token: this.userJwt,
          },
        })
        this.types = result.data.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        this.massage.type = this.types.filter(type => type.name.toUpperCase() === 'FULL BODY 60"')
          .map(type => type.id)
          .reduce(type => type)

      } catch (error) {
        this.isLoading = false
          this.$buefy.snackbar.open({
            message: 'Session Expired lho',
            queue: false,
          })
        // this.$store.dispatch('auth/logout') 
        // this.$router.push('/')
      }
      
    },

    async fetchTrans() {
      try {
        this.isLoading = true
        const result = await this.$axios.get(`${this.$config.BASE_URL}/api/dtrans/${this.massage.note}`,{
          headers : {
            token : this.userJwt
          }
        })
        if(result.status === 200) 
        {
          this.isLoading = false
          if(result.data.data.length === 0) this.isEmpty = true
          this.dtrans = []
          for (let index = 0; index < result.data.data.length; index++) {
            let singleTrans = {...result.data.data[index], ...{isModified : false}}
            if(result.data.data[index].promo.type) {
              const subtotal = result.data.data[index].type.sale_price - result.data.data[index].promo.value
              singleTrans = {...singleTrans, ...{subtotal}}
            }
            else {
              const subtotal = result.data.data[index].type.sale_price * (100 - result.data.data[index].promo.value) / 100
              singleTrans = {...singleTrans, ...{subtotal}}
            }
            this.dtrans.push(singleTrans)
            this.htrans.total = this.dtrans.reduce((prev,current) => prev + current.subtotal, 0) 
          }
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
      
    },

    validationForm() {
      if (this.member.kode === null || this.member.kode === undefined)
      {
        this.$buefy.toast.open({
          message: `Tolong Isi Data Member`,
          type: 'is-danger',
        })
        return false
      }
      if (this.massage.therapist === null || this.massage.therapist === '' || this.massage.therapist === undefined)
      {
        this.$buefy.toast.open({
          message: `Tolong Isi Therapist`,
          type: 'is-danger',
        })
        return false
      }
      return true
    },

    async save() {
      if (this.validationForm())
      {
        try {
          if (this.isFirst) {
            this.isFullLoading = true
            this.htrans.note = await this.notePrint()
            this.htrans.member = this.member.id
            this.htrans.name = this.member.name
            this.htrans.user = this.user
            // this.htrans.date = new Date()
            // const dateSelected = this.dateSelected
            // dateSelected.setDate(dateSelected.getDate() + 1)
            this.htrans.date = this.dateSelected
            const resHTrans = await this.$axios.post(`${this.$config.BASE_URL}/api/htrans`,this.htrans,{
              headers : {
                token : this.userJwt
              }
            })
            if (resHTrans.status === 200){
              this.isFirst = false
              this.massage.note = resHTrans.data.data.id
              const resDTrans = await this.$axios.post(`${this.$config.BASE_URL}/api/dtrans`, {
                h_transaction : this.massage.note,
                therapist : this.massage.therapist,
                type : this.massage.type,
                promo : this.massage.promo,
                user : this.user
              }, {
                headers : {
                  token : this.userJwt
                }
              })
              if (resDTrans.status === 200) {
                this.fetchTrans()
                this.isFullLoading = false
              }
              else this.isFullLoading = false
            }
            else this.isFullLoading = false
          }
          else {
            this.isFullLoading = true
            const resDTrans = await this.$axios.post(`${this.$config.BASE_URL}/api/dtrans`, {
              h_transaction : this.massage.note,
              therapist : this.massage.therapist,
              type : this.massage.type,
              promo : this.massage.promo,
              user : this.user
            }, {
              headers : {
                token : this.userJwt
              }
            })
            if (resDTrans.status === 200) {
              this.fetchTrans()
              this.isFullLoading = false
            }
          }
        } catch (error) {
            this.isFullLoading = false
            this.$buefy.snackbar.open({
              message: 'Session Expired ',
              queue: false,
            })
            this.$store.dispatch('auth/logout') 
            this.$router.push('/')
        }

      }
    },

    edit(row) {
      this.dtrans.forEach(el => {
        el.isModified = false
      })
      this.editedDtrans.therapist  = row.therapist.id
      this.editedDtrans.type = row.type.id
      this.editedDtrans.promo = row.promo.id
      row.isModified = true
    },

    cancel(row) {
      row.isModified = false
    },

    async update(row) {
      try {
        const response = await this.$axios.put(`${this.$config.BASE_URL}/api/dtrans/${row.id}`,this.editedDtrans, {
          headers: {
            token: this.userJwt,
          },
        }, )  
        if(response.status === 200) {
          this.$buefy.toast.open({
            message: `Data Saved Successfully`,
            type: 'is-success',
          })
          row.isModified = false
          this.fetchTrans()
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
    },

    confirmationDelete(row) {
      this.$buefy.dialog.confirm({  
        title: 'Deleting account',
        message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.delete(row)
      })
    },

    async delete(row) {
      try {
        const response = await this.$axios.delete(`${this.$config.BASE_URL}/api/dtrans/${row.id}`,{
          headers: {
            token: this.userJwt,
          },
        }, )  
        if(response.status === 200) {
          this.$buefy.toast.open({
            message: `Data Deleted Successfully`,
            type: 'is-danger',
          })
          row.isModified = false
          this.fetchTrans()
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
    },

    getMember(data) {
      this.member = {
        id : data.id,
        kode : data.kode,
        name : data.name,
        address : data.address,
        hp : data.hp,
        user : this.user
      }
    },

    async editMember() {
      try {
        const response = await this.$axios.put(`${this.$config.BASE_URL}/api/members/${this.member.id}`,this.member, {
          headers: {
            token: this.userJwt,
          },
        }, )  
        if(response.status === 200) {
          this.$buefy.toast.open({
            message: `Data Saved Successfully`,
            type: 'is-success',
          })
          this.$refs.member.fetchData()
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
    },

    searchTrans() {
      this.$buefy.modal.open({
        parent: this,
        component: SearchTransaction,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        width: 1080,
        events: {
          'transactionUpdate': (data) => this.transactionUpdate(data)
        }
      })
    },

    transactionUpdate(data) {
      this.fetchData()
      console.log(data);
      this.member = data.member
      this.massage.note = data.id
      this.htrans.note = data.note
      this.fetchTrans()
      this.isFirst = false
    },

    async changeMember() {
      try {
        this.htrans.member = this.member.id
        this.htrans.name = this.member.name
        this.htrans.user = this.user
        const response = await this.$axios.put(`${this.$config.BASE_URL}/api/htrans/${this.massage.note}`,this.htrans, {
          headers: {
            token: this.userJwt,
          },
        }, ) 
        if(response.status === 200) {
          this.$buefy.toast.open({
            message: `Data Saved Successfully`,
            type: 'is-success',
          })
        }
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Session Expired ',
          queue: false,
        })
        this.$store.dispatch('auth/logout')  
        this.$router.push('/')
      }
    },

    print() {
      window.open(`/cashier/report/${this.massage.note}`)
    }
  },

}
</script>

<style>

</style>