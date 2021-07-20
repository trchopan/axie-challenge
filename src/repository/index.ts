import {auth} from '@/infrastructure/firebase';
import {AssetRepository} from './asset';
import {AuthRepository} from './auth';

export const authRepo = new AuthRepository(auth);
export const assetRepo = new AssetRepository();
