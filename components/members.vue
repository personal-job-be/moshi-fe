<template>
  <div>
    <div v-if="origin!=='1'" class="title is-5">Master > Member</div>
      <div class="box" >
        <div v-if="origin==='1'" class="title is-5" >Pencarian Member</div>
        <b-input type="text" v-model="keySearch" @keyup.native.enter="fetchData" class="mb-3"></b-input>
        <b-table
        :data="isEmpty ? [] : members"
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
        @dblclick="getMember($event)"
        style="cursor: pointer;"
      >
        <b-table-column field="Name" label="Nama" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.name }}
          </div>
          <div v-else>
            <b-input type="text" v-model="editedMember.name"></b-input>
          </div>
        </b-table-column>

        <b-table-column field="Address" label="Alamat" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.address }}
          </div>
          <div v-else>
            <b-input type="text" v-model="editedMember.address"></b-input>
          </div>
        </b-table-column>

        <b-table-column field="HP" label="HP" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.hp }}
          </div>
          <div v-else>
            <b-input type="text" v-model="editedMember.hp"></b-input>
          </div>
        </b-table-column>

        <b-table-column field="Gender" label="Jenis Kelamin" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.gender === true ? "Pria" : "Wanita" }}
          </div>
          <div v-else>
            <b-select placeholder="Pilih Jenis Kelamin" v-model="editedMember.gender">
              <option
                  v-for="(gender,index) in genders"
                  :value="gender.value"
                  :key="index">
                  {{ gender.title }}
              </option>
            </b-select>
          </div>
        </b-table-column>

        <b-table-column field="Comment" label="Komentar" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.comment }}
          </div>
          <div v-else>
            <b-input maxlength="200" type="textarea" v-model="editedMember.comment"></b-input>
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
          </div>
          <div v-else>
            <b-button class="is-small is-success" @click="save(props.row)">
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
        <b-button v-if="origin === '1'" class="is-success mt-2" @click="addMember">Tambah Member</b-button>
        <b-button v-else class="is-success mt-2" @click="addMember">Tambah</b-button>
      </div>
  </div>
</template>

<script>
import Members from '@/components/modals/members'
export default {
  components: {
    Members,
  },
  props: {
    origin: {
      type: String,
      default: '0'
    },
  },
  data() {
    return {
      keySearch: null,
      userJwt: localStorage.getItem('userJwt'),
      members: [],
      isEmpty : false,
      isLoading : false,
      isHoverable : true,
      isStriped : true,
      isBordered : true,
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: this.origin ==='1' ? 4 : 10,
      editedMember : {
        name : null,
        address : null,
        hp : null,
        gender : true,
        comment : null,
        user : localStorage.getItem('userId')
      },
      genders : [{title : 'Pria', value : true}, {title : 'Wanita', value : false}]
    }
  },
  methods: {
    addMember() {
      this.$buefy.modal.open({
        parent: this,
        component: Members,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        width: 1080,
        events: {
          'memberAdded': async () => await this.fetchData()
        }
      })
    },

    async fetchData()
    {
      try {
        this.isLoading = true
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/members/search/${this.keySearch}`, {
          headers: {
            token: this.userJwt,
          },
        })

        
        if(response.status === 200){
          this.isLoading = false
          if(response.data.data.length === 0) this.isEmpty = true
          else this.isEmpty = false
          this.members = []
          for (let index = 0; index < response.data.data.length; index++) {
            const singleMember = {...response.data.data[index], ...{isModified : false}}
            this.members.push(singleMember)            
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

    edit(row) {
      this.members.forEach(el => {
        el.isModified = false
      })
      this.editedMember.name = row.name
      this.editedMember.address = row.address
      this.editedMember.hp = row.hp
      this.editedMember.gender = row.gender
      this.editedMember.comment = row.comment
      row.isModified = true
    },

    cancel(row) {
      row.isModified = false
    },

    async save(row) {
      try {
        const response = await this.$axios.put(`${this.$config.BASE_URL}/api/members/${row.id}`,this.editedMember, {
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
          this.fetchData()
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

    getMember(event) {
      if(this.origin === '1')
        this.$emit('getMember',event)
    }

  },

}
</script>

<style>

</style>