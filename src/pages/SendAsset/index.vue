<template>
  <TopBar
    prepend-icon="chevron-left"
    @click:prepend-icon="$router.replace('/')"
  >
    Send
  </TopBar>
  <Container class="px-5">
    <TextInput
      v-model="walletAddress"
      label="FROM"
      type="ext"
      disabled
      class="mt-10"
    >
      <template #prepend>
        <div class="font-medium whitespace-no-wrap">My Wallet</div>
      </template>
    </TextInput>
    <TextInput v-model="toAddress" label="TO" type="text"></TextInput>
    <TextInput
      v-model="selectedAsset"
      type="text"
      label="ASSET"
      readonly
      @click="showAssetSelection = true"
    >
      <template #prepend>
        <Icon :name="selectedAssetViewData.icon" />
      </template>
      <template #append>
        <Icon name="stack" />
      </template>
    </TextInput>
    <SelectAssetsModal
      v-model="showAssetSelection"
      :assets="assetSelectionViewData"
      @select="selectedAsset = $event"
    />
    <TextInput
      v-model="amount"
      label="AMOUNT"
      :right-label="`AVAILABLE: ${selectedAssetViewData.avaiable}`"
      type="text"
    >
      <template #append>
        <Button small @click="onClickMax">Max</Button>
      </template>
    </TextInput>
  </Container>
  <div class="fixed bottom-0 left-0 right-0 flex space-x-5 px-5 pb-5">
    <Button class="flex-1">Cancel</Button>
    <Button class="flex-1" primary>Send</Button>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, computed} from 'vue';
import {first, isEmpty} from 'lodash';
import SelectAssetsModal from './SelectAssetsModal.vue';
import {useAsset} from '@/application/asset';

interface AssetSelectionView {
  icon: string;
  symbol: string;
  avaiable: number;
  quote: number;
  quoteSymbol: string;
}

export default defineComponent({
  name: 'SendAsset',
  components: {
    SelectAssetsModal,
  },
  setup: (_, attrs) => {
    const asset = useAsset();

    const walletAddress = computed(() => {
      const wallet = asset.wallet.value;
      if (!wallet?.addr) return '';
      return wallet.addr.replace(/(....).*(....)/, '$1...$2');
    });

    const showAssetSelection = ref<boolean>(false);
    const assetSelectionViewData = computed(() => {
      if (!asset.infos.value || !asset.amount.value) return [];

      const amountData = asset.amount.value;
      if (isEmpty(amountData?.keys)) return [];

      const infos = asset.infos.value;
      const quoteSymbol = asset.quoteSymbol.value;
      return amountData!.keys.reduce((acc, cur) => {
        const amount = amountData.data[cur];
        const icon = infos[cur].icon;
        const quote = infos[cur].quote[quoteSymbol] * amount;
        return acc.concat({
          icon,
          symbol: cur,
          avaiable: amount,
          quote,
          quoteSymbol,
        });
      }, [] as AssetSelectionView[]);
    });
    const selectedAsset = ref<string>(
      first(assetSelectionViewData.value)?.symbol || ''
    );
    const selectedAssetViewData = computed(
      () =>
        assetSelectionViewData.value.find(
          s => s.symbol === selectedAsset.value
        ) || {icon: ''}
    );
    const toAddress = ref<string>('');

    const amount = ref<number>(0);

    const onClickMax = (maxAmount: number) => {
      amount.value = maxAmount;
    };

    return {
      walletAddress,
      showAssetSelection,
      toAddress,
      assetSelectionViewData,
      selectedAsset,
      selectedAssetViewData,
      amount,
      onClickMax,
    };
  },
});
</script>
