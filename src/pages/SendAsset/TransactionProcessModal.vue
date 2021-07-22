<template>
  <Modal v-model="modelValue">
    <Card class="w-full px-5">
      <div v-if="loadingTransaction" class="flex justify-center">
        <Loading></Loading>
      </div>
      <Container v-else class="w-full px-5">
        <template v-if="errorTransaction">{{ errorTransaction }}</template>
        <template v-else>
          <div class="flex justify-center font-medium text-xl mb-5">
            Successfully sent
          </div>
          <div>
            Your <b>{{ selectedAsset }}</b> has been sent!<br />
            Thank you for using our service
          </div>
        </template>
        <div class="flex">
          <Button
            class="mt-5 flex-1"
            primary
            block
            @click="$emit('update:modelValue', false)"
          >
            OK
          </Button>
        </div>
      </Container>
    </Card>
  </Modal>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';
import {useTransaction} from '@/application/transaction';

export default defineComponent({
  name: 'TransactionProcessModal',
  props: {
    modelValue: {type: Boolean, required: true},
    selectedAsset: {type: String, required: true},
  },
  setup: () => {
    const transaciton = useTransaction();

    return {
      errorTransaction: transaciton.error,
      loadingTransaction: transaciton.loading,
    };
  },
});
</script>
