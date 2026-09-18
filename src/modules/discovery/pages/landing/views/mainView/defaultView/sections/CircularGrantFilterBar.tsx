import { Box, Button, HStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'

export type CircularGrantLandingFilter = 'featured' | 'latin-america' | 'africa'

const filters: Array<{ emoji: string; label: string; value: CircularGrantLandingFilter }> = [
  { label: 'Featured', value: 'featured', emoji: '⭐' },
  { label: 'In Latin America', value: 'latin-america', emoji: '🌎' },
  { label: 'In Africa', value: 'africa', emoji: '🌍' },
]

export const CircularGrantFilterBar = ({
  activeFilter,
  onChange,
}: {
  activeFilter: CircularGrantLandingFilter
  onChange: (filter: CircularGrantLandingFilter) => void
}) => {
  const inactiveBg = useColorModeValue('utils.pbg', 'utils.surface')
  const activeBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const hoverBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const inactiveBorderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const activeBorderColor = useColorModeValue('neutral1.6', 'neutral1.7')
  const buttonTextColor = useColorModeValue('neutral1.11', 'neutral1.11')

  return (
    <Box
      w="full"
      overflowX={{ base: 'auto', md: 'visible' }}
      overflowY="hidden"
      py={2}
      px={1}
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
        spacing={3}
        flexWrap={{ base: 'nowrap', md: 'wrap' }}
        justifyContent={{ base: 'flex-start', md: 'center' }}
        w={{ base: 'max-content', md: 'full' }}
        minW={{ md: 'full' }}
      >
        {filters.map((filter) => (
          <Button
            key={filter.value}
            size="xl"
            height="56px"
            flexShrink={0}
            scrollSnapAlign="start"
            variant="ghost"
            color={buttonTextColor}
            border="1px solid"
            borderColor={activeFilter === filter.value ? activeBorderColor : inactiveBorderColor}
            onClick={() => onChange(filter.value)}
            leftIcon={<span>{filter.emoji}</span>}
            bg={activeFilter === filter.value ? activeBg : inactiveBg}
            fontSize={{ base: 'md', lg: 'lg' }}
            fontWeight={600}
            paddingX={{ base: 5, lg: 6 }}
            _hover={{
              bg: hoverBg,
              borderColor: activeBorderColor,
            }}
            _active={{ bg: hoverBg }}
          >
            {t(filter.label)}
          </Button>
        ))}
      </HStack>
    </Box>
  )
}
