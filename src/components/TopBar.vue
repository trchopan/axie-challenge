<template>
  <div class="top-bar-container">
    <div class="top-bar-wrapper">
      <div v-if="prependIcon" class="top-bar-prepend-icon">
        <Button @click="$emit('click:prepend-icon')" icon flat>
          <Icon :name="prependIcon" size="32px" />
        </Button>
      </div>
      <div class="top-bar-body">
        <slot>
          <div class="top-bar-content">
            <div class="top-bar-title">{{ title }}</div>
          </div>
        </slot>
      </div>
      <div v-if="appendIcon" class="top-bar-append-icon">
        <Button @click="$emit('click:append-icon')" icon flat>
          <Icon :name="appendIcon" size="32px" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {isFunction} from 'lodash';
import {ref, defineComponent, computed} from 'vue';

export default defineComponent({
  name: 'TopBar',
  props: {
    prependIcon: {type: String, required: false},
    appendIcon: {type: String, required: false},
    title: {type: String, required: false},
  },
  setup: () => {},
});
</script>

<style lang="scss" scoped>
.top-bar {
  &-container {
    background: #ffffff;
  }
  &-wrapper {
    position: relative;
    display: flex;
    padding: 1rem;
    align-items: center;
  }
  &-prepend-icon {
    left: 0;
  }
  &-append-icon {
    right: 0;
  }
  &-prepend-icon,
  &-append-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 32px;
    display: flex;
    align-items: center;
  }
  &-body {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  &-content {
    display: flex;
    align-items: center;
  }
  &-title {
    font-style: normal;
    font-weight: 600;
    line-height: 1.42rem;
    padding-bottom: 4px;
  }
}
</style>
