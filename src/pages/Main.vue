<template>
  <div class="top-section absolute h-96 w-screen max-w-md"></div>
  <Container class="px-5 py-5">
    <div class="mb-10 flex justify-between">
      <Button>
        <Icon name="circle-fill" size="8px" left />
        Ronin Wallet
      </Button>
      <Button @click="signOut" icon="person-fill"></Button>
    </div>
    <div
      v-if="loadingAsset"
      class="flex flex-col items-center justify-center mt-5"
    >
      <Loading size="15"></Loading>
      <div class="mt-3">Loading Wallet</div>
    </div>
    <template v-else>
      <Card primary class="mb-10">
        <div class="px-5 relative">
          <div class="flex justify-between">
            <div class="flex space-x-2">
              <div class="font-medium">My Wallet</div>
              <div class="opacity-70">({{ walletAddr }})</div>
            </div>
            <Icon name="copy" size="16px"></Icon>
          </div>
          <hr class="mt-3 mb-4 opacity-50" />
          <div class="text-4xl font-semibold mb-2">
            {{ `${$h.formatAmount(totalAsset.amount)} ${totalAsset.symbol}` }}
          </div>
          <div class="text-lg font-medium opacity-70">
            {{
              `${$h.formatAmount(totalAsset.quote)} ${totalAsset.quoteSymbol}`
            }}
          </div>
          <img
            src="/src/assets/ronin-white.svg"
            alt=""
            class="absolute bottom-0 right-5 w-13"
          />
        </div>
      </Card>
      <div class="mb-5 flex justify-center">
        <div class="flex space-x-5">
          <Button large-icon="credit-card-fill" disabled></Button>
          <Button
            @click="$router.push('/send')"
            large-icon="plane-fill"
          ></Button>
          <Button large-icon="repeat" disabled></Button>
        </div>
      </div>
      <div class="font-medium text-lg px-5">Assets</div>
      <div class="mt-3 flex flex-col space-y-2">
        <ListItem
          v-for="(data, index) in listViewData"
          :key="`asset-${index}`"
          :prepend-icon="data.icon"
          :title="`${$h.formatAmount(data.amount)} ${data.symbol}`"
          :subtitle="`${$h.formatAmount(data.quoteAmount)} ${data.quoteSymbol}`"
        ></ListItem>
      </div>
    </template>
  </Container>
</template>

<script lang="ts">
import {useAsset} from '@/application/asset';
import {useAuth} from '@/application/auth';
import {chunk, first} from 'lodash';
import {ref, defineComponent, onMounted, computed, watch} from 'vue';
import {useRouter} from 'vue-router';

interface AssetListView {
  amount: number;
  symbol: string;
  icon: string;
  quoteAmount: number;
  quoteSymbol: string;
}

export default defineComponent({
  name: 'Home',
  setup: () => {
    const router = useRouter();
    const auth = useAuth();
    const asset = useAsset();

    const signOut = async () => {
      await auth.signOut();
      router.push('/unlock');
    };

    onMounted(() => {
      if (asset.loaded.value) return;
      asset.init();
    });

    const totalAsset = computed(() => {
      const empty = {amount: 0, symbol: '', quote: 0, quoteSymbol: ''};
      if (!asset.infos.value || !asset.amount.value) return empty;

      const infos = asset.infos.value;
      const amount = asset.amount.value;
      const firstAsset = first(amount.keys); // TODO: Assuming the first asset is the Wallet asset
      if (!firstAsset) return empty;

      const quoteSymbol = asset.quoteSymbol.value;
      const quote =
        amount.data[firstAsset] * (infos[firstAsset].quote[quoteSymbol] || 0);
      return {
        amount: amount.data[firstAsset],
        symbol: firstAsset,
        quote,
        quoteSymbol,
      };
    });
    const listViewData = computed(() => {
      if (!asset.infos.value || !asset.amount.value) return [];
      const {keys, data: amountData} = asset.amount.value;
      const infos = asset.infos.value;
      const quoteSymbol = asset.quoteSymbol.value;
      return keys.reduce((acc, cur) => {
        const asset = infos[cur];
        const view: AssetListView = {
          amount: amountData[cur],
          symbol: cur,
          icon: asset.icon,
          quoteAmount: asset.quote[quoteSymbol] * amountData[cur],
          quoteSymbol: quoteSymbol,
        };
        return acc.concat(view);
      }, [] as AssetListView[]);
    });

    const walletAddr = computed(() => {
      const addr = asset.wallet.value?.addr;
      if (!addr) return '';
      return chunk(addr.split(''), 4)
        .map(a => a.join(''))
        .join(' ');
    });

    return {
      authLoading: auth.loading,
      signOut,
      loadingAsset: asset.loading,
      totalAsset,
      listViewData,
      walletAddr,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-section {
  z-index: -1;
  background-image: url('@/assets/dots-background-2.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
