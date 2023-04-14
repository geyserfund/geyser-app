import { gql, useQuery } from '@apollo/client'

import { Entry } from '../../../types/generated/graphql'
import { toInt } from '../../../utils'
import { LandingEntryCard } from '../../landing/components'
import { EntryQueryParametersForLandingPage } from '../../landing/feed/types'

type Props = {
  entryID: number
}

const GET_ENTRY = gql`
  query GetEntry($entryID: BigInt!) {
    entry(id: $entryID) ${EntryQueryParametersForLandingPage}
  }
`

type ResponseData = {
  entry: Entry
}

type QueryVariables = {
  entryID: number
}

export const UserProfilePageEntriesListItem = ({ entryID }: Props) => {
  const { data, loading, error } = useQuery<ResponseData, QueryVariables>(
    GET_ENTRY,
    { variables: { entryID: toInt(entryID) } },
  )

  if (error || loading) {
    return null
  }

  return data ? (
    <LandingEntryCard entry={data.entry} isMobile maxWidth="500px" />
  ) : null
}
