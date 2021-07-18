<template>
  <div class="px-10 bg-white shadow-sm h-12 relative flex items-center">
    <div v-if="prependIcon" class="absolute left-5">
      <Button @click="$emit('click:prepend-icon')" :icon="prependIcon" flat>
      </Button>
    </div>
    <div class="flex-grow font-semibold text-base text-center">
      <slot>
        {{ title }}
      </slot>
    </div>
    <div v-if="appendIcon" class="absolute right-5">
      <Button @click="$emit('click:append-icon')" :icon="appendIcon" flat>
      </Button>
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
