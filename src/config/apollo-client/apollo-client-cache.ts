import { InMemoryCache } from '@apollo/client';

type IdentifiableCollection = {
  id: number;
}[];

const mergeIdentifiableCollectionUsingCursorIDs = (
  // eslint-disable-next-line default-param-last
  existing: IdentifiableCollection = [],
  // eslint-disable-next-line default-param-last
  incoming: IdentifiableCollection = [],
  // { args }: FieldFunctionOptions,
) => {
  return [...existing, ...incoming];
};

const merge = (
  existing: IdentifiableCollection,
  incoming: IdentifiableCollection,
  { args, readField }: any,
) => {
  const merged: IdentifiableCollection = existing ? [...existing] : [];
  incoming.forEach((item: any, index) => {
    merged.some(
      (existingValue) =>
        readField('id', existingValue) === readField('id', item),
    );

    merged.push(item);
  });
  return merged;
};

export const cache: InMemoryCache = new InMemoryCache({
  // See https://www.apollographql.com/docs/react/pagination/core-api/#defining-a-field-policy for tips on defining custom GraphQL field policies.
  typePolicies: {
    Query: {
      fields: {
        getEntries: {
          // Don't cache separate results based on
          // any of this field's arguments.
          // See: https://www.apollographql.com/docs/react/caching/cache-field-behavior/#specifying-key-arguments
          keyArgs: false,

          merge: mergeIdentifiableCollectionUsingCursorIDs,
        },
        getFundingTxs: {
          // Don't cache separate results based on
          // any of this field's arguments.
          // See: https://www.apollographql.com/docs/react/caching/cache-field-behavior/#specifying-key-arguments
          keyArgs: ['input', ['where']],
          merge,
        },
        getFunders: {
          keyArgs: false,
          merge,
        },
        projects: {
          // Don't cache separate results based on
          // any of this field's arguments.
          // See: https://www.apollographql.com/docs/react/caching/cache-field-behavior/#specifying-key-arguments
          keyArgs: false,
          merge: false,
        },
      },
    },
  },
});
