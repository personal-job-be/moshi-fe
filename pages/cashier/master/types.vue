<template>
  <div class="section">
    <div class="title is-5">Master > Tipe Pijatan</div>
    <div class="box">
      <b-table
        :data="isEmpty ? [] : types"
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
      >
        <b-table-column field="Name" label="Nama" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.name }}
          </div>
          <div v-else>
            <b-input type="text" v-model="editedTypes.name"></b-input>
          </div>
        </b-table-column>

        <b-table-column field="Base_Price" label="Harga Dasar" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.base_price }}
          </div>
          <div v-else>
            <b-input type="number" v-model="editedTypes.basePrice"></b-input>
          </div>
        </b-table-column>

        <b-table-column field="Sale_Price" label="Harga Jual" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.sale_price }}
          </div>
          <div v-else>
            <b-input type="number" v-model="editedTypes.salePrice"></b-input>
          </div>
        </b-table-column>

        <b-table-column field="Valid" label="Berlaku" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            <div v-if="props.row.isvalid">
              <b-icon
                icon="check-bold"
                size="is-small"
                type="is-success">
              </b-icon>
            </div>
            <div v-else>
              <b-icon
                icon="close-box"
                size="is-small"
                type="is-danger">
              </b-icon>
            </div>
          </div>
          <div v-else>
            <b-switch v-model="editedTypes.isValid"></b-switch>
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

      <b-button class="is-success mt-2" @click="addTypes">Tambah</b-button>
    </div>
  </div>
</template>

<script>
import Types from '@/components/modals/types'
export default {
  components: {
    Types,
  },
  data() {
    return {
      userJwt: localStorage.getItem('userJwt'),
      types : [],
      editedTypes : {
        name : null,
        basePrice : 0,
        salePrice : 0,
        isValid : true,
        user : localStorage.getItem('userId')
      },
      isEmpty : false,
      isLoading : false,
      isHoverable : true,
      isStriped : true,
      isBordered : true,
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10
    }
  },
  async mounted () {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      try {
        this.isLoading = true
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/types/all`, {
            headers: {
              token: this.userJwt,
            },
          })

        if(response.status === 200){
          this.isLoading = false
          if(response.data.data.length === 0) this.isEmpty = true
          else this.isEmpty = false
          this.types = []
          for (let index = 0; index < response.data.data.length; index++) {
            const singleType = {...response.data.data[index], ...{isModified : false}}
            this.types.push(singleType)            
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

    addTypes() {
      this.$buefy.modal.open({
        parent: this,
        component: Types,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        width: 1080,
        events: {
          'typeAdded': async () => await this.fetchData()
        }
      })
    },

    edit(row) {
      this.types.forEach(el => {
        el.isModified = false
      })
      this.editedTypes.name = row.name
      this.editedTypes.basePrice = row.base_price
      this.editedTypes.salePrice = row.sale_price
      this.editedTypes.isValid = row.isvalid
      row.isModified = true
    },

    cancel(row) {
      row.isModified = false
    },

    async save(row) {
      try {
        const response = await this.$axios.put(`${this.$config.BASE_URL}/api/types/${row.id}`,this.editedTypes, {
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
        this.isLoading = true
        const response = await this.$axios.put(`${this.$config.BASE_URL}/api/types/delete/${row.id}`,{}, {
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
          this.isLoading = false
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
    }
  },

}
</script>

<style>

</style>