import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PiWarningCircleFill } from 'react-icons/pi'

import { CardLayout } from '../../../../../components/layouts'
import { H2 } from '../../../../../components/typography'
import { dimensions } from '../../../../../constants'
import { lightModeColors } from '../../../../../styles'
import { useCustomTheme, useMobileMode } from '../../../../../utils'
import { ContributionView, contributionViewAtom } from './atoms'
import { PaymentsAndAccounting } from './sections/paymentsAndAccounting'
import { PendingPayments } from './sections/pendingPayments'
import { Rewards } from './sections/rewards'

export const ProjectCreatorContributors = () => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()
  const isMobile = useMobileMode()

  const [contributionView, setContributionView] = useAtom(contributionViewAtom)

  const isActiveVariant = (view: ContributionView) =>
    contributionView === view ? 'primary' : 'secondary'

  const renderView = useMemo(() => {
    switch (contributionView) {
      case ContributionView.rewards:
        return <Rewards />
      case ContributionView.pending:
        return <PendingPayments />
      case ContributionView.accounts:
        return <PaymentsAndAccounting />
      default:
        return <Rewards />
    }
  }, [contributionView])

  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      height={{
        base: 'auto',
        lg: `calc(100vh - ${dimensions.topNavBar.desktop.height}px)`,
      }}
      pt={{ base: '0px', lg: '20px' }}
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '0px', lg: '40px' }}
      spacing={{ base: '10px', lg: '20px' }}
      overflow="hidden"
    >
      <CardLayout
        mobileDense
        direction="column"
        w="full"
        height="100%"
        alignItems="start"
        spacing="0px"
        pt={{ base: '10px', lg: '20px' }}
        px={0}
        overflowY={'auto'}
      >
        <VStack
          w={'full'}
          flexShrink={0}
          py="10px"
          px={{ base: '10px', lg: '20px' }}
          alignItems="start"
          backgroundColor="neutral.0"
          zIndex={10}
          spacing={{ base: '10px', lg: '20px' }}
        >
          <H2>{t('Contributors')}</H2>
          <HStack spacing="10px" flexWrap={'wrap'}>
            <Button
              size="sm"
              variant={isActiveVariant(ContributionView.rewards)}
              onClick={() => setContributionView(ContributionView.rewards)}
            >
              {t('Rewards')}
            </Button>
            <Button
              size="sm"
              variant={isActiveVariant(ContributionView.pending)}
              onClick={() => setContributionView(ContributionView.pending)}
              rightIcon={
                <Box
                  borderRadius="50%"
                  backgroundColor={lightModeColors.neutral[1000]}
                >
                  <PiWarningCircleFill
                    fill={colors.secondary.yellow}
                    fontSize={'20px'}
                  />
                </Box>
              }
            >
              {isMobile ? t('Partial') : t('Partial Payments')}
            </Button>
            <Button
              size="sm"
              variant={isActiveVariant(ContributionView.accounts)}
              onClick={() => setContributionView(ContributionView.accounts)}
            >
              {isMobile ? t('Payments') : t('Payments and Accounting')}
            </Button>
          </HStack>
        </VStack>
        {renderView}
      </CardLayout>
    </VStack>
  )
}
