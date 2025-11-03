import { Button, Flex, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import {
  GEYSER_GET_FEATURED_REWARD_ID,
  GEYSER_PROMOTIONS_PROJECT_NAME,
} from '@/modules/discovery/pages/landing/views/mainView/defaultView/sections/Featured'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPathWithGeyserHero } from '@/shared/constants/index.ts'

/** GetFeaturedSection: Displays the 'Get Featured' promotion card */
export const GetFeaturedSection = () => {
  return (
    <CardLayout w="full">
      <Flex
        w="full"
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        alignItems={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 4, md: 0 }}
      >
        <VStack align="start" spacing={1} w={{ base: 'full', md: 'auto' }}>
          <HStack>
            <Body size="lg" medium>
              {t('Featured for a week')}
            </Body>
            <Body size="md" medium color="neutral1.8">
              {t('$100 per week')}
            </Body>
          </HStack>
          <Body size="sm">{t('Secure a spot in the Featured section of the Landing page for an entire week.')}</Body>
        </VStack>

        <Button
          as={Link}
          to={getPathWithGeyserHero('projectRewardView', GEYSER_PROMOTIONS_PROJECT_NAME, GEYSER_GET_FEATURED_REWARD_ID)}
          size={{ base: 'md', md: 'lg' }}
          variant="solid"
          colorScheme="primary1"
          w={{ base: 'full', md: 'auto' }}
        >
          {t('Get Featured')}
        </Button>
      </Flex>
    </CardLayout>
  )
}
