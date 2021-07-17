import {InjectionKey, provide, inject, ref} from 'vue';
import {auth as FAuth} from '@/infrastructure/firebase';
import {AuthRepository} from '@/repository/auth';
import {Errors, User} from '@/domain';
import {asyncAction} from '@/application/common';

const repo = new AuthRepository(FAuth);

const auth = {
  loading: ref<boolean>(false),
  error: ref<Maybe<Errors>>(null),
  user: ref<Maybe<User>>(null),
  init() {
    return new Promise<Maybe<User>>(resolve =>
      repo.onAuthStateChanged(user => {
        this.user.value = user;
        resolve(user);
      })
    );
  },
  signInEmail({email, password}: {email: string; password: string}) {
    return asyncAction(this.loading, this.error, () =>
      repo.signInEmail(email, password)
    );
  },
  signOut() {
    return asyncAction(this.loading, this.error, () => repo.signOut());
  },
};

const key: InjectionKey<typeof auth> = Symbol();

export const provideAuth = () => provide<typeof auth>(key, auth);

export const useAuth = () => inject(key, auth);
