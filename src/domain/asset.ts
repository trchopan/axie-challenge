export interface AssetInfo {
  icon: string;
  quote: {[symbol: string]: number};
}
export type AssetAmount = {[symbol: string]: number};
