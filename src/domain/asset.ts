export interface AssetInfo {
  icon: string;
  quote: {[symbol: string]: number};
}

export type AssetInfoMap = {[symbol: string]: AssetInfo};

export type AssetAmount = number;

export interface Wallet {
  addr: string;
  assets: Entities<AssetAmount>;
}

export type WalletAddr = string;
