import { gql, useQuery } from '@apollo/client'

import { ProjectEntryCard } from '../../../components/molecules'
import { Entry } from '../../../types/generated/graphql'
import { toInt } from '../../../utils'

type Props = {
  entryID: number
}

const GET_ENTRY = gql`
  query GetEntry($entryID: BigInt!) {
    entry(id: $entryID) {
      id
      title
      description
      image
      fundersCount
      amountFunded
      type
      project {
        id
        title
      }
    }
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

  return data ? <ProjectEntryCard entry={data.entry} /> : null
}
