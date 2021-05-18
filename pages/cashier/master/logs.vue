<template>
  <div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        userJwt : localStorage.getItem('userJwt'),
      }
    },
    async mounted () {
      const response = await this.$axios.get(`${this.$config.BASE_URL}/api/logs/2021-05-10/2021-05-11`,{
        headers : {
          token : this.userJwt
        }
      })
      console.log(response);
    },
  }
</script>

<style lang="scss" scoped>

</style>