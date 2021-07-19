<template>
  <img :src="imgSrc" :style="style" :class="{'mr-4': left}" />
</template>

<script lang="ts">
import {ref, defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    name: {type: String, required: true},
    size: {type: [String, Number], required: false},
    left: {type: Boolean, required: false},
  },
  setup: props => {
    const iconMap = {
      'chevron-left': 'chevron-left.svg',
      'circle-fill': 'circle-fill.svg',
      close: 'close.svg',
      copy: 'copy.svg',
      'credit-card-fill': 'credit-card-fill.svg',
      euro: 'euro.png',
      eye: 'eye-icon.svg',
      'person-fill': 'person-fill.svg',
      'plane-fill': 'plane-fill.svg',
      repeat: 'repeat.svg',
      stack: 'stack.svg',
      usd: 'usd.png',
      yen: 'yen.png',
    } as {[key: string]: string};
    const imgSrc = computed(() => new URL(
      `../assets/icons/${iconMap[props.name]}`,
      import.meta.url
    ).href);

    const size = props.size || '24px';
    const style = {
      width: size,
      height: size,
    };
    return {imgSrc, style};
  },
});
</script>
