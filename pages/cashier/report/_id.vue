<template>
  <div class="noteprint p-2">
    
    <div class="is-flex is-justify-content-center">
      <p class="title is-4">
        Moshi-Moshi
      </p> 
    </div>
    <div class="is-flex is-justify-content-center">
      <p class="title is-7">
        Family Massage & Reflexology
      </p> 
    </div>
    <div class="is-flex is-justify-content-center">
      <p class="subtitle is-7">
        Jl. Kartini 67 Probolinggo
      </p> 
    </div>
    <div class="is-flex is-justify-content-center">
      <p class="subtitle is-7">
        WA. 081 876 3058
      </p> 
    </div>
    <div class="is-flex is-justify-content-center">
      <p class="subtitle is-7">
        081 391 0512 03
      </p> 
    </div>

    <div class="is-flex is-justify-content-space-between">
      <div class="title is-7 mt-2">
        {{htrans.note}} 
        <br> 
        {{htrans.name}}
      </div>
      <div class="title is-7 mt-2">
        {{`${htrans.date.getDate()}-${htrans.date.getMonth()+1}-${htrans.date.getFullYear()}`}}
      </div>
    </div>
    <b-table
        :data="dtrans === null ? [] : dtrans"
        :bordered="isBordered"
        :hoverable="isHoverable"
        :loading="isLoading"
        :default-sort-direction="defaultSortDirection"
        default-sort="user.first_name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column
          field="Service" 
          label="Service" 
          width="20" 
          v-slot="props"
        >
          <p class="subtitle is-7" >
            {{ props.row.type.name }}
            <br>
            {{ props.row.promo.name }}
          </p>
        </b-table-column>

        <b-table-column
          field="price" 
          label="Harga" 
          width="20" 
          v-slot="props"
        >
          <p class="subtitle is-7" >
            {{`Rp. ${parseFloat(props.row.type.sale_price).toLocaleString('id-ID')}`}}
          </p>
        </b-table-column>

      

        <template #empty>
            <div class="has-text-centered">No records</div>
        </template>
    </b-table>
    <div class="columns">
      <div class="column is-6 ml-4">
        <p class="title is-7 has-text-right">
          Total :
        </p> 
      </div>
      <div v-if="htrans.totalPrice !== undefined" class="column">
        <p class="title is-7 has-text-right">
          {{`Rp. ${parseFloat(htrans.totalPrice).toLocaleString('id-ID')}`}}
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6 ml-4">
        <p class="title is-7 has-text-right">
          Discount :
        </p> 
      </div>
      <div v-if="htrans.totalDiscount !== undefined" class="column">
        <p class="title is-7 has-text-right">
          {{`Rp. ${parseFloat(htrans.totalDiscount).toLocaleString('id-ID')}`}}
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6 ml-4">
        <p class="title is-7 has-text-right">
          Grand Total :
        </p> 
      </div>
      <div v-if="htrans.totalPrice !== undefined && htrans.totalDiscount !== undefined" class="column">
        <p class="title is-7 has-text-right">
          {{`Rp. ${parseFloat(htrans.totalPrice - htrans.totalDiscount).toLocaleString('id-ID')}`}}
        </p>
      </div>
    </div>
    <div class="is-flex is-justify-content-center">
      <p class="title is-5">
        Terima Kasih
      </p> 
    </div>
    <div class="is-flex is-justify-content-center">
      <p class="title is-7">
        Ditunggu Kedatangannya Kembali
      </p> 
    </div>
    <div class="is-flex is-justify-content-center mt-3">
      <p class="title is-7">
        IT Support 081 876 3058
      </p> 
    </div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        userJwt : localStorage.getItem('userJwt'),
        htrans : {
          id: null,
          note : null,
          name: null,
          date: new Date,
        },
        dtrans : null,
        isLoading : false,
        isBordered : true,
        isHoverable : true,
        defaultSortDirection: 'asc',
      }
    },
    async mounted () {
      try {
        const response = await this.$axios.get(`${this.$config.BASE_URL}/api/htrans/id/${this.$route.params.id}`,{
          headers : {
            token: this.userJwt
          }
        })
        if (response.status === 200)
        {
          this.htrans.note = response.data.data.note
          this.htrans.name = response.data.data.name
          this.htrans.id = response.data.data.id
          this.htrans.date = new Date(response.data.data.date)
          try {
            const result = await this.$axios.get(`${this.$config.BASE_URL}/api/dtrans/${this.htrans.id}`,{
              headers : {
                token: this.userJwt
              }
            })
            if(result.status === 200)
            {
              this.dtrans = result.data.data

              let totalDiscount = 0
              let totalPrice = 0
              for (let index = 0; index < this.dtrans.length; index++) {
                const element = this.dtrans[index];
                if (element.promo.type)
                  totalDiscount += element.promo.value
                else totalDiscount += element.type.sale_price * element.promo.value / 100
                totalPrice += element.type.sale_price
              }

              this.htrans = {...this.htrans,...{totalDiscount, totalPrice}}
              setTimeout(function(){ window.print(); }, 1000);
              
            }
            
          } catch (error) {
            
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
    layout:"blank"
  }
</script>

<style  scoped>
  .noteprint {
    width: 58mm;
  }
    @page { size: 58mm 100mm } /* output size */
    body.receipt .sheet { width: 58mm; height: 100mm } /* sheet size */
    @media print { body.receipt { width: 58mm } } /* fix for Chrome */
</style>