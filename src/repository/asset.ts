import firebase from 'firebase/app';
import {AssetInfoMap, Wallet, WalletAddr} from '@/domain/asset';
import {AxiosInstance} from 'axios';

// TODO: Mock object to be kept else where
const mockAssetInfoMap: AssetInfoMap = {
  USD: {icon: 'usd', quote: {VND: 23_006.2}},
  EUR: {icon: 'euro', quote: {VND: 27_161}},
  YEN: {icon: 'yen', quote: {VND: 210.15}},
};

export class AssetRepository {
  constructor(
    private db: firebase.firestore.Firestore,
    private api: AxiosInstance
  ) {}

  _snapWalletInfo: Maybe<Function> = null;

  async getAllWallets() {
    const {data} = await this.api.get('/all-wallets');
    return data as WalletAddr[];
  }

  bindWalletInfo(uid: string, onData: (doc: Maybe<Wallet>) => void) {
    if (this._snapWalletInfo) this._snapWalletInfo();
    this._snapWalletInfo = this.db.doc(`Wallets/${uid}`).onSnapshot(doc => {
      if (!doc.exists) {
        onData(null);
        return;
      }
      onData(doc.data() as Maybe<Wallet>);
    });
  }

  async getAssetInfos() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAssetInfoMap;
  }
}
