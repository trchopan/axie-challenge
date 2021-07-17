<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {provideEntryPath, useEntryPath} from '@/application/entryPath';
import {provideAuth} from '@/application/auth';

export default defineComponent({
  name: 'App',
  setup: () => {
    provideEntryPath();
    provideAuth();

    const route = useRoute();
    const router = useRouter();
    const entryPath = useEntryPath();

    onMounted(async () => {
      await router.isReady();
      if (route.path !== '/') {
        entryPath.value = route.path;
        router.replace('/');
      }
    });

    return {route};
  },
});
</script>

<style></style>
