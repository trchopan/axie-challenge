<template>
  <div
    class="card-container"
    :class="{
      'card-primary': primary,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    primary: {type: Boolean, required: false},
  },
  setup: () => {
    //
  },
});
</script>

<style lang="scss" scoped>
.card {
  &-container {
    padding: 1.125rem 0;
    border-radius: 16px;
    background: #fff;
  }
  &-primary {
    color: white;
    background: linear-gradient(256.28deg, #1c94f4 0%, #1273ea 100%);
    box-shadow: 0px 12px 20px -4px #c5cee0;
  }
}
</style>
