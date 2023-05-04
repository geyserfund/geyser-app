import { useFeaturedProjectForLandingPageQuery } from '../../../types/generated/graphql'
import { toInt } from '../../../utils'
import { LandingProjectCard } from '../../landing/components'

type Props = {
  projectID: number
}

export const UserProfilePageProjectsListItem = ({ projectID }: Props) => {
  const { data, loading, error } = useFeaturedProjectForLandingPageQuery({
    variables: { where: { id: toInt(projectID) } },
  })

  if (error || loading) {
    return null
  }

  return data && data.project ? (
    <LandingProjectCard project={data.project} />
  ) : null
}
