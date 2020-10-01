<template>
  <b-card no-body>
    <b-modal id="add-modal" centered @ok="addToLibrary">
      <b-card>
        You are adding {{ book.title }}.
        <b-img-lazy :src="book.imgUrl" />
      <b-form-group label="Who are you?">
        <b-form-input v-model="user" />
      </b-form-group>
      </b-card>
    </b-modal>
    <b-form @submit="onSearch">
      <b-input-group class="bg-secondary border-secondary border">
        <template v-slot:prepend>
          <b-icon-search class="align-self-center mx-3" variant="white" />
        </template>
        <b-form-input
          v-model="phrase"
        />
        <template v-slot:append>
          <b-btn @click="onSearch" class="px-3">
            Search
          </b-btn>
        </template>
      </b-input-group>
    </b-form>
    <b-table
      ref="searchTable"
      :fields="fields"
      :items="res"
      small
      selectable
      outlined
      sticky-header
      responsive
      class="border-secondary border"
      style="max-height: calc(100vh - 100px);"
    >
      <template v-slot:cell(imgUrl)="row">
          <b-img-lazy :src="row.item.imgUrl" />
      </template>
      <template v-slot:cell(title)="row">
        <h4>
          {{ row.item.title }}
        </h4>
        <p class="text-tertiary text-uppercase small">
          {{ row.item.author }}
        </p>
        <div class="anchor">
          <b-btn
            class="anchor__btn"
            variant="outline-tertiary"
            @click="onAdd(row.item)"
          >
            <b-icon-plus-circle />
            Add
          </b-btn>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      phrase: '',
      user: null,
      fields: [
        { key: 'imgUrl', label: 'Thumbnail', sortable: false },
        { key: 'title', label: 'Title', sortable: true }
      ],
      res: [],
      library: [],
      book: {}
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
    },
    onAdd(evt) {
      this.book = evt
      this.$bvModal.show('add-modal')
    },
    addToLibrary() {
      if (this.user && this.book) {
        this.$axios
          .$post('api/v1/save', {
            book: this.book,
            owner: this.user,
            status: 'available'
          })
          .then((res) => {
            this.library = res
          })
          .finally(() => {
            this.$emit('on-add')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.anchor {
  position: relative;
  &__btn {
    position: absolute;
    right: 0%;
    bottom: 0%;
    // border-radius: 50%;
  }
}
</style>
