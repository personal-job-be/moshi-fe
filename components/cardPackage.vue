<template>
    <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="paket1.png"  alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="columns">
        <div class="column is-7">
          <p class="title is-5">{{title}}</p>
        </div>
        <div class="column is-5">
          <img src="scrub.png"   alt="Placeholder image">

        </div>
      </div>
      <div class="media">
        <div class="media-content">
          
          <p class="subtitle is-6">@johnsmith</p>
        </div>

        
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
  },

}
</script>

<style scoped>
.card {
  background-color: #d7dd9c;
}
</style>