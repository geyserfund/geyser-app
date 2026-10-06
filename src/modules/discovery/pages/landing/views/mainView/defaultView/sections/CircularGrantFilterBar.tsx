import { Box, Button, HStack, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import type { ReactElement } from 'react'
import { PiGlobeHemisphereEastBold, PiGlobeHemisphereWestBold } from 'react-icons/pi'

import { LiveDot } from '@/shared/components/feedback/LiveDot.tsx'

export type CircularGrantLandingFilter = 'featured' | 'latin-america' | 'africa'

const filters: Array<{ icon: ReactElement; label: string; value: CircularGrantLandingFilter }> = [
  { label: 'Live', value: 'featured', icon: <LiveDot marginRight={0} aria-hidden /> },
  { label: 'In Latin America', value: 'latin-america', icon: <Icon as={PiGlobeHemisphereWestBold} aria-hidden /> },
  { label: 'In Africa', value: 'africa', icon: <Icon as={PiGlobeHemisphereEastBold} aria-hidden /> },
]

/** Toggle group that switches the landing page between featured and regional Circular Grants. */
export const CircularGrantFilterBar = ({
  activeFilter,
  onChange,
}: {
  activeFilter: CircularGrantLandingFilter
  onChange: (filter: CircularGrantLandingFilter) => void
}) => {
  return (
    <Box
      w="full"
      overflowX={{ base: 'auto', md: 'visible' }}
      overflowY="hidden"
      py={1}
      px={1}
      mx={-1}
      sx={{
        touchAction: 'pan-x',
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorX: 'contain',
        scrollSnapType: 'x proximity',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      <HStack
        role="group"
        aria-label={t('Filter Circular Grants')}
        spacing={{ base: 2, lg: 3 }}
        flexWrap={{ base: 'nowrap', md: 'wrap' }}
        justifyContent={{ base: 'flex-start', md: 'center' }}
        w={{ base: 'max-content', md: 'full' }}
        minW={{ md: 'full' }}
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value

          return (
            <Button
              key={filter.value}
              size={{ base: 'md', lg: 'lg' }}
              flexShrink={0}
              scrollSnapAlign="start"
              variant="outline"
              colorScheme="neutral1"
              aria-pressed={isActive}
              onClick={() => onChange(filter.value)}
              leftIcon={filter.icon}
            >
              {t(filter.label)}
            </Button>
          )
        })}
      </HStack>
    </Box>
  )
}
