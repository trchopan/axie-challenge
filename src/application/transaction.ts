import {Errors} from '@/domain';
import {SendAssetPayload} from '@/domain/transaction';
import {transactionRepo} from '@/repository';
import {InjectionKey, inject, ref} from 'vue';
import {asyncAction} from './common';

const app = {
  loading: ref<boolean>(false),
  error: ref<Maybe<Errors>>(null),
  sendAsset(payload: SendAssetPayload) {
    return asyncAction(this.loading, this.error, async () => {
      await transactionRepo.sendAsset(payload);
    });
  },
};

const key: InjectionKey<typeof app> = Symbol();
export const useTransaction = () => inject(key, app);
