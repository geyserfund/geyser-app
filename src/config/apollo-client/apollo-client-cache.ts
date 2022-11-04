import { FieldFunctionOptions, InMemoryCache } from '@apollo/client';
import { PaginationInput } from '../../types/generated/graphql';

type IdentifiableCollection = {
  id: number;
}[];

const mergeIdentifiableCollectionUsingCursorIDs = (
  // eslint-disable-next-line default-param-last
  existing: IdentifiableCollection = [],
  // eslint-disable-next-line default-param-last
  incoming: IdentifiableCollection = [],
  args: FieldFunctionOptions,
) => {
  const paginationInput: PaginationInput = args?.variables?.input?.pagination;

  if (!paginationInput) {
    return [...existing, ...incoming];
  }

  const cursorID = paginationInput.cursor?.id || -1;

  if (cursorID === -1) {
    return [...existing, ...incoming];
  }

  // Slicing is necessary because the existing data is
  // immutable, and frozen in development.
  const merged = existing ? existing.slice(0) : [];

  incoming.forEach((item) => {
    if (item.id > cursorID) {
      merged.push(item);
    }
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
          keyArgs: false,

          merge: mergeIdentifiableCollectionUsingCursorIDs,
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
