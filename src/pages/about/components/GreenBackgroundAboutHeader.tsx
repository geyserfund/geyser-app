import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { H1, H3 } from '../../../components/typography'
import { getPath } from '../../../constants'
import { lightModeColors } from '../../../styles'
import { LaunchYourProjectButton } from './LaunchYourProjectButton'

export const GreenBackgroundAboutHeader = () => {
  const { t } = useTranslation()
  return (
    <VStack
      width={'100%'}
      backgroundColor="primary.400"
      justifyContent="space-between"
      position={'relative'}
    >
      <VStack
        spacing={30}
        width={'100%'}
        maxWidth={'895px'}
        padding={'40px 40px 80px 40px'}
      >
        <H1 color={lightModeColors.neutral[900]}>
          {t('Transform ideas into real-life projects')}
        </H1>
        <H3 color={lightModeColors.neutral[900]}>
          {t(
            'Geyser is a bitcoin-native crowdfunding platform where you can fund or create your own projects to monetize your ideas with support from global communities.',
          )}
        </H3>
        <HStack justifyContent="center" spacing={30}>
          <LaunchYourProjectButton
            size={{ base: 'sm', lg: 'md' }}
            variant="primaryNeutral"
          />

          <Button
            as={Link}
            to={getPath('landingPage')}
            size={{ base: 'sm', lg: 'md' }}
            variant="secondary"
          >
            {t('Explore projects to fund')}
          </Button>
        </HStack>
      </VStack>
      <Box
        backgroundColor="neutral.0"
        borderRadius={'50%'}
        width={'105%'}
        height={16}
        position={'absolute'}
        bottom={-8}
        zIndex={9}
      ></Box>
    </VStack>
  )
}
