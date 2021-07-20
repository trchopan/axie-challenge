import {Errors} from '@/domain';
import {AssetAmount, AssetInfo} from '@/domain/asset';
import {assetRepo} from '@/repository';
import {InjectionKey, provide, inject, ref} from 'vue';
import {asyncAction} from './common';

export interface AssetListView {
  amount: number;
  symbol: string;
  icon: string;
  quoteAmount: number;
  quoteSymbol: string;
}

const app = {
  loading: ref<boolean>(false),
  error: ref<Maybe<Errors>>(null),
  selectedSymbol: ref<string>(),
  quoteSymbol: ref<string>('VND'), // TODO: Implement dynamic select Quote
  infos: ref<Maybe<Entities<AssetInfo>>>(null),
  getAssetInfos() {
    return asyncAction(this.loading, this.error, async () => {
      this.infos.value = await assetRepo.getAssetInfos();
    });
  },
  amount: ref<Maybe<AssetAmount>>(),
  getAssetAmounts() {
    return asyncAction(this.loading, this.error, async () => {
      this.amount.value = await assetRepo.getAssetAmounts();
    });
  },
  toListView() {
    if (!this.infos.value || !this.amount.value) return [];
    const {keys: infoKeys, data: infoData} = this.infos.value;
    const amount = this.amount.value;
    const quoteSymbol = this.quoteSymbol.value;
    return infoKeys.reduce((acc, cur) => {
      const asset = infoData[cur];
      const view: AssetListView = {
        amount: amount[cur],
        symbol: cur,
        icon: asset.icon,
        quoteAmount: asset.quote[quoteSymbol] * amount[cur],
        quoteSymbol: quoteSymbol,
      };
      return acc.concat(view);
    }, [] as AssetListView[]);
  },
};

const key: InjectionKey<typeof app> = Symbol();
export const provideAsset = () => provide<typeof app>(key, app);
export const useAsset = () => inject(key, app);
