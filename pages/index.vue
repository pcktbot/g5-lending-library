<template>
  <b-container fluid class="px-0 contained">
    <div class="taurus">
      <b-img-lazy
        src="/spirit-animal.png"
        height="175"
      />
      <b-btn class="taurus__btn" @click="fetchBooks">
        <b-icon-arrow-clockwise />
      </b-btn>
    </div>
    <b-row>
      <b-col>
        <b-collapse v-model="isCollapsed">
          <intake />
        </b-collapse>
        <b-btn class="rounded-0" block @click="isCollapsed = !isCollapsed">
          Add to Library
        </b-btn>
      </b-col>
    </b-row>
    <b-row class="my-5">
      <b-col>
        <b-card-group columns>
          <b-card
            v-for="book in library"
            :key="book.id"
          >
            <b-img-lazy
              v-if="book.details"
              :id="book.id"
              :src="book.details.imgUrl"
              :alt="book.title"
              center
              fluid-grow
            />
            {{ book.title }}
            <b-card-footer class="p-0 border-0">
                <b-btn-group class="w-100">
                <b-btn variant="outline-tertiary">
                  Reserve
                </b-btn>
                <b-btn variant="tertiary" @click="dropBook(book.id)">
                  <b-icon-trash-fill :animation="book.isBusy ? 'spin' : ''" />
                </b-btn>
              </b-btn-group>
              <b-badge variant="secondary">
                {{ book.owner }}
              </b-badge>
            </b-card-footer>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Intake from '~/components/intake'
export default {
  components: {
    Intake
  },
  data() {
    return {
      isCollapsed: false,
      library: []
    }
  },
  methods: {
    fetchBooks() {
      this.$axios
        .$get('api/v1/library')
        .then((res) => {
          this.library = res.map(b => ({ isBusy: false, ...b }))
        })
    },
    dropBook(id) {
      if (id) {
        this.$axios
          .$delete(`api/v1/book/${id}`)
          .then(res => this.$emit('res', res))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contained {
  overflow: hidden;
}
.taurus {
  position: fixed;
  z-index: 1;
  bottom: 0%;
  right: 0%;
  opacity: 0.75;
  & img {
    pointer-events: none;
  }
  &__btn {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
