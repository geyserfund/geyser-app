import { useQuery } from '@apollo/client'
import { Box, Button, CloseButton, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import ReactConfetti from 'react-confetti'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { Body2 } from '../../../../../../../../components/typography'
import { useAuthContext } from '../../../../../../../../context'
import { QUERY_USER_BADGES } from '../../../../../../../../graphqlBase/queries/badges'
import { getPath } from '../../../../../../../../shared/constants'
import { lightModeColors, standardPadding } from '../../../../../../../../styles'
import { UserBadge } from '../../../../../../../../types'
import { useFundingContext } from '../../../../../../context/FundingProvider'
import {} from '../../components'
import { ContributionInfoBox, ContributionInfoBoxVersion, ContributionShippingBox } from '../contributionInfo'
import { useIsLightingMethodAtom } from '../qr/states/paymentMethodAtom'
import { SuccessImageComponent } from './components'

type Props = {
  onCloseClick: () => void
}

export const SuccessScreen = ({ onCloseClick }: Props) => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  const { project } = useProjectAtom()

  const isLightning = useIsLightingMethodAtom()

  const {
    fundingTx,
    refetchFundingFlow,
    fundForm: { needsShipping },
  } = useFundingContext()

  useEffect(() => {
    refetchFundingFlow()
  }, [])

  const { user } = useAuthContext()

  const { data } = useQuery<{ userBadges: UserBadge[] }>(QUERY_USER_BADGES, {
    variables: { input: { where: { fundingTxId: fundingTx.id } } },
  })

  const userBadge = data?.userBadges[0]
  const currentBadge = userBadge ? userBadge.badge : undefined

  if (!project) return null

  return (
    <VStack
      ref={containerRef}
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
      <ReactConfetti height={containerRef?.current?.clientHeight || undefined} />

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

        {!isLightning && (
          <Box w="full" bgColor="secondary.blue" borderRadius="8px" padding={standardPadding}>
            <Body2 color="white">
              {t('The Refund File is safe to delete, as your transaction has been successfully processed.')}
            </Body2>
          </Box>
        )}

        {needsShipping ? <ContributionShippingBox creatorEmail={fundingTx.creatorEmail} /> : null}

        <ContributionInfoBox version={ContributionInfoBoxVersion.PRIMARY} showGeyserFee={false} />

        <Button variant="secondary" size="sm" w="full" onClick={onCloseClick}>
          {t('Back to project')}
        </Button>
      </VStack>
    </VStack>
  )
}
