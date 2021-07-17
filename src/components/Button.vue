<template>
  <button
    @click="onClick"
    class="button"
    :class="{
      clickable,
      clicky,
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
import {isFunction} from 'lodash';
import {ref, defineComponent, nextTick, computed} from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    block: {type: Boolean, required: false},
    small: {type: Boolean, required: false},
    primary: {type: Boolean, required: false},
    largeIcon: {type: Boolean, required: false},
    icon: {type: Boolean, required: false},
  },
  setup: (_, {emit, attrs}) => {
    const clicky = ref<boolean>(false);
    const clickable = computed(() => isFunction(attrs.onClick));

    const onClick = async () => {
      if (!clickable.value) return;
      clicky.value = true;
      setTimeout(() => (clicky.value = false), 100);
      emit('click');
    };

    return {onClick, clicky, clickable};
  },
});
</script>

<style lang="scss" scoped>
.button {
  background: #f7f9fc;
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
  vertical-align: middle;
  white-space: nowrap;
  transition: all 100ms;
  padding: 0 1.25rem;

  &-label {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
    line-height: normal;
    position: relative;
  }
  &-block {
    height: 40px;
    display: flex;
    flex: 1 0 auto;
    min-width: 100% !important;
    color: #1273ea;
  }
  &-primary {
    background: linear-gradient(256.28deg, #1c94f4 0%, #1273ea 100%);
    color: #ffffff;
  }
  &-small {
    color: #57627b;
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
