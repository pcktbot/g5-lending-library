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
        <b-btn block @click="isCollapsed = !isCollapsed">
          Show/Hide
        </b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ library }}
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
          this.library = res
        })
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
