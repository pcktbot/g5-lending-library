<template>
  <div v-if="loading" class="l flip-vertical-right">
    <b-icon-book-half scale="5" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style>

</style>
