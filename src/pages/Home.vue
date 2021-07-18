<template>
  <div>Home</div>
  <div v-if="authLoading">LOADING...</div>
  <button @click="signOut">Sign Out</button>
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
