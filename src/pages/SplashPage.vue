<template>
  <div>
    <div>
      Splash Page
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, onMounted} from 'vue';
import {useEntryPath} from '@/application/entryPath';
import {useAuth} from '@/application/auth';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'SplashPage',
  setup: () => {
    const router = useRouter();
    const entryPath = useEntryPath();
    const auth = useAuth();

    onMounted(async () => {
      const user = await auth.init();
      if (!user) {
        router.replace('/unlock');
      } else {
        router.replace(entryPath.value);
      }
    });

    return {entryPath};
  },
});
</script>
