import {Errors} from '@/domain';
import {AssetAmount, AssetInfoMap, Wallet} from '@/domain/asset';
import {assetRepo} from '@/repository';
import {InjectionKey, inject, ref} from 'vue';
import {asyncAction} from './common';

const app = {
  loading: ref<boolean>(false),
  error: ref<Maybe<Errors>>(null),
  loaded: ref<boolean>(false),
  selectedSymbol: ref<string>(),
  async init() {
    await this.getAssetInfos();
    await this.getAssetAmounts();
    await this.getWalletInfo();
    this.loaded.value = true;
  },
  wallet: ref<Maybe<Wallet>>(null),
  getWalletInfo() {
    return asyncAction(this.loading, this.error, async () => {
      this.wallet.value = await assetRepo.getWalletInfo();
    });
  },
  quoteSymbol: ref<string>('VND'), // TODO: Implement dynamic select Quote
  infos: ref<Maybe<AssetInfoMap>>(null),
  getAssetInfos() {
    return asyncAction(this.loading, this.error, async () => {
      this.infos.value = await assetRepo.getAssetInfos();
    });
  },
  amount: ref<Maybe<Entities<AssetAmount>>>(),
  getAssetAmounts() {
    return asyncAction(this.loading, this.error, async () => {
      this.amount.value = await assetRepo.getAssetAmounts();
    });
  },
};

const key: InjectionKey<typeof app> = Symbol();
export const useAsset = () => inject(key, app);
