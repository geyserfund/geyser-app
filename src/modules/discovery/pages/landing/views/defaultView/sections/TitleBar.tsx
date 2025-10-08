import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { FilterComponent } from '@/modules/discovery/filters/FilterComponent.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'

import { FeaturedContributions } from '../components/FeaturedContributions.tsx'

export const TitleBar = () => {
  return (
    <VStack w="full" spacing={6}>
      <HStack w="full" position="relative" justifyContent="space-between" alignItems={'bottom'}>
        <H1 size={{ base: '2xl', xl: '3xl' }} bold>
          {t('Discover and fund Bitcoin projects worldwide')}
        </H1>
        <FilterComponent />
      </HStack>
      <FeaturedContributions />
    </VStack>
  )
}
