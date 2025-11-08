import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, useLocation } from 'react-router'

import { H1 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { FilterComponent } from '../../../../components/FilterComponent.tsx'
import { FeaturedContributions } from '../components/FeaturedContributions.tsx'

export const TitleBar = () => {
  const location = useLocation()

  // TODO: Remove this once the campaigns page is implemented
  if (
    location.pathname.includes('/campaigns') ||
    location.pathname.includes('/category/') ||
    location.pathname.includes('/all-or-nothing')
  ) {
    return null
  }

  const isNotLandingPage = [
    '/campaigns',
    '/fundraisers',
    '/products',
    '/fundraisers/latest',
    '/fundraisers/region',
  ].includes(location.pathname)

  return (
    <VStack w="full" gap={0}>
      <VStack w="full" spacing={{ base: 4, lg: 4 }}>
        <HStack
          flexDirection={{ base: isNotLandingPage ? 'row' : 'column', lg: 'row' }}
          w="full"
          justifyContent="space-between"
        >
          {isNotLandingPage ? (
            <Button
              as={Link}
              to={getPath('discoveryLanding')}
              variant="surface"
              colorScheme="neutral1"
              color="utils.text"
              minWidth={'80px'}
              leftIcon={<Icon as={PiArrowLeft} />}
            >
              {t('Back')}
            </Button>
          ) : (
            <H1 size={{ base: 'md', sm: 'lg', md: '2xl', xl: '3xl' }} bold color="primary1.11" textAlign="center">
              {t('Discover and fund Bitcoin projects worldwide')}
            </H1>
          )}

          <FilterComponent />
        </HStack>
        <FeaturedContributions />
      </VStack>
    </VStack>
  )
}
