import { Maybe } from '../types/generated/graphql';

export const compactMap = <T>(arr: Maybe<T>[]): T[] =>
  arr
    .map((e) => {
      if (e !== null && e !== undefined) {
        return e as T;
      }
    })
    .filter((e) => e !== undefined) as T[];
