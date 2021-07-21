<template>
  <Container class="px-5">
    <div class="robin-logo flex items-center justify-center">
      <img src="/src/assets/ronin-logo.svg" />
    </div>
    <h1 class="text-5xl font-semibold text-center mb-5">Ronin Wallet</h1>
    <h2 class="text-lg text-center mb-3">Your Digital Passport</h2>
    <form @submit.prevent="signIn" class="mt-10 mb-5">
      <TextInput
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="ENTER PASSWORD"
        :disabled="authLoading"
      >
        <template #append>
          <Icon
            src="eye"
            @click="showPassword = !showPassword"
            :class="{'opacity-50': !showPassword}"
          />
        </template>
      </TextInput>
      <div class="flex justify-center">
        <Button
          type="submit"
          :loading="authLoading"
          :disabled="authLoading"
          @click.prevent="signIn"
          primary
          >Unlock</Button
        >
      </div>
    </form>
    <div v-if="authError" class="text-center text-red-400">
      {{ authError.code }}
    </div>
  </Container>
  <div class="fixed bottom-0">
    <TextInput v-model="email" :options="emailOptions"></TextInput>
    <div class="text-gray-400">Password: `abcxyz123`</div>
  </div>
</template>

<script lang="ts">
import {useAsset} from '@/application/asset';
import {useAuth} from '@/application/auth';
import {first} from 'lodash';
import {ref, defineComponent} from 'vue';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'Unlock',
  setup: () => {
    const router = useRouter();
    const auth = useAuth();
    const asset = useAsset();
    const emailOptions = ['abcxyz@gmail.com', 'abcxyz2@gmail.com'];
    const email = ref<string>(first(emailOptions)!);
    const password = ref<string>('');
    const showPassword = ref<boolean>(false);

    if (auth.getUser() !== null) {
      router.replace('/');
    }

    const signIn = async () => {
      const user = await auth.signInEmail({
        email: email.value,
        password: password.value,
      });
      if (user) {
        await asset.bindWalletInfo(user.uid);
        await asset.getAllWallets();
        router.replace('/home');
      }
    };

    return {
      authError: auth.error,
      authLoading: auth.loading,
      emailOptions,
      email,
      password,
      showPassword,
      signIn,
    };
  },
});
</script>

<style lang="scss" scoped>
.robin-logo {
  margin-top: 62px;
  height: 336px;
  background-image: url('@/assets/dots-background.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  img {
    width: 160px;
  }
}
.brand-title {
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 2.85rem;
  line-height: 2.85rem;
}
.brand-subtitle {
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 1.5rem;
}
.password {
  &-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &-btn {
    align-self: center;
  }
}
</style>
