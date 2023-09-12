import { Button, HStack, Stack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../../components/layouts'
import { Body2, H3 } from '../../../../../../components/typography'
import { ImageWithReload } from '../../../../../../components/ui'
import { getPath } from '../../../../../../constants'
import { useProjectContext } from '../../../../../../context'

export const ActivityComponent = () => {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  console.log('checking path', getPath('projectContributors', project?.name))
  return (
    <Stack w="full" direction={{ base: 'column', lg: 'row' }}>
      <VStack flex={1} w="full" alignItems="start" spacing="10px">
        <H3>{t('Latest Activity')}</H3>
        <CardLayout w="full" direction="column" spacing="10px">
          <HStack p="10px">
            <ImageWithReload
              height="60px"
              width="85px"
              src={'https://blahblahg.png'}
              borderRadius="8px"
            />
            <VStack w="full" flex={1} alignItems="start">
              <H3 fontWeight={600}>{t('title')}</H3>
              <Body2 color="neutral.600">{t('12 0 2032')}</Body2>
            </VStack>
          </HStack>
          <VStack w="full">
            <HStack
              w="full"
              borderTop="1px solid"
              borderColor="neutral.200"
              justifyContent={'space-between'}
              py="10px"
            >
              <Body2>{t('Sats raised')}</Body2>
              <Body2>{t('1,123')}</Body2>
            </HStack>
            <HStack
              w="full"
              borderTop="1px solid"
              borderColor="neutral.200"
              justifyContent={'space-between'}
              py="10px"
            >
              <Body2>{t('Views')}</Body2>
              <Body2>{t('25')}</Body2>
            </HStack>
          </VStack>
          <Button w="full" variant="primary">
            {t('Share')}
          </Button>
        </CardLayout>
      </VStack>
      <VStack flex={1} w="full" alignItems="start" spacing="10px">
        <H3>{t('Draft')}</H3>
        <CardLayout w="full"></CardLayout>
      </VStack>
    </Stack>
  )
}
