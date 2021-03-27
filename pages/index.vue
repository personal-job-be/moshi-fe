<template>
  <div>
    <!-- HEADER -->
    <carousel />
    <div class="is-flex is-justify-content-center">
      <img
        src="/letter1.png"
      >
    </div>
    <p class="title is-1 has-text-centered brown">One Stop Relaxation</p>

    <!-- MAIN CONTENT - 1 -->
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-4">
        <img src="package.png" alt="" srcset="">
      </div>
      <div class= "mt-6">
        <span class="title is-2 brown">Relaxation</span> 
        <span class="subtitle is-2"> In All Our </span> 
        <span class="title is-2 brown">Services</span>
        <br>
        <span class="subtitle is-5 mt-3">Manjakan diri anda selalu di </span> <span class="title is-4 brown">Moshi-Moshi </span>
        <span class="subtitle is-5 mt-3">yang berlokasi di </span> <span class="title is-4 brown">Jl. Kartini 67 Probolinggo</span> 
        <span class="subtitle is-5 mt-3">dan sudah buka sejak November 2019 </span>
        <span class="subtitle is-5 mt-3">kami siap melayani kebutuhan relaksasi anda setelah disibukkan dengan rutinitas </span>
        <span class="subtitle is-5 mt-3">dengan terapis profesional, </span>
        <span class="subtitle is-5">tempat yang mewah, bersih dan aromatherapy akan membantu anda lebih relax</span>
        <br>
        <br>
        <span class="title is-2 brown">Full Body Massage</span>
        <span class="subtitle is-5"> atau biasa disebut pijat seluruh tubuh memang sangat menyenangkan, terutama setelah satu minggu kita bergelut dengan rutinitas yang melelahkan. Berfungsi untuk mengendurkan otot, merangsang sirkulasi, dan mengurangi stres. Memijat bahu seseorang membuatnya merasa nyaman</span>
        <br>
        <br>
        <span class="title is-2 brown">Reflexology</span>
        <span class="subtitle is-5">atau pijat refleksi bisa dijadikan pilihan untuk memanjakan diri di sela-sela kesibukan Anda. Berbeda dengan pijat atau urut biasa, pijat refleksi lebih fokus pada titik-titik yang ada di tubuh, terutama pada kaki dan tangan. Titik-titik tubuh tersebut terhubung langsung dengan saraf-saraf organ, sehingga ketika dipijat akan mempengaruhi fungsi organ.</span>
      </div>
    </div>

    <!-- MAIN CONTENT - 2 -->
    <p class="title is-1 has-text-centered brown mt-5">OUR PACKAGE</p>

    <div class="columns mt-3">
      <!-- <div   v-for="(service, index) in services" :key="index" > -->
        <div class="column is-3">
          <card-package :data="services[0]"/>
        </div>
        <div class="column is-3">
          <card-package :data="services[1]"/>
        </div>
        <div class="column is-3">
          <card-package :data="services[2]"/>
        </div>
        <div class="column is-3">
          <card-package :data="services[3]"/>
        </div>
      <!-- </div> -->
    </div>

    <hr>

    <!-- MAIN CONTENT - 3 TABLE -->
    <p class="title is-1 has-text-centered brown mt-5">OTHER SERVICES</p>

    <div class="columns is-centered  mt-2">
      <div class="column is-6">
        <p class="title is-4">Pijat Seluruh Tubuh</p>
        <b-table
          :data="fullBodyMassage"
          :striped="true"
          >
            <b-table-column field="service" label="Jenis Pijatan" v-slot="props">
                {{ props.row.title }}
            </b-table-column>

            <b-table-column field="durasi" label="Durasi" v-slot="props">
                {{ props.row.duration }}
            </b-table-column>

            <b-table-column field="harga" label="Harga" v-slot="props">
                Rp. {{parseFloat(props.row.price).toLocaleString('en-AU')}}
            </b-table-column>

            <b-table-column field="reservasi" label="Reservasi" v-slot="props">
              <b-button type="is-success" @click="whatsapp(props.row)">
                Reservasi
              </b-button>
            </b-table-column>
        </b-table>
        <p class="subtitle is-6">Pijatan seluruh tubuh yang bertujuan untuk memperlancar peredaran darah, memperlancar peredaran oksigen ke seluruh organ dan bagus untuk kesehatan jantung</p>
        <p class="title is-4 mt-6">Refleksi</p>
        <b-table
          :data="reflexology"
          :striped="true"
          >
            <b-table-column field="service" label="Jenis Pijatan" v-slot="props">
                {{ props.row.title }}
            </b-table-column>

            <b-table-column field="durasi" label="Durasi" v-slot="props">
                {{ props.row.duration }}
            </b-table-column>

            <b-table-column field="harga" label="Harga" v-slot="props">
                Rp. {{parseFloat(props.row.price).toLocaleString('en-AU')}}
            </b-table-column>

            <b-table-column field="reservasi" label="Reservasi" v-slot="props">
              <b-button type="is-success" @click="whatsapp(props.row)">
                Reservasi
              </b-button>
            </b-table-column>
        </b-table>
        <p class="subtitle is-6">Refleksi adalah teknik pijatan yang melibatkan beberapa tekanan yang berbeda para kaki, tangan, punggung dan kepala.
