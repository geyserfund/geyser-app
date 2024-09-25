import { Button, HStack, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiArrowSquareOut } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { getPath } from '../../../../../../../../shared/constants'
import { BadgesBody } from './BadgesBody'

export const Badges = () => {
  const { t } = useTranslation()

  return (
    <>
      <VStack w="full" alignItems={'start'}>
        <HStack w="full" justifyContent={'space-between'}>
          <Body size="xl" medium>
            {t('Badges')}
          </Body>
          <Button
            as={ChakraLink}
            href={getPath('badges')}
            isExternal
            size="sm"
            variant="soft"
            colorScheme="neutral1"
            rightIcon={<PiArrowSquareOut />}
          >
            {t('See all badges')}
          </Button>
        </HStack>
        <BadgesBody />
      </VStack>
    </>
  )
}
