import {AssetAmount, AssetInfo} from '@/domain/asset';

// TODO: Mock object to be kept else where
const mockAssetInfoMap: Entities<AssetInfo> = {
  keys: ['USD', 'EUR', 'YEN'],
  data: {
    USD: {icon: 'usd', quote: {VND: 23_006.2}},
    EUR: {icon: 'euro', quote: {VND: 27_161}},
    YEN: {icon: 'yen', quote: {VND: 210.15}},
  },
};

const mockAssetAmounts: AssetAmount = {
  USD: 1000,
  EUR: 50,
  YEN: 10000,
};

export class AssetRepository {
  constructor() {}

  async getAssetInfos() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAssetInfoMap;
  }

  async getAssetAmounts() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAssetAmounts;
  }
}
