import {SendAssetPayload} from '@/domain/transaction';
import {AxiosInstance} from 'axios';

export class TransactionRepository {
  constructor(private api: AxiosInstance) {}

  sendAsset(payload: SendAssetPayload) {
    return this.api.post('/transaction', payload);
  }
}
