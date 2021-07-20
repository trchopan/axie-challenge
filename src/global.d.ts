type Maybe<T> = T | null;

interface Entities<T> {
  keys: string[],
  data: {[key: string]: T}
}
