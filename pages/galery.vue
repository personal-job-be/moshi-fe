<template>
  <div>
    <p class="title is-1 has-text-centered brown mt-5">OUR GALLERY</p>
    <div class="columns is-multiline">
      <div v-for="(singleGallery, index) in gallery" :key="index" class="column is-4">
        <div class="box">
          <img :src="singleGallery"  alt="Placeholder image">
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      gallery: [
        'galery0.jpg', 'galery3.jpg', 'galery2.jpg', 'galery1.jpg', 'galery4.jpg', 'galery5.jpg', 'galery6.jpg', 'galery7.jpg',
        'testi3.jpg', 'testi2.jpg', 'testi1.jpg'
      ]

    }
  },
}
</script>

<style>
.brown{
  /* color: #a5a251; */
  color : #517f2f;
}
</style>