<template>
  <div>
    <p class="title is-6 mt-4">You're logged in as {{ $auth.email }}</p>
  </div>
</template>

<script>
export default {
  async mounted() {
    // console.log(this.$store.state.user.isAuthenticated);
    // await this.$store.commit('load')
    // setInterval(()=> {this.$store.commit('load')}, 5000)
    // console.log(this.$store.state.user);
    // if(!this.$store.state.isAuthenticated) this.$router.push('/')
    if (!this.$auth.isAuthenticated) this.$router.push('/')
  }

}
</script>

<style>

</style>