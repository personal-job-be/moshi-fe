<template>
    <div class="card">
    <div class="card-image mt-3">
      <figure class="image is-4by3">
        <img :src="data.img"  alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <!-- <div class="columns">
        <div class="column is-8 has-background-light has-text-centered">
          <p class="title is-5">{{data.title}}</p>
        </div>
      </div> -->
      <div class="media">
        <div class="media-content">
          <!-- <div class="has-text-centered">
            <div v-for="(service,index) in data.services" :key="index">
              <p class="title is-4 mt-2"> {{ service }} </p> 
            </div>
          </div> -->
          <div class="columns">
            <!-- <div class="column is-8">
              <span class="title is-6">
                Estimasi Durasi
              </span>
              <span class="subtitle is-6">{{ data.duration }}</span>
            </div> -->
            <!-- <div class="column rcorners is-success has-text-centered">
              <div class="title is-6  has-text-white">
                Rp. {{parseFloat(data.price).toLocaleString('en-AU')}}
              </div>
            </div> -->
          </div>
          <div class="is-flex is-justify-content-center">
            <b-button class="is-danger " @click="showModal(data)">Detail Paket</b-button>
          </div>
          <br>
          <div class="is-flex is-justify-content-center">
            <b-button class="is-success" @click="whatsapp(data,1)">Reservasi-1</b-button>
            <b-button class="is-success ml-2" @click="whatsapp(data,2)">Reservasi-2</b-button>
          </div>
          <div class="columns is-centered">
            <div class="column is-6">
            </div>
            <div class="column is-6 ">
            </div>
          </div>
        </div>     
      </div>
    </div>
  </div>
</template>

<script>
import DetailModal from "@/components/detailModal";
export default {
  components : {
    DetailModal
  },
  props: {
    data: {
      type: Object,
      default: null
    },
  },
  methods: {
    showModal() {
      this.$buefy.modal.open({
        parent: this,
        component: DetailModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        width: 1080,
        props: {
          data: this.data,
        },
      })
    },
    whatsapp(service, to) {
      if(to === 1)
        window.open(
        'https://api.whatsapp.com/send?phone=+62818763058'+
          `&text=Hi saya mau reservasi pijat ${service.title} untuk hari ini : %0aAtas nama : %0aJam Kedatangan : %0aJenis Pijatan : ${service.title} %0aDurasi : ${service.duration} %0aHarga : ${service.price}
          %0a%0a (Tolong isi Atas Nama dan Jam Kedatangan - Harap datang 15 menit sebelumnya Terima Kasih)`
        )
      else
        window.open(
        'https://api.whatsapp.com/send?phone=+6281391051203'+
          `&text=Hi saya mau reservasi pijat ${service.title} untuk hari ini : %0aAtas nama : %0aJam Kedatangan : %0aJenis Pijatan : ${service.title} %0aDurasi : ${service.duration} %0aHarga : ${service.price}
          %0a%0a (Tolong isi Atas Nama dan Jam Kedatangan - Harap datang 15 menit sebelumnya Terima Kasih)`
        )
    }
  },
}
</script>

<style scoped>
.card {
  background-color: #d7dd9c;
}
.rcorners {
  border-radius: 25px;
  background: #73AD21;
}


</style>