Dimana berdasarkan teory bahwa bagian-bagian tubuh tersebut terhubung dengan seluruh organ tubuh dan sistem tubuh</p>
      </div>
    </div>    
  </div>
</template>

<script>
import Carousel from "@/components/carousel"
import CardPackage from "@/components/cardPackage"
export default {
  components: {
    Carousel,
    CardPackage,
  },
  data() {
    return {
      services : [
        {
          title : 'Body Scrub Package',
          img : 'paket1.png',
          services : [
            'Full Body Massage 60 Menit',
            'Lulur +/- 50 Menit',
            'Aromatherapy'
          ],
          duration : '110 Menit',
          price : 110000
        },
        {
          title : 'Facial Package',
          img : 'paket2.png',
          services : [
            'Full Body Massage 60 Menit',
            'Totok Wajah 20 Menit',
            'Aromatherapy'
          ],
          duration : '80 Menit',
          price : 90000
        },
        {
          title : 'Ear Candle Package',
          img : 'paket3.png',
          services : [
            'Full Body Massage 60 Menit',
            'Ear Candle +/- 10 Menit',
            'Aromatherapy'
          ],
          duration : '70 Menit',
          price: 90000
        },
        {
          title : 'Scraping Package',
          img : 'paket4.png',
          services : [
            'Full Body Massage 60 Menit',
            'Kerok +/- 10 Menit',
            'Aromatherapy'
          ],
          duration : '70 Menit',
          price : 80000
        }
      ],
      fullBodyMassage : [
        {
          title : 'Full Body Massage 60"',
          duration : '60 Menit',
          price : 60000,
        },
        {
          title : 'Full Body Massage 90"',
          duration : '90 Menit',
          price : 90000,
        },
        {
          title : 'Full Body Massage 120"',
          duration : '120 Menit',
          price : 120000,
        },
      ],
      reflexology: [
        {
          title : 'Refleksi 40"',
          duration : '40 Menit',
          price : 40000,
        },
        {
          title : 'Refleksi 50"',
          duration : '50 Menit',
          price : 50000,
        },
      ]
    }
  },
  methods: {
    whatsapp(service) {
      if(service !== null)
        window.open(
        'https://api.whatsapp.com/send?phone=+62818763058'+
          `&text=Hi saya mau reservasi pijat ${service.title} untuk hari ini : %0aAtas nama : %0aJam Kedatangan : %0aJenis Pijatan : ${service.title} %0aDurasi : ${service.duration} %0aHarga : ${service.price}`
        )
      else
        window.open(
        'https://api.whatsapp.com/send?phone=+62818763058'+
          `&text=Hi saya mau reservasi pijat untuk hari ini : %0aAtas nama : %0aJam Kedatangan : `
        )
    }
  },
}
</script>

<style scoped>
.brown{
  /* color: #a5a251; */
  color : #517f2f;

}


</style>