<template>
  <b-card>
    <b-form @submit="onSearch">
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
    </b-form>
    <b-card-group columns class="my-5">
      <b-card
        v-for="(book, i) in res"
        :key="`book-${i}`"
        :header="book.title"
        :footer="book.author"
        header-tag="h4"
      >
        <b-img-lazy
          :src="book.imgUrl"
          center
        />
      </b-card>
    </b-card-group>
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
    onSearch(evt) {
      evt.preventDefault()
      this.$axios
        .$get(`/api/v1/search?phrase=${this.phrase}`)
        .then((res) => {
          this.res = res
        })
    }
  }
}
</script>

<style>

</style>
