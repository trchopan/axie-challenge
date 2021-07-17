<template>
  <div
    class="input-container"
    :class="{
      'input-inline': inline,
      'input-readonly': readonly,
      'input-disabled': disabled,
    }"
  >
    <div v-if="label || rightLabel" class="input-label">
      <label v-if="label" :for="`simple-input-${myId}`">
        {{ label }}
      </label>
      <div class="spacer"></div>
      <label
        v-if="rightLabel"
        :for="`simple-input-${myId}`"
        class="input-right-label"
      >
        {{ rightLabel }}
      </label>
    </div>
    <div class="input-control">
      <div class="input-prepend-slot">
        <slot name="prepend"></slot>
      </div>
      <input
        :id="`simple-input-${myId}`"
        :type="type"
        v-model="localValue"
        :disabled="disabled || readonly"
      />
      <div class="input-append-slot">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, watch, watchEffect} from 'vue';

let myId = 0;

export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: {type: String, required: true},
    inline: {type: Boolean, required: false},
    readonly: {type: Boolean, required: false},
    disabled: {type: Boolean, required: false},
    label: {type: String, required: false},
    rightLabel: {type: String, required: false},
    type: {type: String, required: false},
    iconClick: {type: String, required: false},
  },
  setup: (props, {emit}) => {
    myId++;
    const localValue = ref<string>(props.modelValue);

    watchEffect(() => emit('update:modelValue', localValue.value));

    return {myId, localValue};
  },
});
</script>

<style lang="scss" scoped>
.input {
  &-inline {
    display: inline-block;
  }
  &-disabled {
    .input-control {
      background-color: #edf1f7;
      opacity: 0.368;
    }
  }
  &-label {
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 16px;
    text-transform: uppercase;
    color: #57627b;
    padding: 0 0.5rem;
    display: flex;
  }
  &-right-label {
    color: #151a30;
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
      font-size: 1rem;
      line-height: 1.42rem;
      color: #151a30;
    }
  }
  &-prepend-slot,
  &-append-slot {
    display: flex;
    justify-content: center;
  }
  &-prepend-slot {
    padding-right: 5px;
  }

  &-append-slot {
    padding-left: 5px;
  }
}
</style>
