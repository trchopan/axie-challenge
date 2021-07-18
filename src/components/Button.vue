<template>
  <button
    class="inline-flex justify-center items-center px-4 py-2 border
    border-transparent text-base leading-6 font-medium rounded-md transition
    ease-in-out duration-150 bg-grey h-12"
    @click="onClick"
    :class="{
      'cursor-not-allowed': disabled,
      'button-primary': primary,
      'button-flat': flat,
      'button-small': small,
      'button-icon': icon,
      'button-large-icon': largeIcon,
    }"
    :disabled="disabled"
  >
    <div
      v-if="icon || largeIcon"
      class="transition duration-150 ease-in-out"
      :class="{
        'opacity-30': disabled,
        'transform scale-125': clicky,
      }"
    >
      <Icon v-if="icon" :name="icon" size="24px" />
      <Icon v-if="largeIcon" :name="largeIcon" size="32px" />
    </div>
    <template v-else>
      <svg
        v-if="loading"
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="blue"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="blue"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span
        class="button-label transition duration-150 ease-in-out"
        :class="{
          'opacity-30': disabled,
          'transform scale-125': clicky,
        }"
      >
        <slot></slot>
      </span>
    </template>
  </button>
</template>

<script lang="ts">
import {isFunction} from 'lodash';
import {ref, defineComponent, nextTick, computed} from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    disabled: {type: Boolean, required: false},
    loading: {type: Boolean, required: false},
    flat: {type: Boolean, required: false},
    small: {type: Boolean, required: false},
    primary: {type: Boolean, required: false},
    largeIcon: {type: String, required: false},
    icon: {type: String, required: false},
  },
  setup: (props, {emit, attrs}) => {
    const clicky = ref<boolean>(false);
    const clickable = computed(() => isFunction(attrs.onClick));

    const onClick = async () => {
      if (!clickable.value) return;
      clicky.value = true;
      setTimeout(() => (clicky.value = false), 100);
    };

    return {onClick, clicky, clickable};
  },
});
</script>

<style lang="scss" scoped>
.button {
  svg {
    circle {
      stroke: blue;
    }
    path {
      fill: blue;
    }
  }
  &-label {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
    line-height: normal;
    position: relative;
  }
  &-flat {
    background: inherit;
  }
  &-primary {
    background: linear-gradient(256.28deg, #1c94f4 0%, #1273ea 100%);
    color: #ffffff;
    svg {
      circle {
        stroke: white;
      }
      path {
        fill: white;
      }
    }
  }
  &-small {
    color: #57627b;
    height: 20px;
    padding: 0 8px;
  }
  &-large-icon {
    padding: 0;
    height: 48px;
    width: 48px;
  }
  &-icon {
    padding: 0;
    height: 32px;
    width: 32px;
  }
}
</style>
