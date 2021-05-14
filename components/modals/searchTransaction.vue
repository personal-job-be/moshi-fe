<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head" style="justify-content: space-between;">
      <p class="has-text-weight-bold">Pencarian Transaksi</p>
      <b-button class="is-success is-small" @click="$emit('close')">
        <b-icon
          icon="close"
          size="is-small"
        >
        </b-icon>
      </b-button>
    </header>
    <section class="modal-card-body">
      <div class="columns">
        <div class="column is-10">
          <b-datepicker
              v-model="dateSelected"
              placeholder="Click to select..."
              icon="calendar-today"
              @input="changeCalendar"
              trap-focus>
          </b-datepicker>
        </div>
        <div class="column">
          <b-button class="is-primary" @click="search">        
            <b-icon
                icon="magnify"
                size="is-small"
            >
            </b-icon>
          </b-button>
        </div>
      </div>

      <b-table
        :data="isEmpty ? [] : trans"
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
        @dblclick="getTransaction($event)"
        style="cursor: pointer;"
      >
        <b-table-column field="Note" label="Nota" width="40" v-slot="props">
          {{props.row.note}}
        </b-table-column>

        <b-table-column field="Name" label="Nama" width="40" v-slot="props">
          {{props.row.name}}
        </b-table-column>

        <template #empty>
            <div class="has-text-centered">No records</div>
        </template>

        </b-table>
      
    </section>
    <footer class="modal-card-foot is-justify-content-center">
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateSelected: new Date(),
      userJwt : localStorage.getItem('userJwt'),
      trans : [],
      isEmpty : false,
      isLoading : false,
      isHoverable : true,
      isStriped : true,
      isBordered : true,
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
    }
  },
  methods: {
    async search() {
      try {
        this.isLoading = true
        const date = this.dateSelected.getDate().toString().length === 1 ? 
            '0'+ this.dateSelected.getDate().toString() 
            : this.dateSelected.getDate()

        let getMonth = this.dateSelected.getMonth() + 1
        const month = getMonth.toString().length === 1 ? '0'+ getMonth.toString() : getMonth      

        const onlyDate = `${this.dateSelected.getFullYear()}-${month}-${date}`
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/htrans/date/${onlyDate}`,{
          headers : {
            token : this.userJwt
          }
        })
        this.isLoading = false
        this.trans = response.data.data.filter(htrans => htrans.d_transactions.length > 0)
        if (this.trans.length > 0) this.isEmpty = false
        else this.isEmpty = true
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
    getTransaction(event) {
      this.$emit('transactionUpdate', event)
      this.$emit('close')
    },
    changeCalendar() {
      this.trans = []
    }
  },
}
</script>

<style>

</style>