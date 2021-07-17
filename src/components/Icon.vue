<template>
  <img :src="imgSrc" :style="style" :class="{left}" />
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    name: {type: String, required: true},
    size: {type: [String, Number], required: true},
    left: {type: Boolean, required: true},
  },
  setup: props => {
    const iconMap = {
      'circle-fill': 'circle-fill.svg',
      eye: 'eye-icon.svg',
      'credit-card-fill': 'credit-card-fill.svg',
      euro: 'euro.svg',
      'person-fill': 'person-fill.svg',
      'plane-fill': 'plane-fill.svg',
      repeat: 'repeat.svg',
      stack: 'stack.svg',
      yen: 'yen.svg',
    } as {[key: string]: string};
    const imgSrc = new URL(`../assets/${iconMap[props.name]}`, import.meta.url)
      .href;

    const size = props.size || '24px';
    const style = {
      width: size,
      height: size,
    };
    return {imgSrc, style};
  },
});
</script>

<style lang="scss" scoped>
.left {
  margin-right: 5px;
}
</style>
