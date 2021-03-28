<template>
  <!-- FOOTER -->
  <div class="footer-page mt-2">
    
    <div class="columns">
      <div class="column is-4">
        <div class="ml-4 title is-5  has-text-white">Our Location : </div>
        <div class="ml-5 subtitle is-5 has-text-white">Moshi Moshi Family Massage
          <br>
          Kartini 67
          <br>
          Probolinggo
          <br>
          Belakang RSUD Moch Saleh
        </div>
        <div class="ml-4 mt-3 title is-5 has-text-white">Contact us : 
          <br>
          <br>
          <b-button class="is-success" @click="whatsapp(1)">Contact Person (1)</b-button>
          <b-button class="is-success" @click="whatsapp(2)">Contact Person (2)</b-button>
        </div>

      </div>
      <div class="column is-4">
        <div class="ml-4 title is-5  has-text-white">Our Instagram : </div>
        <div class="columns is-vcentered">
          <div class="column is-2">
            <img src="instagram.png">
          </div>
          <div class="column">
            <div class="title is-5  has-text-white">@moshimassage </div>
          </div>
        </div>

      </div>
      <div class="column is-4">
        <div class="ml-4 title is-5  has-text-white">Google Maps : </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.406289282078!2d113.20899201477772!3d-7.746657694416605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7ad94c0a713b9%3A0xb25019fc05adc3a5!2sJl.%20R.A.%20Kartini%20No.67%2C%20Sukabumi%2C%20Kec.%20Mayangan%2C%20Kota%20Probolinggo%2C%20Jawa%20Timur%2067219!5e0!3m2!1sen!2sid!4v1616650581523!5m2!1sen!2sid" width="400" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </div>
    <div class="has-text-centered has-text-light">
      created by reza limena WA - 0818763058
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    whatsapp(to) {
      if(to === 1)
        window.open(
        'https://api.whatsapp.com/send?phone=+62818763058'+
          `&text=Hi saya mau reservasi pijat untuk hari ini : %0aAtas nama : %0aJam Kedatangan : %0aJenis Pijatan : 
          %0a%0a (Tolong isi Atas Nama, Jam Kedatangan, Jenis Pijatan - Harap datang 15 menit sebelumnya Terima Kasih)`
        )
      else
        window.open(
        'https://api.whatsapp.com/send?phone=+6281391051203'+
          `&text=Hi saya mau reservasi pijat untuk hari ini : %0aAtas nama : %0aJam Kedatangan : %0aJenis Pijatan : 
          %0a%0a (Tolong isi Atas Nama, Jam Kedatangan, Jenis Pijatan - Harap datang 15 menit sebelumnya Terima Kasih)`
        )
    }
  },

}
</script>

<style>

.footer-page {
  background-color: #517f2f;
}

</style>