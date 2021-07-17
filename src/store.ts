import {createStore} from 'vuex';
import {User} from './domain/user';

interface State {
  entryPath: string;
  user: Maybe<User>;
}

const initState = (): State => ({
  entryPath: '',
  user: null,
});

const store = createStore({
  state: initState(),
  mutations: {},
  actions: {},
  modules: {},
});

export default store;
