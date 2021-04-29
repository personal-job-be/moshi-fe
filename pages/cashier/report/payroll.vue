<template>
  <div class="section">
    <div class="title is-5">Laporan > Gaji / Komisi</div>
    <div class="box">
      <div class="column is-10">
        <div class="columns">
          <div class="column is-3">
            <b-datepicker
                v-model="start"
                placeholder="Click to select..."
                icon="calendar-today"
                trap-focus>
            </b-datepicker>
          </div>
          <div class="column is-3">
          <b-datepicker
              v-model="end"
              placeholder="Click to select..."
              icon="calendar-today"
              trap-focus>
          </b-datepicker>
          </div>
          <div class="column is-3">
            <b-select placeholder="Pilih Therapist" v-model="selectedTherapist" expanded>
              <option
                  v-for="(therapist,index) in therapists"
                  :value="therapist.id"
                  :key="index">
                  {{ therapist.name }}
              </option>
            </b-select>
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
      </div>

      <div v-for="(transaction,index) in transPerPage" :key="index">
        <b-collapse
          aria-id="contentIdForA11y2"
          class="panel mb-3"
          animation="slide"
          v-model="isOpen">
            <template #trigger>
              <div
                  class="panel-heading"
                  role="button"
                  aria-controls="contentIdForA11y2">
                  <strong>{{ transaction.htrans.note }} {{ transaction.htrans.member.name }}</strong>
                  <div class="title is-5 is-pulled-right">{{`Rp. ${parseFloat(transaction.commission).toLocaleString('id-ID')}`}}</div>
              </div>
            </template>
                
            <div class="card-content">
              <b-table
                :data="isEmpty ? [] : transaction.detail"
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
                <b-table-column field="Promo" label="Jenis Promo" width="40" v-slot="props">
                  {{ props.row.promo.name }}
                </b-table-column>
                <b-table-column field="Massage" label="Jenis Pijatan" width="40" v-slot="props">
                  {{ props.row.type.name }}
                </b-table-column>
                <b-table-column field="Price" label="Harga" width="40" v-slot="props">
                  {{ `Rp. ${parseFloat(props.row.type.sale_price).toLocaleString('id-ID')}`}}
                </b-table-column>

                <b-table-column field="Disc" label="Potongan" width="40" v-slot="props">
                  <div v-if="props.row.promo.type">
                    {{`Rp. ${parseFloat(props.row.promo.value).toLocaleString('id-ID')}`}}
                  </div>
                  <div v-else>
                    {{ props.row.promo.value }} %
                  </div>
                </b-table-column>

                <b-table-column field="Disc" label="Subtotal" width="40" v-slot="props">
                  <div v-if="props.row.promo.type">
                    {{`Rp. ${parseFloat(props.row.type.sale_price - props.row.promo.value).toLocaleString('id-ID')}`}}
                  </div>
                  <div v-else>
                    {{ `Rp. ${parseFloat(props.row.type.sale_price * (100 - props.row.promo.value) / 100).toLocaleString('id-ID')}` }} 
                  </div>
                </b-table-column>

                <b-table-column field="Base" label="Harga Dasar" width="40" v-slot="props">
                    {{`Rp. ${parseFloat(props.row.type.base_price).toLocaleString('id-ID')}`}}
                </b-table-column>

                <b-table-column field="Commission" label="Komisi" width="40" v-slot="props">
                    {{`Rp. ${parseFloat(props.row.type.base_price * props.row.therapist.comission / 100).toLocaleString('id-ID')}`}}
                </b-table-column>
                <template #empty>
                    <div class="has-text-centered">No records</div>
                </template>
              </b-table>
            </div>
        </b-collapse>
      </div>

      <div v-if="current === Math.ceil(total/dataPerPage)">
        <div class="columns">
          <div class="column is-10">
            <div class="columns is-multiline">
              <div v-for="(data,index) in (parseInt(endDate) - parseInt(startDate) + 1)" :key="index" class="column is-2">
                {{parseInt(index) + parseInt(startDate)}} : 
                <b-switch v-model="isSwitchedCustom[index + parseInt(startDate) - 1]"
                    true-value="Masuk"
                    false-value="Tidak">
                    {{ isSwitchedCustom[index  + parseInt(startDate) - 1] }}
                </b-switch>
              </div>

            </div>
          </div>
          <div class="column">
            <div class="title is-6">Total Komisi : {{`Rp. ${parseFloat(totalCommission).toLocaleString('id-ID')}`}}</div>
            <div class="title is-6">Total Absensi : {{`Rp. ${parseFloat(absencePayment).toLocaleString('id-ID')}`}}</div>
            <hr>
            <div class="title is-6">Total : {{`Rp. ${parseFloat(absencePayment + totalCommission).toLocaleString('id-ID')}`}}</div>
          </div>
        </div>
      </div>

      <b-pagination
        :total="total"
        v-model="current"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :order="order"
        :size="size"
        :simple="isSimple"
        :rounded="isRounded"
        :per-page="dataPerPage"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        class="mt-3"
        @change="paginatedItems">
      </b-pagination>
    </div>
    <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start: new Date(),
      end: new Date(),
      startDate : null,
      endDate : null,
      userJwt : localStorage.getItem('userJwt'),
      isLoading: false,
      therapists: [],
      selectedTherapist : null,
      transactions: null,
      transPerPage: null,
      isEmpty : false,
      isHoverable : true,
      isStriped : true,
      isBordered : true,
      isPaginated: true,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      loading : false,
      isOpen: true,

      total: 0,
      current: 1,
      dataPerPage: 6,
      rangeBefore: 3,
      rangeAfter: 1,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',

      absencePayment : 0,
      totalCommission : 0,
      isSwitchedCustom: [],
    }
  },
  async mounted () {
    try {
      const response = await this.$axios.get(`${this.$config.BASE_URL}/api/therapists/all`,{
        headers : {
          token : this.userJwt
        }
      })
      if(response.status === 200)
        this.therapists = response.data.data
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
  methods: {
    async search() {
      this.transactions = []
      this.transPerPage = []
      this.total = 0
      if(this.start.getMonth() !== this.end.getMonth())
      {
        this.$buefy.toast.open({
          message: `Harus Di Bulan Yang Sama`,
          type: 'is-danger',
        })
        return
      }
      if(this.selectedTherapist === null)
      {
        this.$buefy.toast.open({
          message: `Pilih Therapist`,
          type: 'is-danger',
        })
        return
      }
      
      try {
        this.isLoading = true
        
        // date start
        const dateStart = this.start.getDate().toString().length === 1 ? 
            '0'+ this.start.getDate().toString() 
            : this.start.getDate()
        this.startDate = dateStart
        let getMonth = this.start.getMonth() + 1
        const monthStart = getMonth.toString().length === 1 ? '0'+ getMonth.toString() : getMonth      

        const onlyDateStart = `${this.start.getFullYear()}-${monthStart}-${dateStart}`

        // date end
        const dateEnd = this.end.getDate().toString().length === 1 ? 
            '0'+ this.end.getDate().toString() 
            : this.end.getDate()
        this.endDate = dateEnd
        getMonth = this.end.getMonth() + 1
        const monthEnd = getMonth.toString().length === 1 ? '0'+ getMonth.toString() : getMonth      

        const onlyDateEnd = `${this.end.getFullYear()}-${monthEnd}-${dateEnd}`

        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/htrans/salary/${onlyDateStart}/${onlyDateEnd}`,{
          headers : {
            therapist : this.selectedTherapist,
            token : this.userJwt
          }
        })

        this.transactions = response.data.data
        this.total = this.transactions.length
        this.isEmpty = false
        this.paginatedItems()
        if(this.total > 0)
          this.totalCommission = this.transactions.reduce((prev,{commission}) =>  prev + parseInt(commission),0)
        else this.totalCommission = 0

        // absensi
        const dayOfMonth = new Date(this.start.getFullYear(), monthStart, 0).getDate()
        for (let index = 0; index < dayOfMonth; index++) 
          this.isSwitchedCustom[index] = "Tidak"
        this.absencePayment = 0

        const responseAbs = await this.$axios.get(`${this.$config.BASE_URL}/api/absence/${monthStart}/${this.start.getFullYear()}`,{
          headers : {
            therapist : this.selectedTherapist,
            token : this.userJwt
          }
        })
        if(responseAbs.status === 200) 
        {
          if(responseAbs.data.data.length > 0) 
          {
            const absence = responseAbs.data.data.reduce(abs => abs)
            const attendence = absence.attendance.filter((att,index) => {
              if((index+1) >= parseInt(dateStart) && (index+1) <= parseInt(dateEnd) && att === '1')
                return '1'
            })
            this.isSwitchedCustom = absence.attendance.map(abs => abs === "0" ? "Tidak" : "Masuk")
            this.absencePayment = parseInt(absence.therapist.absensi) * attendence.length
          }
        } 
        this.isLoading = false
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

    paginatedItems() {
      let page_number = this.current-1
      this.transPerPage =  this.transactions.slice(page_number * this.dataPerPage, (page_number + 1) * this.dataPerPage);        
    },
  },
}
</script>

<style>
.card-header-title {
  border : 1px solid black
}
</style>