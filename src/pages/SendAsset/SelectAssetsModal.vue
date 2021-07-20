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
          :title="`${$h.formatAmount(asset.avaiable)} ${asset.symbol}`"
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

export default defineComponent({
  name: 'SelectAssetsModal',
  props: {
    assets: {type: Array, required: true},
  },
  setup: (_, {emit}) => {
    const onAssetClick = (symbol: string) => {
      emit('update:modelValue', false);
      emit('select', symbol);
    };

    return {onAssetClick};
  },
});
</script>
