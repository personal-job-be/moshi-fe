<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head" style="justify-content: space-between;">
      <p class="has-text-weight-bold">Pencarian Member</p>
      <b-button class="is-success is-small" @click="$emit('close')">
        <b-icon
          icon="close"
          size="is-small"
        >
        </b-icon>
      </b-button>
    </header>
    <section class="modal-card-body">
        <members origin='1' @getMember='getMember'/>
    </section>
    <footer class="modal-card-foot is-justify-content-center">
    </footer>
  </div>
</template>

<script>
import Members from '@/components/members'
export default {
  components: {
    Members,
  },
  methods: {
    getMember(data) {
      this.$emit('getMember',data)
      this.$emit('close')
    }
  },
}
</script>

<style>

</style>