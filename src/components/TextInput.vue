<template>
  <div
    class="mb-3"
    :class="{
      'inline-block': inline,
      'opacity-50': disabled,
    }"
  >
    <div
      v-if="label || rightLabel"
      class="flex mb-1 px-2 font-bold text-xs
      text-gray-600"
    >
      <label v-if="label" :for="`input-${myId}`" class="flex-grow">
        {{ label }}
      </label>
      <label
        v-if="rightLabel"
        :for="`input-${myId}`"
        class="flex-grow text-right"
      >
        {{ rightLabel }}
      </label>
    </div>
    <div
      class="flex rounded-lg border border-gray-300 items-center h-12 px-5 space-x-2"
    >
      <slot name="prepend"></slot>
      <input
        :id="`input-${myId}`"
        :type="type"
        v-model="localValue"
        :disabled="disabled || readonly"
        :placeholder="placeholder"
        class="placeholder-gray-400 text-gray-600 bg-white outline-none focus:outline-none flex-auto"
        v-if="!options"
      />
      <select
        v-else
        v-model="localValue"
        class="text-gray-600 bg-white outline-none focus:outline-none flex-auto border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
      >
        <option v-for="option in options" :key="option">
          {{ option }}
        </option>
      </select>
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, watch, watchEffect} from 'vue';

let myId = 0;

export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: {type: String, required: false},
    placeholder: {type: String, required: false},
    inline: {type: Boolean, required: false},
    readonly: {type: Boolean, required: false},
    disabled: {type: Boolean, required: false},
    label: {type: String, required: false},
    rightLabel: {type: String, required: false},
    type: {type: String, required: false},
    iconClick: {type: String, required: false},
    options: {type: Array, required: false},
  },
  setup: (props, {emit}) => {
    myId++;
    const localValue = ref<string>(props.modelValue || '');

    watchEffect(() => emit('update:modelValue', localValue.value));
    const onFocus = () => {
      console.log('focus', Math.random());
    };

    return {myId, localValue, onFocus};
  },
});
</script>
