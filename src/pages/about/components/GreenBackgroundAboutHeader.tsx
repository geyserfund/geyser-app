import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H1, H3 } from '../../../components/typography'

export const GreenBackgroundAboutHeader = () => {
  const { t } = useTranslation()
  console.log('this is about page')
  return (
    <VStack
      width={'100%'}
      backgroundColor="primary.400"
      justifyContent="space-between"
      overflow={'hidden'}
    >
      <VStack
        spacing={30}
        width={'100%'}
        maxWidth={'895px'}
        padding={'40px 40px 80px 40px'}
      >
        <H1>{t('Transform ideas into real-life projects')}</H1>
        <H3>
          {t(
            'Geyser is a bitcoin-native crowdfunding platform where you can fund or create your own projects to monetize your ideas with support from global communities.',
          )}
        </H3>
        <HStack justifyContent="center" spacing={30}>
          <Button size={{ base: 'sm', lg: 'md' }} variant="primaryNeutral">
            {t('Launch your project')}
          </Button>
          <Button size={{ base: 'sm', lg: 'md' }} variant="secondary">
            {t('Explore projects to fund')}
          </Button>
        </HStack>
      </VStack>
      <Box
        backgroundColor="neutral.0"
        borderRadius={'50%'}
        width={'105%'}
        height={16}
        marginBottom={'-8'}
      ></Box>
    </VStack>
  )
}
