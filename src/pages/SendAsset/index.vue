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
    <TextInput
      v-model="recipientAddr"
      :options="allWallets"
      label="TO"
      type="text"
    ></TextInput>
    <TextInput
      v-model="selectedAsset"
      type="text"
      label="ASSET"
      readonly
      @click="showAssetSelection = true"
    >
      <template #prepend>
        <Icon :src="selectedAssetViewData.icon" />
      </template>
      <template #append>
        <Icon src="stack" />
      </template>
    </TextInput>
    <SelectAssetsModal
      v-model="showAssetSelection"
      :assets="assetSelectionViewData"
      @select="onSelectAsset"
    />
    <TextInput
      v-model.number="amount"
      label="AMOUNT"
      :right-label="`AVAILABLE: ${selectedAssetViewData.available}`"
      type="text"
    >
      <template #append>
        <Button small @click="onClickMax(selectedAssetViewData.available)">
          Max
        </Button>
      </template>
    </TextInput>
  </Container>
  <div
    class="fixed bottom-0 left-0 right-0 flex space-x-5 px-5 pb-5 max-w-xl mx-auto"
  >
    <Button @click="$router.push('/')" class="flex-1">Cancel</Button>
    <Button @click="onSendAsset" class="flex-1" primary>Send</Button>
  </div>
  <TransactionProcessModal
    v-model="showTransactionModal"
    :selected-asset="selectedAsset"
  ></TransactionProcessModal>
</template>

<script lang="ts">
import {ref, defineComponent, computed} from 'vue';
import {first, isEmpty} from 'lodash';
import SelectAssetsModal from './SelectAssetsModal.vue';
import TransactionProcessModal from './TransactionProcessModal.vue';
import {useAsset} from '@/application/asset';
import {useTransaction} from '@/application/transaction';

export interface AssetSelectionView {
  icon: string;
  symbol: string;
  available: number;
  quote: number;
  quoteSymbol: string;
}

export default defineComponent({
  name: 'SendAsset',
  components: {
    SelectAssetsModal,
    TransactionProcessModal,
  },
  setup: (_, attrs) => {
    const asset = useAsset();
    const transaciton = useTransaction();

    const walletAddress = computed(() => {
      const wallet = asset.wallet.value;
      if (!wallet?.addr) return '';
      return wallet.addr.replace(/(....).*(....)/, '$1...$2');
    });

    const showAssetSelection = ref<boolean>(false);
    const assetSelectionViewData = computed(() => {
      if (!asset.infos.value || !asset.wallet.value) return [];

      const amountData = asset.wallet.value.assets;
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
          available: amount,
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
        ) || {icon: '', available: 0, symbol: '', quote: 0, quoteSymbol: 0}
    );
    const recipientAddr = ref<string>('');

    const amount = ref<number>(0);

    const onClickMax = (maxAmount: number) => {
      amount.value = maxAmount;
    };

    const onSelectAsset = (symbol: string) => {
      amount.value = 0;
      selectedAsset.value = symbol;
    };

    const showTransactionModal = ref<boolean>(false);

    const onSendAsset = async () => {
      showTransactionModal.value = true;
      await transaciton.sendAsset({
        recipientAddr: recipientAddr.value,
        amount: amount.value,
        symbol: selectedAsset.value,
      });
      amount.value = 0;
    };

    return {
      walletAddress,
      showAssetSelection,
      recipientAddr,
      assetSelectionViewData,
      selectedAsset,
      selectedAssetViewData,
      amount,
      onClickMax,
      onSelectAsset,
      allWallets: asset.allWallets.value,
      showTransactionModal,
      onSendAsset,
    };
  },
});
</script>
