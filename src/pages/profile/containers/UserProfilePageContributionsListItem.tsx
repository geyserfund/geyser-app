import { ProjectFundingContributionsFeedItem } from '../../../components/molecules/projectActivity/ProjectFundingContributionsFeedItem'
import {
  Project,
  useFundingTxForUserContributionQuery,
} from '../../../types/generated/graphql'
import { toInt } from '../../../utils'

type Props = {
  fundingTxID: number
}

export const UserProfilePageContributionsListItem = ({
  fundingTxID,
}: Props) => {
  const { data, loading, error } = useFundingTxForUserContributionQuery({
    variables: { fundingTxId: toInt(fundingTxID) },
  })

  if (error || loading) {
    return null
  }

  const project =
    data?.fundingTx.sourceResource?.__typename === 'Project'
      ? (data.fundingTx.sourceResource as Project)
      : undefined

  return data ? (
    <ProjectFundingContributionsFeedItem
      fundingTx={data.fundingTx}
      width={{
        base: '100%',
        lg: '375px',
      }}
      linkedProject={project}
    />
  ) : null
}
