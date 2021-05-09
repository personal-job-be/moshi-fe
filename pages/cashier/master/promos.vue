<template>
  <div class="section">
    <div class="title is-5">Master > Promo</div>
    <div class="box">
      <b-table
        :data="isEmpty ? [] : promos"
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
            <b-input type="text" v-model="editedPromo.name"></b-input>
          </div>
        </b-table-column>

        <b-table-column field="Type" label="Tipe" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            <div v-if="props.row.type">
              Rp.
            </div>
            <div v-else>
              %
            </div>
          </div>
          <div v-else>
            <b-select placeholder="Pilih Tipe" v-model="editedPromo.type">
              <option
                  v-for="(type,index) in types"
                  :value="type.value"
                  :key="index">
                  {{ type.title }}
              </option>
            </b-select>
          </div>
        </b-table-column>


        <b-table-column field="Value" label="NIlai" width="40" v-slot="props">
          <div v-if="!props.row.isModified">
            {{ props.row.value }}
          </div>
          <div v-else>
            <b-input type="number" v-model="editedPromo.value"></b-input>
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
            <b-switch v-model="editedPromo.isValid"></b-switch>
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

      <b-button class="is-success mt-2" @click="addPromo">Tambah</b-button>
    </div>
  </div>
</template>

<script>
import Promos from '@/components/modals/promos'
export default {
  components: {
    Promos,
  },
  mounted () {
    this.fetchData();
  },
  data() {
    return {
      userJwt: localStorage.getItem('userJwt'),
      promos: [],
      isEmpty : false,
      isLoading : false,
      isHoverable : true,
      isStriped : true,
      isBordered : true,
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      editedPromo : {
        name : null,
        type : null,
        value : 0,
        isValid : true,
        user : localStorage.getItem('userId')
      },
      types : [{title : 'Rp.', value : true}, {title : '%', value : false}]
    }
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/promos/all`, {
            headers: {
              token: this.userJwt,
            },
          })

        if(response.status === 200){
          this.isLoading = false
          if(response.data.data.length === 0) this.isEmpty = true
          else this.isEmpty = false
          this.promos = []
          for (let index = 0; index < response.data.data.length; index++) {
            const singlePromo = {...response.data.data[index], ...{isModified : false}}
            this.promos.push(singlePromo)            
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

    addPromo() {
      this.$buefy.modal.open({
        parent: this,
        component: Promos,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        width: 1080,
        events: {
          'promoAdded': async () => await this.fetchData()
        }
      })
    },

    edit(row) {
      this.promos.forEach(el => {
        el.isModified = false
      })
      this.editedPromo.name = row.name
      this.editedPromo.type = row.type
      this.editedPromo.value = row.value
      this.editedPromo.isValid = row.isvalid
      row.isModified = true
    },

    cancel(row) {
      row.isModified = false
    },

    async save(row) {
      try {
        const response = await this.$axios.put(`${this.$config.BASE_URL}/api/promos/${row.id}`,this.editedPromo, {
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
        const response = await this.$axios.put(`${this.$config.BASE_URL}/api/promos/delete/${row.id}`,{}, {
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