<template>
  <b-card>
    <b-input-group class="border-primary border">
      <template v-slot:prepend>
        <span class="px-5 align-self-center">
          <b-iconstack>
            <b-icon-search />
            <b-icon-book />
          </b-iconstack>
        </span>
      </template>
      <b-form-input
        v-model="phrase"
      />
      <template v-slot:append>
        <b-btn @click="onSearch">
          Search
        </b-btn>
      </template>
    </b-input-group>
    {{ res }}
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      phrase: '',
      res: ''
    }
  },
  methods: {
    onSearch() {
      this.$axios
        .$get(`api/v1/search?phrase=${this.phrase}`)
        .then((res) => {
          this.res = res
        })
    }
  }
}
</script>

<style>

</style>
