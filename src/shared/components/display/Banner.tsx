import { Box, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'
import { GrantsPageBannerNoiseGifUrl } from '@/shared/constants'
import { primaryColorsLight } from '@/shared/styles'
import { useMobileMode } from '@/utils'

type BannerProps = {
  title: string
  items?: { label: string; value: string; suffix?: string }[]
  loading: boolean
  reverse?: boolean
}

export const Banner = ({ title, items, loading, reverse = false }: BannerProps) => {
  const isMobile = useMobileMode()

  const Direction = isMobile ? HStack : VStack
  const Column = isMobile ? VStack : HStack

  return (
    <Box position="relative" w="100%">
      <Image
        src={GrantsPageBannerNoiseGifUrl}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        w="100%"
        h="100%"
        objectFit="cover"
        opacity={0.25}
        zIndex={1}
        borderRadius="8px"
        draggable={false}
      />
      <Direction
        width="full"
        border="1px solid"
        justifyContent="center"
        borderColor="primaryAlpha.6"
        p={4}
        borderRadius="8px"
        height="130px"
        maxHeight="130px"
        bg={'primaryAlpha.10'}
        zIndex={2}
      >
        <Box width="100%" justifyContent="center">
          {items && (
            <Column
              w={{ base: '100%', lg: 'auto' }}
              spacing={{ base: 2, lg: 6 }}
              alignItems={{ base: 'flex-end', lg: 'center' }}
              justifyContent="center"
            >
              {items.map((item, index) => (
                <BannerItem
                  key={index}
                  label={item.label}
                  value={item.value}
                  suffix={item.suffix}
                  loading={loading}
                  reverse={reverse}
                />
              ))}
            </Column>
          )}
        </Box>
        <Body
          fontSize={{ base: '18px', lg: '20px' }}
          textAlign={{ base: 'left', lg: 'center' }}
          color="primary1.12"
          width="100%"
        >
          {title}
        </Body>
      </Direction>
    </Box>
  )
}

const BannerItem = ({
  label,
  value,
  loading,
  reverse,
  suffix,
}: {
  label: string
  value: string
  loading: boolean
  reverse?: boolean
  suffix?: string
}) => {
  if (loading) {
    return <Skeleton height="20px" width="60px" />
  }

  if (reverse) {
    return (
      <HStack zIndex={2}>
        <Body fontSize={{ base: 'lg', lg: '3xl' }} dark bold>
          {label}:
        </Body>
        <Body fontSize={{ base: 'lg', lg: '3xl' }} dark bold>
          {value}
        </Body>
        {suffix && (
          <Body fontSize={{ base: 'lg', lg: '3xl' }} dark bold>
            {suffix}
          </Body>
        )}
      </HStack>
    )
  }

  return (
    <HStack>
      <Body fontSize={{ base: 'lg', lg: '3xl' }} dark bold>
        {value}
      </Body>
      <Body fontSize={{ base: 'lg', lg: '3xl' }} dark bold>
        {label}
      </Body>
    </HStack>
  )
}
