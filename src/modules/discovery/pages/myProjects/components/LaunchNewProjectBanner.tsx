import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiRocket } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography'
import { DiamondUrl, getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

export const LaunchNewProjectBanner = () => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const Direction = isMobile ? VStack : HStack

  return (
    <Direction
      width="100%"
      justifyContent="space-between"
      bg="neutralAlpha.2"
      border="1px solid"
      borderColor="neutralAlpha.6"
      borderRadius="8px"
      spacing={8}
      p={8}
    >
      <HStack width="100%" justifyContent="flex-start" spacing={8}>
        <Image height="86px" src={DiamondUrl} alt="Launch new project" />
        <VStack alignItems="flex-start">
          <Body size="xl" medium>
            {t('Launch your new project')}
          </Body>
          <Body size="sm">{t('Transform your idea into real world projects backed by your community.')}</Body>
        </VStack>
      </HStack>
      <Button
        as={Link}
        to={getPath('launchStart')}
        size="md"
        variant="solid"
        colorScheme="primary1"
        rightIcon={<PiRocket size="12px" />}
        width={{ base: '100%', lg: 'auto' }}
      >
        {t('Create project')}
      </Button>
    </Direction>
  )
}
