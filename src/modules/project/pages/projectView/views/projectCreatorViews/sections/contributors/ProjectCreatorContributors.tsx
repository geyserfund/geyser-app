import { Box, Button, HStack, Stack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { YellowWarningIcon } from '../../../../../../../../components/icons'
import { H2 } from '../../../../../../../../components/typography'
import { CardLayout, SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { dimensions } from '../../../../../../../../shared/constants'
import { lightModeColors } from '../../../../../../../../styles'
import { FundingTxsWhereFundingStatus, useFundingTxsOrderCountGetQuery } from '../../../../../../../../types'
import { useMobileMode } from '../../../../../../../../utils'
import { useProjectContext } from '../../../../../../context'
import { ContributionView, contributionViewAtom } from './atoms'
import { ExportComponent } from './components'
import { PaymentsAndAccounting } from './sections/paymentsAndAccounting'
import { PendingPayments } from './sections/pendingPayments'
import { Rewards } from '../../../../../../pages1/projectDashboard/views/sales'

export const ProjectCreatorContributors = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { project } = useProjectContext()

  const [contributionView, setContributionView] = useAtom(contributionViewAtom)

  const isActiveVariant = (view: ContributionView) => (contributionView === view ? 'primary' : 'secondary')

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

  const { data, loading } = useFundingTxsOrderCountGetQuery({
    variables: {
      input: {
        where: {
          projectId: project?.id,
          status: FundingTxsWhereFundingStatus.PartiallyPaid,
        },
        pagination: {
          take: 5,
        },
      },
    },
  })

  const count = data?.fundingTxsGet?.pagination?.count || 0

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
          <Stack w="full" direction={{ base: 'column', lg: 'row' }} spacing="10px" justifyContent="space-between">
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
                variant={isActiveVariant(ContributionView.accounts)}
                onClick={() => setContributionView(ContributionView.accounts)}
              >
                {isMobile ? t('Payments') : t('Payments and Accounting')}
              </Button>

              {loading ? (
                <SkeletonLayout w="150px" height="32px" />
              ) : count > 0 ? (
                <Button
                  size="sm"
                  variant={isActiveVariant(ContributionView.pending)}
                  onClick={() => setContributionView(ContributionView.pending)}
                  rightIcon={
                    <Box borderRadius="50%" backgroundColor={lightModeColors.neutral[1000]} margin="2px">
                      <YellowWarningIcon boxSize={'20px'} color="secondary.yellow" />
                    </Box>
                  }
                >
                  {isMobile ? t('Partial') : t('Partial Payments')}
                </Button>
              ) : null}
            </HStack>
            {contributionView === ContributionView.accounts ? <ExportComponent /> : null}
          </Stack>
        </VStack>
        {renderView}
      </CardLayout>
    </VStack>
  )
}
