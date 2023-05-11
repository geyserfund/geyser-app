import { useQuery } from '@apollo/client'
import { Button, CloseButton, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { BiCopyAlt } from 'react-icons/bi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { QUERY_USER_BADGES } from '../../../../graphql/queries/badges'
import { useFundCalc } from '../../../../helpers'
import { IFundForm } from '../../../../hooks'
import { Satoshis } from '../../../../types'
import {
  FundingTx,
  Project,
  ProjectFragment,
  UserBadge,
} from '../../../../types/generated/graphql'
import {
  ContributionInfoBox,
  ContributionInfoBoxVersion,
} from '../../projectMainBody/components/ContributionInfoBox'
import { SuccessImageComponent } from '../components'

type Props = {
  fundingState: IFundForm
  fundingTx: FundingTx
  project: ProjectFragment
  handleCloseButton: () => void
}

export const SuccessScreen = ({
  fundingState,
  fundingTx,
  project,
  handleCloseButton,
}: Props) => {
  const [hasCopiedProjectLink, setCopy] = useState(false)

  const { getTotalAmount } = useFundCalc(fundingState)

  const shareProjectWithFriends = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopy(true)
  }

  const { data } = useQuery<{ userBadges: UserBadge[] }>(QUERY_USER_BADGES, {
    variables: { input: { where: { fundingTxId: fundingTx.id } } },
  })

  useEffect(() => {
    if (hasCopiedProjectLink) {
      setTimeout(() => {
        setCopy(false)
      }, 2000)
    }
  }, [hasCopiedProjectLink])

  const userBadge = data?.userBadges[0]
  const currentBadge = userBadge ? userBadge.badge : undefined

  return (
    <VStack
      paddingX={{
        base: '10px',
        md: '20px',
      }}
      paddingY={{
        base: '10px',
        md: '25px',
      }}
      spacing={4}
      width="100%"
      height={{ base: 'calc(100vh - 115px)', md: '100%' }}
      overflow="hidden"
      position="relative"
      backgroundColor="primary.400"
      alignItems="center"
      justifyContent="flex-start"
    >
      <ReactConfetti />

      <CloseButton
        borderRadius="50%"
        position="absolute"
        right="10px"
        top="-20px"
        onClick={handleCloseButton}
      />

      <VStack w="full" spacing="20px">
        <SuccessImageComponent
          currentBadge={currentBadge}
          fundingTx={fundingTx}
        />
        <VStack w="full" spacing="10px">
          {fundingTx.funder.user?.id && currentBadge && (
            <Button
              variant="containedClear"
              as={Link}
              size="sm"
              to={getPath('userProfile', fundingTx.funder.user?.id)}
              width="100%"
            >
              See badge in Profile
            </Button>
          )}
          <Button
            variant="containedClear"
            isActive={hasCopiedProjectLink}
            size="sm"
            leftIcon={
              hasCopiedProjectLink ? <BiCopyAlt /> : <HiOutlineSpeakerphone />
            }
            width="100%"
            onClick={shareProjectWithFriends}
          >
            {hasCopiedProjectLink
              ? 'Project link copied!'
              : 'Copy project link'}
          </Button>
        </VStack>

        <ContributionInfoBox
          project={project as Project}
          formState={fundingState}
          contributionAmount={getTotalAmount('sats', project.name) as Satoshis}
          isFunderAnonymous={fundingState.anonymous}
          funderUsername={fundingState.funderUsername}
          funderEmail={fundingState.email}
          funderAvatarURL={fundingState.funderAvatarURL}
          version={ContributionInfoBoxVersion.PRIMARY}
          referenceCode={fundingTx.uuid}
          showGeyserFee={false}
        />
      </VStack>
    </VStack>
  )
}
