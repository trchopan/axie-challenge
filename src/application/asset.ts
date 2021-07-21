import {Errors} from '@/domain';
import {AssetInfoMap, Wallet, WalletAddr} from '@/domain/asset';
import {assetRepo} from '@/repository';
import {InjectionKey, inject, ref} from 'vue';
import {asyncAction} from './common';

const app = {
  loading: ref<boolean>(false),
  error: ref<Maybe<Errors>>(null),
  loaded: ref<boolean>(false),
  selectedSymbol: ref<string>(),
  async init(uid: string) {
    await this.getAssetInfos();
    await this.bindWalletInfo(uid);
    this.loaded.value = true;
  },
  wallet: ref<Maybe<Wallet>>(null),
  bindWalletInfo(uid: string) {
    return asyncAction(this.loading, this.error, async () => {
      await new Promise<void>(resolve =>
        assetRepo.bindWalletInfo(uid, data => {
          this.wallet.value = data;
          resolve();
        })
      );
    });
  },
  allWallets: ref<Maybe<WalletAddr[]>>(null),
  getAllWallets() {
    return asyncAction(this.loading, this.error, async () => {
      this.allWallets.value = await assetRepo.getAllWallets();
    });
  },
  quoteSymbol: ref<string>('VND'), // TODO: Implement dynamic select Quote
  infos: ref<Maybe<AssetInfoMap>>(null),
  getAssetInfos() {
    return asyncAction(this.loading, this.error, async () => {
      this.infos.value = await assetRepo.getAssetInfos();
    });
  },
};

const key: InjectionKey<typeof app> = Symbol();
export const useAsset = () => inject(key, app);
