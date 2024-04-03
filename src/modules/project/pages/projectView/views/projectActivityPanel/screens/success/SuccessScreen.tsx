import { useQuery } from '@apollo/client'
import { Button, CloseButton, Link as ChakraLink, VStack } from '@chakra-ui/react'
import ReactConfetti from 'react-confetti'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../../../../../constants'
import { useAuthContext } from '../../../../../../../../context'
import { QUERY_USER_BADGES } from '../../../../../../../../graphql/queries/badges'
import { useFundCalc } from '../../../../../../../../helpers'
import { lightModeColors } from '../../../../../../../../styles'
import { Satoshis } from '../../../../../../../../types'
import { Project, UserBadge } from '../../../../../../../../types'
import { useProjectContext } from '../../../../../../context'
import { useFundingContext } from '../../../../../../context/FundingProvider'
import {} from '../../../projectMainBody/components'
import {
  ContributionInfoBox,
  ContributionInfoBoxVersion,
  ContributionShippingBox,
  SuccessImageComponent,
} from './components'

type Props = {
  onCloseClick: () => void
}

export const SuccessScreen = ({ onCloseClick }: Props) => {
  const { t } = useTranslation()

  const {
    project,
    fundForm: { needsShipping, state: fundingState },
  } = useProjectContext()

  const { fundingTx } = useFundingContext()
  const { user } = useAuthContext()

  const { getTotalAmount } = useFundCalc(fundingState)
  const projectUrl = project ? `${window.location.origin}/project/${project.name}` : ''

  const { data } = useQuery<{ userBadges: UserBadge[] }>(QUERY_USER_BADGES, {
    variables: { input: { where: { fundingTxId: fundingTx.id } } },
  })

  const userBadge = data?.userBadges[0]
  const currentBadge = userBadge ? userBadge.badge : undefined

  if (!project) return null

  return (
    <VStack
      paddingX={{
        base: '10px',
        lg: '20px',
      }}
      paddingY={{
        base: '10px',
        lg: '25px',
      }}
      spacing={4}
      width="100%"
      height={{ base: 'calc(100vh - 54px)', lg: '100%' }}
      overflowX="hidden"
      position="relative"
      backgroundColor="primary.400"
      alignItems="center"
      justifyContent="flex-start"
    >
      <ReactConfetti />

      <CloseButton
        borderRadius="50%"
        position="absolute"
        color={lightModeColors.neutral[900]}
        right="10px"
        top="0"
        onClick={onCloseClick}
      />

      <VStack w="full" spacing="20px" pt={4}>
        <SuccessImageComponent currentBadge={currentBadge} />
        {user?.id && currentBadge && (
          <Button variant="secondary" as={Link} size="sm" to={getPath('userProfile', user?.id)} width="100%">
            {t('See badge in Profile')}
          </Button>
        )}

        {needsShipping ? <ContributionShippingBox creatorEmail={fundingTx.creatorEmail} /> : null}

        <ContributionInfoBox
          project={project as Project}
          formState={fundingState}
          contributionAmount={getTotalAmount('sats', project?.name) as Satoshis}
          isFunderAnonymous={fundingState.anonymous}
          funderUsername={fundingState.funderUsername}
          funderEmail={fundingState.email}
          funderAvatarURL={fundingState.funderAvatarURL}
          version={ContributionInfoBoxVersion.PRIMARY}
          referenceCode={fundingTx.uuid || ''}
          fundingTxId={fundingTx.id}
          showGeyserFee={false}
        />

        <Button
          as={ChakraLink}
          href={projectUrl}
          variant="secondary"
          textDecoration={'none'}
          size="sm"
          w="full"
          _hover={{ textDecoration: 'none' }}
        >
          {t('Back to project')}
        </Button>
      </VStack>
    </VStack>
  )
}
