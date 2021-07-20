import {InjectionKey, inject, ref} from 'vue';
import {authRepo} from '@/repository';
import {Errors} from '@/domain';
import {asyncAction} from '@/application/common';

const auth = {
  loading: ref<boolean>(false),
  error: ref<Maybe<Errors>>(null),
  getUser() {
    return authRepo.getCurrentUser();
  },
  signInEmail({email, password}: {email: string; password: string}) {
    return asyncAction(this.loading, this.error, () =>
      authRepo.signInEmail(email, password)
    );
  },
  signOut() {
    return asyncAction(this.loading, this.error, () => authRepo.signOut());
  },
};

const key: InjectionKey<typeof auth> = Symbol();
export const useAuth = () => inject(key, auth);
