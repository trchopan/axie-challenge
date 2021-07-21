import {auth, db} from '@/infrastructure/firebase';
import {api} from '@/infrastructure/http';
import {AssetRepository} from './asset';
import {AuthRepository} from './auth';

export const authRepo = new AuthRepository(auth);
export const assetRepo = new AssetRepository(db, api);
