<template>
  <div v-if="loadingAsset" class="mt-5 mb-10 flex justify-center">
    <Loading size="36"></Loading>
  </div>
  <router-view v-else></router-view>
</template>

<script lang="ts">
import {isEmpty} from 'lodash';
import {defineComponent, onMounted} from 'vue';
import {useAsset} from './application/asset';
import {useAuth} from './application/auth';

export default defineComponent({
  name: 'App',
  setup: () => {
    const auth = useAuth();
    const asset = useAsset();
    onMounted(async () => {
      if (isEmpty(asset.infos.value)) asset.getAssetInfos();
      const user = auth.getUser();
      if (user) {
        await asset.bindWalletInfo(user.uid);
        await asset.getAllWallets();
      }
    });

    return {
      loadingAsset: asset.loading,
    };
  },
});
</script>

<style></style>
