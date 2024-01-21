import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { Trans, useTranslation } from 'react-i18next'
import { PiWarningCircleFill } from 'react-icons/pi'

import { CardLayout } from '../../../../../components/layouts'
import { Body1, H2 } from '../../../../../components/typography'
import { dimensions } from '../../../../../constants'
import { lightModeColors } from '../../../../../styles'
import { useCustomTheme } from '../../../../../utils'
import { ContributionView, contributionViewAtom } from './atoms'
import Rewards from './sections/rewards/Rewards'

export const ProjectCreatorContributors = () => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const [contributionView, setContributionView] = useAtom(contributionViewAtom)

  const isActiveVariant = (view: ContributionView) =>
    contributionView === view ? 'primary' : 'secondary'

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
              {t('Pending Payments')}
            </Button>
            <Button
              size="sm"
              variant={isActiveVariant(ContributionView.accounts)}
              onClick={() => setContributionView(ContributionView.accounts)}
            >
              {t('Payments and Accounting')}
            </Button>
          </HStack>

          <Body1>
            <Trans i18nKey="This page is for managing your reward sales. Mark your rewards as <0>Shipped</0> or <1>Delivered.</1>">
              {
                'This page is for managing your reward sales. Mark your rewards as '
              }
              <strong>Shipped</strong>
              {' or '}
              <strong>Delivered.</strong>
            </Trans>
          </Body1>
        </VStack>
        <Rewards />
      </CardLayout>
    </VStack>
  )
}
