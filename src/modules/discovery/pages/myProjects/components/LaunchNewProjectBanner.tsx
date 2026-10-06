import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocket, PiRocketLaunch } from 'react-icons/pi'

import { useLaunchNow } from '@/modules/project/pages/projectCreation/hooks/useLaunchNow.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { useMobileMode } from '@/utils'

/** Banner on My projects that starts the project creation flow. */
export const LaunchNewProjectBanner = () => {
  const { t } = useTranslation()
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const isMobile = useMobileMode()

  const Direction = isMobile ? VStack : HStack

  return (
    <Direction
      width="100%"
      justifyContent="space-between"
      bg="utils.pbg"
      border="0.5px solid"
      borderColor="neutral1.6"
      borderRadius="card"
      boxShadow="card"
      spacing={8}
      p={8}
    >
      <HStack width="100%" justifyContent="flex-start" alignItems="flex-start" spacing={4}>
        <Icon as={PiRocketLaunch} color="primary1.11" boxSize="28px" flexShrink={0} aria-hidden />
        <VStack alignItems="flex-start" spacing={1}>
          <H3 size="xl" bold color="utils.text">
            {t('Launch your new project')}
          </H3>
          <Body size="sm" color="neutral1.11">
            {t('Transform your idea into real world projects backed by your community.')}
          </Body>
        </VStack>
      </HStack>
      <Button
        onClick={handleLauchNowClick}
        size="md"
        variant="solid"
        colorScheme="primary1"
        rightIcon={<PiRocket size="12px" />}
        width={{ base: '100%', lg: 'auto' }}
        flexShrink={0}
      >
        {t('Create project')}
      </Button>
      {renderModal()}
    </Direction>
  )
}
