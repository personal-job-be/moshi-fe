<template>
    <section>
      <b-carousel
          :progress="progress"
          :progress-type="progressType">
          <b-carousel-item v-for="(carousel, i) in carousels" :key="i" repeat=true>
            <img :src="carousel.img" alt="" srcset="" width="100%" height= "50%">
          </b-carousel-item>
      </b-carousel>
    </section>
</template>

<script>
export default {
    data() {
        return {
            progress: true,
            progressType: 'is-primary',
            carousels: [
                { img : "back1.jpg" },
                { img : "back2.jpg" },
                { img : 'back6.jpg' },
                { img: 'back4.jpg'},
                { img: 'back5.jpg'},
                { img: 'back3.jpg'}
            ]
        }
    }
}
</script>

<style scoped>
section {
  position: relative;
  text-align: center;
  color: white;
}
.centered {
  position: absolute;
  top: 40%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: brown;
  font-size: 36pt;
}
</style>