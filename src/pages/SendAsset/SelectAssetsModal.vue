<template>
  <Modal>
    <Card class="w-full">
      <TopBar
        append-icon="close"
        @click:append-icon="$emit('update:modelValue', false)"
      >
        Assets
      </TopBar>
      <Container class="w-full">
        <ListItem
          v-for="asset in assets"
          :key="asset.symbol"
          :prepend-icon="asset.icon"
          :title="`${$h.formatAmount(asset.available)} ${asset.symbol}`"
          :subtitle="`${$h.formatAmount(asset.quote)} ${asset.quoteSymbol}`"
          @click="onAssetClick(asset.symbol)"
          tile
        ></ListItem>
      </Container>
    </Card>
  </Modal>
</template>

<script lang="ts">
import {AssetInfo} from '@/domain/asset';
import {ref, defineComponent} from 'vue';
import {AssetSelectionView} from './index.vue';

export default defineComponent({
  name: 'SelectAssetsModal',
  props: {
    assets: {type: Array, required: true},
  },
  setup: (props, {emit}) => {
    const onAssetClick = (symbol: string) => {
      emit('update:modelValue', false);
      emit('select', symbol);
    };

    return {
      onAssetClick,
      assets: (props.assets as unknown) as AssetSelectionView[],
    };
  },
});
</script>
