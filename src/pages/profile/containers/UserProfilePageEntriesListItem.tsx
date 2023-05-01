import { useEntryForLandingPageQuery } from '../../../types/generated/graphql'
import { toInt } from '../../../utils'
import { LandingEntryCard } from '../../landing/components'

type Props = {
  entryID: number
}

export const UserProfilePageEntriesListItem = ({ entryID }: Props) => {
  const { data, loading, error } = useEntryForLandingPageQuery({
    variables: { entryID: toInt(entryID) },
  })

  if (error || loading || !data || !data.entry) {
    return null
  }

  return <LandingEntryCard entry={data.entry} isMobile maxWidth="500px" />
}
