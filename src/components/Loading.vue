<template>
  <svg
    class="animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    :style="sizeStyle"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      :stroke="color"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      :fill="color"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>

<script lang="ts">
import {ref, defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'Loading',
  props: {
    size: {type: String, required: true},
    color: {type: String, required: false},
  },
  setup: props => {
    const sizeStyle = computed(() => {
      const s = props.size || 24;
      return {width: `${s}px`, height: `${s}px`};
    });
    return {
      sizeStyle,
      color: props.color || 'blue',
    };
  },
});
</script>
