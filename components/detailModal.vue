<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head" style="justify-content: space-between;">
      <p class="has-text-weight-bold"> {{data.title}}</p>
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
        <div class="column is-6">
          <img :src="data.img" >
        </div>
        <div class="column">
          <div class="title is-5 has-text-centered">{{data.title}}</div>
          <div class="title is-5 mt-3">Service : </div>
          <div v-for="(service, index) in data.services" :key="index" class="subtitle is-6 mt-1">
            <p >{{index + 1}}. {{service}}</p>
          </div>
          <span class="title is-5 mt-3">Estimasi Durasi : </span>
          <span class="subtitlte.is-6">{{data.duration}}</span>
          <br>
          <br>
          <span class="title is-5 mt-3">Harga : </span>
          <span class="subtitlte.is-6">{{data.price}}</span>
        </div>
      </div>
      
    </section>
    <footer class="modal-card-foot is-justify-content-center">
      <b-button class="is-success" @click="whatsapp(data)">Reservasi</b-button>
    </footer>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: null
    },
  },
  methods: {
    whatsapp(service) {
      window.open(
      'https://api.whatsapp.com/send?phone=+62818763058'+
        `&text=Hi saya mau reservasi pijat ${service.title} untuk hari ini : %0aAtas nama : %0aJam Kedatangan : %0aJenis Pijatan : ${service.title} %0aDurasi : ${service.duration} %0aHarga : ${service.price}`
      )
    }
  },
}
</script>

<style>

</style>