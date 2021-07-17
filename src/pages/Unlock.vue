<template>
  <div>Unlock</div>
  <pre v-if="authError">{{ authError }}</pre>
  <div v-if="authLoading">LOADING...</div>
  <form v-else @submit.prevent="signIn">
    <input v-model="password" type="password" />
    <button type="submit">Sign In</button>
  </form>
</template>

<script lang="ts">
import {useAuth} from '@/application/auth';
import {ref, defineComponent} from 'vue';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'Unlock',
  setup: () => {
    const router = useRouter();
    const auth = useAuth();
    const password = ref<string>('');

    const signIn = async () => {
      const user = await auth.signInEmail({
        email: 'abcxyz@gmail.com',
        password: password.value,
      });
      if (user) {
        router.replace('/home');
      }
    };

    return {authError: auth.error, authLoading: auth.loading, password, signIn};
  },
});
</script>
