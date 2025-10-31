import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useLocation } from 'react-router'

import { H1 } from '@/shared/components/typography/Heading.tsx'

import { FilterComponent } from '../../../../components/FilterComponent.tsx'
import { FeaturedContributions } from '../components/FeaturedContributions.tsx'

export const TitleBar = () => {
  const location = useLocation()

  // TODO: Remove this once the campaigns page is implemented
  if (location.pathname.includes('/campaigns')) {
    return null
  }

  return (
    <VStack w="full" spacing={{ base: 4, lg: 8 }}>
      <HStack flexDirection={{ base: 'column', lg: 'row' }} w="full" justifyContent="space-between">
        <H1 size={{ base: 'md', sm: 'lg', md: '2xl', xl: '3xl' }} bold color="primary1.11" textAlign="center">
          {t('Discover and fund Bitcoin projects worldwide')}
        </H1>
        <FilterComponent />
      </HStack>
      <FeaturedContributions />
    </VStack>
  )
}
