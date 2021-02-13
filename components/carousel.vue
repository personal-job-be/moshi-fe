<template>
    <section>
      <b-carousel
          :progress="progress"
          :progress-type="progressType">
          <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
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
                { title: 'Slide 1', color: 'grey', img : "back1.jpg" },
                { title: 'Slide 2', color: 'dark', img : "back2.jpg" },
                { title: 'Slide 3', color: 'primary', img : 'back3.jpg' },
                { title: 'Slide 4', color: 'info', img: 'back4.jpg'}
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