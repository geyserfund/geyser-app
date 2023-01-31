import { VStack } from '@chakra-ui/react'

import { AlertBox } from '../../../components/ui'
import { User } from '../../../types/generated/graphql'
import { UserProfilePageContributionsListItem } from '../containers'

type Props = {
  profileUser: User
}

export const UserProfilePageContributionsList = ({ profileUser }: Props) => {
  const contributionIDs: number[] = profileUser.fundingTxs
    .map((contribution) => contribution?.id)
    .filter(Boolean)

  if (contributionIDs.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no contributions."
      />
    )
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      {contributionIDs.map((contributionID: number) => (
        <UserProfilePageContributionsListItem
          key={contributionID}
          fundingTxID={contributionID}
        />
      ))}
    </VStack>
  )
}
