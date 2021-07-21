import {Ref} from 'vue';
import {Errors} from '@/domain/core';
import {isEmpty} from 'lodash';
import {AxiosError} from 'axios';

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
    console.error(err, err.response);

    if (err.constructor.name === 'Errors') {
      error.value = err;
      return null;
    }

    if (!isEmpty((err as AxiosError).response)) {
      const {status, data} = err.response;
      error.value = new Errors(status, data?.message || data?.error || '');
      return null;
    }

    error.value = new Errors('internal-error', String(err));
    return null;
  } finally {
    loading.value = false;
  }
};
