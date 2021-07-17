<template>
  <div class="input-container" :class="{'input-inline': inline}">
    <label v-if="label" :for="`simple-input-${myId}`" class="input-label">
      {{ label }}
    </label>
    <div class="input-control">
      <input :id="`simple-input-${myId}`" :type="type" />
      <div class="input-slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';

let myId = 0;

export default defineComponent({
  name: 'TextInput',
  props: {
    inline: {type: Boolean, required: false},
    label: {type: String, required: false},
    type: {type: String, required: false},
    iconClick: {type: String, required: false},
  },
  setup: () => {
    myId++;
    return {myId};
  },
});
</script>

<style lang="scss" scoped>
.input {
  &-inline {
    display: inline-block;
  }
  &-label {
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 16px;
    text-transform: uppercase;
    color: #57627b;
    padding: 0 0.5rem;
  }
  &-control {
    background: #ffffff;
    border: 1px solid #c5cee0;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 0 1rem;
    display: flex;
    align-items: center;

    input {
      flex: 1 1 auto;
      padding: 10px 0;
      max-width: 100%;
      min-width: 0;
      width: 100%;

      border-radius: 0;
      border-style: none;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #151a30;
    }
  }
  &-slot {
    padding-left: 5px;
    display: flex;
    justify-content: center;
  }
}
</style>
