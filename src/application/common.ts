import {Ref} from 'vue';
import {Errors} from '@/domain/core';

export const asyncAction = async <R>(
  loading: Ref<boolean>,
  error: Ref<Maybe<Errors>>,
  callback: () => Promise<R>
): Promise<Maybe<R>> => {
  loading.value = true;
  error.value = null;

  try {
    return await callback();
  } catch (err) {
    console.error(err);

    if (err.constructor.name === 'Errors') {
      error.value = err;
      return null;
    }

    error.value = new Errors('internal-error');
    return null;
  } finally {
    loading.value = false;
  }
};
