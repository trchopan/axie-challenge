<template>
  <transition name="fade">
    <div v-if="modelValue" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container px-5 w-screen" :style="{maxWidth}">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// Credit to: https://v3.vuejs.org/examples/modal.html
import {ref, defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    modelValue: {type: Boolean, required: true},
    maxWidth: {type: String, required: false},
  },
  setup: props => {
    const maxWidth = computed(() => props.maxWidth || '500px');
    return {maxWidth};
  },
});
</script>

<style lang="scss" scoped>
.modal {
  &-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(21, 26, 48, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-container {
    margin: 0px auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
