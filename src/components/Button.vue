<template>
  <button
    @click="onClick"
    class="button"
    :class="{
      'button-clicky': clicky,
      'button-block': block,
      'button-small': small,
      'button-primary': primary,
      'button-large-icon': largeIcon,
      'button-icon': icon,
    }"
  >
    <span class="button-label">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import {ref, defineComponent, nextTick} from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    block: {type: Boolean, required: false},
    small: {type: Boolean, required: false},
    primary: {type: Boolean, required: false},
    largeIcon: {type: Boolean, required: false},
    icon: {type: Boolean, required: false},
  },
  setup: (_, {emit}) => {
    const clicky = ref<boolean>(false);
    const onClick = async () => {
      clicky.value = true;
      setTimeout(() => (clicky.value = false), 100);
      emit('click');
    };

    return {onClick, clicky};
  },
});
</script>

<style lang="scss" scoped>
.button {
  background: #f7f9fc;
  color: #57627b;
  border-radius: 8px;
  height: 2.25rem;

  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 600;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  white-space: nowrap;
  transition: all 100ms;
  padding: 0 1.25rem;

  &-clicky {
    opacity: 0.5;
  }

  &-label {
    align-items: center;
    color: inherit;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
    line-height: normal;
    position: relative;
    transition: inherit;
    transition-property: opacity;
  }

  &-block {
    display: flex;
    flex: 1 0 auto;
    min-width: 100% !important;
  }

  &-primary {
    background: linear-gradient(256.28deg, #1c94f4 0%, #1273ea 100%);
    color: #ffffff;
  }

  &-small {
    height: 20px;
    padding: 0 8px;
  }

  &-large-icon {
    height: 48px;
    width: 48px;
  }

  &-icon {
    height: 32px;
    width: 32px;
  }
}
</style>
