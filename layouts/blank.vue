<template>
  <div v-if="$auth.isAuthenticated">
    <Nuxt />
  </div>
</template>

<script>
  export default {
    mounted () {
      if (!this.$auth.isAuthenticated) this.$router.push('/')
    },
  }
</script>

<style scoped>

</style>