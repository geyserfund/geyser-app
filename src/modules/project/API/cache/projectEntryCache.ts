import { ApolloCache } from '@apollo/client'

import { ProjectEntryViewFragment } from '@/types'

import { QUERY_ENTRY } from '../../graphql/queries/entriesQuery'

export const updateEntryCache = (cache: ApolloCache<any>, entry: ProjectEntryViewFragment) => {
  cache.writeQuery({
    query: QUERY_ENTRY,
    variables: {
      entryId: entry.id,
    },
    data: {
      entry,
    },
  })
}

export const updateProjectEntriesCache = (cache: ApolloCache<any>, entry: ProjectEntryViewFragment) => {
  cache.modify({
    fields: {
      projectEntries(existingEntries = [], { readField }) {
        const isExist = existingEntries.some((val: ProjectEntryViewFragment) => readField('id', val) === entry.id)

        if (!isExist) {
          return [...existingEntries, entry]
        }

        return existingEntries.map((val: ProjectEntryViewFragment) => (readField('id', val) === entry.id ? entry : val))
      },
    },
  })
}
