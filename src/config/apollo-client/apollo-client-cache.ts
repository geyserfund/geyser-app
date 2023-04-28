import { InMemoryCache } from '@apollo/client'

type IdentifiableCollection = {
  id: number
}[]

const mergeIdentifiableCollectionUsingCursorIDs = (
  existing: IdentifiableCollection = [],

  incoming: IdentifiableCollection = [],
  // { args }: FieldFunctionOptions,
) => {
  return [...existing, ...incoming]
}

// The fetch policy still had issues when multiple queries were done in the same component,
// and this caused me to end up store and merge to our own state, instead of apollo

// const merge = (
//   existing: IdentifiableCollection,
//   incoming: IdentifiableCollection,
//   { readField }: any,
// ) => {
//   const merged: IdentifiableCollection = existing ? existing.slice(0) : [];
//   incoming.forEach((item: any) => {
//     merged.some(
//       (existingValue) =>
//         readField('id', existingValue) === readField('id', item),
//     );

//     merged.push(item);
//   });
//   return merged;
// };

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
        // getFundingTxs: {
        //   // Don't cache separate results based on
        //   // any of this field's arguments.
        //   // See: https://www.apollographql.com/docs/react/caching/cache-field-behavior/#specifying-key-arguments
        //   keyArgs: ['input', ['where']],
        //   merge,
        // },
        // getFunders: {
        //   keyArgs: ['input', ['where', 'orderby']],
        //   merge,
        // },
        // getDashboardFunders: {
        //   keyArgs: ['input', ['where', 'orderby']],
        //   merge,
        // },
        projects: {
          // Don't cache separate results based on
          // any of this field's arguments.
          // See: https://www.apollographql.com/docs/react/caching/cache-field-behavior/#specifying-key-arguments
          keyArgs: ['input', ['where', 'orderBy']],
          merge: false,
        },
      },
    },
  },
})
