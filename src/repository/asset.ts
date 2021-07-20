import {AssetAmount, AssetInfoMap} from '@/domain/asset';

// TODO: Mock object to be kept else where
const mockAssetInfoMap: AssetInfoMap = {
  USD: {icon: 'usd', quote: {VND: 23_006.2}},
  EUR: {icon: 'euro', quote: {VND: 27_161}},
  YEN: {icon: 'yen', quote: {VND: 210.15}},
};

const mockAssetAmounts: Entities<AssetAmount> = {
  keys: ['USD', 'EUR', 'YEN'],
  data: {USD: 1000, EUR: 50, YEN: 10000},
};

const mockWalletInfo = {
  addr: '7300377738883334',
};

export class AssetRepository {
  constructor() {}

  async getWalletInfo() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockWalletInfo;
  }

  async getAssetInfos() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAssetInfoMap;
  }

  async getAssetAmounts() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // return {keys: [], data: {}};
    return mockAssetAmounts;
  }
}
