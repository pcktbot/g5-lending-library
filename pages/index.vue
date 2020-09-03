<template>
  <b-container fluid class="px-0 contained">
    <div class="taurus">
      <b-img-lazy
        src="/spirit-animal.png"
        height="175"
      />
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
      isCollapsed: false
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
  opacity: 0.5;
  pointer-events: none;
  &__btn {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
