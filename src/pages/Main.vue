<template>
  <Container class="px-5">
    <div class="top-section pt-5 pb-8">
      <div class="flex justify-between">
        <Button>
          <Icon name="circle-fill" size="8px" left />
          Ronin Wallet
        </Button>
        <Button icon="person-fill"></Button>
      </div>
      <Card primary class="mt-5">
        <div class="px-5 relative">
          <div class="flex justify-between">
            <div class="flex space-x-2">
              <div class="font-medium">My Wallet</div>
              <div class="opacity-70">(7300 3777 3888 3334)</div>
            </div>
            <Icon name="copy" size="16px"></Icon>
          </div>
          <hr class="mt-3 mb-4 opacity-50" />
          <div class="text-4xl font-semibold mb-2">
            1,000 USD
          </div>
          <div class="text-lg font-medium opacity-70">
            23,000,000 VND
          </div>
          <img
            src="/src/assets/ronin-white.svg"
            alt=""
            class="absolute bottom-0 right-5 w-13"
          />
        </div>
      </Card>
      <div class="mt-10 flex justify-center">
        <div class="flex space-x-5">
          <Button large-icon="credit-card-fill" disabled></Button>
          <Button large-icon="plane-fill"></Button>
          <Button large-icon="repeat" disabled></Button>
        </div>
      </div>
    </div>
    <div>
      <div class="font-medium text-lg px-5">Assets</div>
      <div class="mt-3 flex flex-col space-y-2">
        <ListItem
          prepend-icon="euro"
          title="50 EUR"
          subtitle="1,531,972 VND"
        ></ListItem>
        <ListItem
          @click="onClickList"
          prepend-icon="usd"
          title="10,000 USD"
          subtitle="30,531,972 VND"
        ></ListItem>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import {useAuth} from '@/application/auth';
import {ref, defineComponent} from 'vue';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'Home',
  setup: () => {
    const router = useRouter();
    const auth = useAuth();

    const signOut = async () => {
      await auth.signOut();
      router.push('/unlock');
    };

    return {
      authLoading: auth.loading,
      signOut,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-section {
  background-image: url('@/assets/dots-background-2.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
