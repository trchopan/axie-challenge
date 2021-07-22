<template>
  <div class="top-section absolute h-96 w-screen"></div>
  <Container class="px-5 py-5">
    <div class="mb-10 flex justify-between">
      <Button>
        <Icon src="circle-fill" size="8px" left />
        Ronin Wallet
      </Button>
      <Button @click="signOut" icon="person-fill"></Button>
    </div>
    <Card primary class="mb-10">
      <div class="px-5 relative">
        <div class="flex justify-between">
          <div class="font-medium whitespace-nowrap mr-3">My Wallet</div>
          <div class="truncate opacity-70 flex-1">
            ({{ formatedWalletAddr }})
          </div>
          <Icon @click="onCopyAddr" src="copy" size="16px"></Icon>
        </div>
        <hr class="mt-3 mb-4 opacity-50" />
        <div class="text-4xl font-semibold mb-2">
          {{ `${$h.formatAmount(totalAsset.amount)} ${totalAsset.symbol}` }}
        </div>
        <div class="text-lg font-medium opacity-70">
          {{ `${$h.formatAmount(totalAsset.quote)} ${totalAsset.quoteSymbol}` }}
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
        <Button @click="$router.push('/send')" large-icon="plane-fill"></Button>
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
  </Container>
</template>

<script lang="ts">
import {useAsset} from '@/application/asset';
import {useAuth} from '@/application/auth';
import {helpers} from '@/plugins/helpers';
import {chunk, first, sum} from 'lodash';
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
  name: 'Main',
  setup: () => {
    const router = useRouter();
    const auth = useAuth();
    const asset = useAsset();

    const signOut = async () => {
      await auth.signOut();
      router.push('/unlock');
    };

    const totalAsset = computed(() => {
      const empty = {amount: 0, symbol: '', quote: 0, quoteSymbol: ''};
      if (!asset.infos.value || !asset.wallet.value) return empty;

      const infos = asset.infos.value;
      const assetsData = asset.wallet.value.assets;
      const firstAsset = first(assetsData.keys); // TODO: Assuming the first asset is the Wallet asset
      if (!firstAsset) return empty;

      const quoteSymbol = asset.quoteSymbol.value;
      const sumQuote = sum(
        assetsData.keys.map(symbol => {
          const amount = assetsData.data[symbol];
          return amount * (infos[symbol].quote[quoteSymbol] || 0);
        })
      );
      return {
        amount: sumQuote / (infos[firstAsset].quote[quoteSymbol] || 0),
        symbol: firstAsset,
        quote: sumQuote,
        quoteSymbol,
      };
    });

    const listViewData = computed(() => {
      if (!asset.infos.value || !asset.wallet.value) return [];
      const {keys, data: assetsData} = asset.wallet.value.assets;
      const infos = asset.infos.value;
      const quoteSymbol = asset.quoteSymbol.value;
      return keys.reduce((acc, cur) => {
        const asset = infos[cur];
        const view: AssetListView = {
          amount: assetsData[cur],
          symbol: cur,
          icon: asset.icon,
          quoteAmount: asset.quote[quoteSymbol] * assetsData[cur],
          quoteSymbol: quoteSymbol,
        };
        return acc.concat(view);
      }, [] as AssetListView[]);
    });

    const formatedWalletAddr = computed(() => {
      const addr = asset.wallet.value?.addr;
      if (!addr) return '';
      return chunk(addr.split(''), 4)
        .map(a => a.join(''))
        .join(' ');
    });

    const onCopyAddr = () => {
      const addr = asset.wallet.value?.addr;
      if (!addr) throw new Error('must have wallet addr');
      helpers.copyToClipboard(addr);
      alert('Wallet Address copied');
    };

    return {
      signOut,
      totalAsset,
      listViewData,
      formatedWalletAddr,
      onCopyAddr,
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
