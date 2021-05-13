<template>
  <div class="section">
    <div class="title is-5">Laporan > Harian</div>
    <div class="box">
      <div class="columns">
        <div class="column is-6">
          <div class="columns">

            <div class="column is-10">
              <b-datepicker
                  v-model="dateSelected"
                  placeholder="Click to select..."
                  icon="calendar-today"
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
              <!-- <b-button class="is-primary" @click="print">        
                print
              </b-button> -->
            </div>
          </div>
        </div>
      </div>
      <b-table
        :data="isEmpty ? [] : transactions"
        :bordered="isBordered"
        :striped="isStriped"
        :hoverable="isHoverable"
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
        <b-table-column field="Note" label="Nota" width="40" v-slot="props">
          {{ props.row.note }}
        </b-table-column>

        <b-table-column field="Name" label="Nama" width="40" v-slot="props">
          {{ props.row.member.name }}
        </b-table-column>

        <b-table-column field="Subtotal" label="Subtotal" width="40" v-slot="props">
          {{ `Rp. ${parseFloat(props.row.total).toLocaleString('id-ID')}` }}
        </b-table-column>

        <b-table-column field="View" label="Lihat Detail" width="40" v-slot="props">
          <b-button class="is-small is-info" @click="detail(props.row)">
            <b-icon
                icon="card-search"
                size="is-small">
            </b-icon>
          </b-button>
        </b-table-column>

        <template #empty>
            <div class="has-text-centered">No records</div>
        </template>
      </b-table>
      <div class="is-flex is-justify-content-end">
        <div class="title is-3">
          {{ `Rp. ${parseFloat(grandTotal).toLocaleString('id-ID')}` }}
        </div>
      </div>
      <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>
    </div>
  </div>
</template>

<script>
import DetailNote from '@/components/detailNote'

export default {
  data() {
    return {
      dateSelected : new Date(),
      isFullPage: true,
      userJwt : localStorage.getItem('userJwt'),
      isLoading: false,
      transactions : [],
      isEmpty : false,
      isLoading : false,
      isHoverable : true,
      isStriped : true,
      isBordered : true,
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      grandTotal : 0,
    }
  },
  methods: {
    async search() {
      try {
        this.grandTotal = 0
        this.isLoading = true
        this.transactions = []
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

        console.log(this.transactions);
        // Data Arrangement
        for(let i=0; i<response.data.data.length; i++) {
          const singleTrans = {}
          const htrans = response.data.data[i]
          singleTrans.member = htrans.member
          singleTrans.note = htrans.note
          singleTrans.detail = []
          const dtrans = await this.$axios.get(`${this.$config.BASE_URL}/api/dtrans/${htrans.id}`,{
            headers : {
              token : this.userJwt
            }
          })
          if(dtrans.status === 200)
          {
            singleTrans.detail = dtrans.data.data
            const total = singleTrans.detail.map(detail=> {
              if (detail.promo.type) {
                return detail.type.sale_price - detail.promo.value
              }
              else {
                return detail.type.sale_price * (100 - detail.promo.value) / 100
              }
            }).reduce((prev,current) => prev + current)
            singleTrans = {...singleTrans, ...{total}}
            this.grandTotal += total
          }
          this.transactions.push(singleTrans)
          console.log(this.transactions);
        }
        this.isLoading = false
      } catch (error) {
          // this.isLoading = false
          // this.$buefy.snackbar.open({
          //   message: 'Session Expired ',
          //   queue: false,
          // })
          // this.$store.dispatch('auth/logout') 
          // this.$router.push('/')
      }
    },
    detail(htrans) {
      this.$buefy.modal.open({
        parent: this,
        component: DetailNote,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        width: 1080,
        props: {
          transaction: htrans,
        },
        events: {
          'promoAdded': () => this.fetchData()
        }
      })
    },
    print(){
      window.open('/cashier/report/note', '_blank').focus();
      // this.$router.push()
    }
  },
}
</script>

<style>
.card-header-title {
  border : 2px solid black
}
</style>