<template>
  <div>
    <carousel />
    <p class="subtitle is-5 mt-5 has-text-centered"> Kita membantu anda untuk tampil yang terbaik </p>
    <p class="title is-1 has-text-centered brown">One Stop Relaxation</p>

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
        <span class="subtitle is-5 mt-3">dengan terapis profesional, </span>
        <p class="subtitle is-5">tempat yang mewah, bersih dan aromatherapy akan membantu anda lebih relax</p>
        <span class="title is-2 brown">Full Body Massage</span>
        <span class="subtitle is-5"> atau biasa disebut pijat seluruh tubuh memang sangat menyenangkan, terutama setelah satu minggu kita bergelut dengan rutinitas yang melelahkan. Berfungsi untuk mengendurkan otot, merangsang sirkulasi, dan mengurangi stres. Memijat bahu seseorang membuatnya merasa nyaman</span>
        <br>
        <br>
        <span class="title is-2 brown">Reflexology</span>
        <span class="subtitle is-5">atau pijat refleksi bisa dijadikan pilihan untuk memanjakan diri di sela-sela kesibukan Anda. Berbeda dengan pijat atau urut biasa, pijat refleksi lebih fokus pada titik-titik yang ada di tubuh, terutama pada kaki dan tangan. Titik-titik tubuh tersebut terhubung langsung dengan saraf-saraf organ, sehingga ketika dipijat akan mempengaruhi fungsi organ.</span>
        <div>
          <b-button class="is-success mt-6">Our Package</b-button>
        </div>
      </div>
    </div>

    <p class="title is-1 has-text-centered brown mt-5">OUR SERVICES</p>

    <div class="columns mt-3">
      <div class="column is-3 ml-4">
        <card-package title = "Body Scrub Package"/>
      </div>
      <div class="column is-3">
        <card-package title = "Facial Package"/>
      </div>
      <div class="column is-3">
        <card-package title = "Ear Candle Package"/>
      </div>
      <div class="column is-3">
        <card-package title = "Scraping Package"/>
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
    CardPackage
  },

}
</script>

<style scoped>
.brown{
  color: #a5a251;
}
</style>