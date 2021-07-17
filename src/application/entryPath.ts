import {InjectionKey, provide, inject, ref, Ref} from 'vue';

const key: InjectionKey<Ref<string>> = Symbol();

const entryPath = ref('');

export const provideEntryPath = () => provide<Ref<string>>(key, entryPath);

export const useEntryPath = () => inject(key, entryPath);
