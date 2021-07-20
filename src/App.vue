<template>
  <div v-if="loadingAsset" class="mt-5 mb-10 flex justify-center">
    <Loading size="36"></Loading>
  </div>
  <router-view v-else></router-view>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import {useAsset} from './application/asset';

export default defineComponent({
  name: 'App',
  setup: () => {
    const asset = useAsset();
    onMounted(() => {
      if (asset.loaded.value) return;
      asset.init();
    });

    return {
      loadingAsset: asset.loading,
    };
  },
});
</script>

<style></style>
