import {auth, db} from '@/infrastructure/firebase';
import {api} from '@/infrastructure/http';
import {AssetRepository} from './asset';
import {AuthRepository} from './auth';
import {TransactionRepository} from './transaciton';

export const authRepo = new AuthRepository(auth);
export const assetRepo = new AssetRepository(db, api);
export const transactionRepo = new TransactionRepository(api);
