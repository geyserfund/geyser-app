import { useQuery } from '@apollo/client'
import { Button, CloseButton, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { QUERY_USER_BADGES } from '../../../../graphql/queries/badges'
import { useFundCalc } from '../../../../helpers'
import { lightModeColors } from '../../../../styles'
import { Satoshis } from '../../../../types'
import { Project, UserBadge } from '../../../../types'
import {
  ContributionInfoBox,
  ContributionInfoBoxVersion,
} from '../../projectMainBody/components'
import { SuccessImageComponent } from '../components'
import { ContributionShippingBox } from '../components/ContributionShippingBox'

type Props = {
  onCloseClick: () => void
}

export const SuccessScreen = ({ onCloseClick }: Props) => {
  const { t } = useTranslation()
  const [hasCopiedProjectLink, setCopy] = useState(false)

  const {
    project,
    fundingFlow: { fundingTx },
    fundForm: { needsShipping, state: fundingState },
  } = useProjectContext()

  const { getTotalAmount } = useFundCalc(fundingState)

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
        lg: '20px',
      }}
      paddingY={{
        base: '10px',
        lg: '25px',
      }}
      spacing={4}
      width="100%"
      height={{ base: 'calc(100vh - 115px)', lg: '100%' }}
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
        top="-10px"
        onClick={onCloseClick}
      />

      <VStack w="full" spacing="20px" pt={2}>
        <SuccessImageComponent
          currentBadge={currentBadge}
          fundingTx={fundingTx}
        />
        {fundingTx.funder.user?.id && currentBadge && (
          <Button
            variant="secondary"
            as={Link}
            size="sm"
            to={getPath('userProfile', fundingTx.funder.user?.id)}
            width="100%"
          >
            {t('See badge in Profile')}
          </Button>
        )}

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
          showGeyserFee={false}
        />

        {needsShipping ? <ContributionShippingBox /> : null}
      </VStack>
    </VStack>
  )
}
