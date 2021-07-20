<template>
  <div
    class="list-item-container"
    :class="{
      clickable,
      clicky,
      'list-item-tile': tile,
    }"
    @click="onClick"
  >
    <div class="list-item-wrapper">
      <div v-if="prependIcon" class="list-item-icon">
        <Icon :src="prependIcon" size="32px" />
      </div>
      <div class="list-item-body">
        <slot>
          <div class="list-item-content">
            <div class="list-item-title">{{ title }}</div>
            <div class="list-item-subtitle">{{ subtitle }}</div>
          </div>
        </slot>
      </div>
      <div v-if="appendIcon" class="list-item-icon">
        <Icon :src="appendIcon" size="32px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {isFunction} from 'lodash';
import {ref, defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'ListItem',
  props: {
    prependIcon: {type: String, required: false},
    appendIcon: {type: String, required: false},
    tile: {type: Boolean, required: false},
    title: {type: String, required: false},
    subtitle: {type: String, required: false},
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
.list-item {
  &-container {
    background: #f7f9fc;
    border-radius: 8px;
    transition: all 100ms;
    :hover {
      background: #edf1f7;
      border-radius: 8px;
    }
  }
  &-wrapper {
    display: flex;
    padding: 1rem;
  }
  &-tile {
    border-radius: 0px;
    background: #ffffff;
    :hover {
      border-radius: 0px;
    }
  }
  &-icon {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
  &-body {
    display: flex;
    align-items: center;
    flex: 1;
  }
  &-title {
    font-style: normal;
    font-weight: 600;
    line-height: 1.42rem;
    padding-bottom: 4px;
  }
  &-subtitle {
    font-style: normal;
    font-weight: normal;
    font-size: 0.85rem;
    line-height: 1.14rem;
    color: #8f9bb3;
  }
}
</style>
