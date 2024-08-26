import { Box, HStack, Image, Skeleton, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'
import { GrantsPageBannerNoiseGifUrl } from '@/shared/constants'
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

  return (
    <Box position="relative" w="100%">
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
      >
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
        {isMobile ? (
          <>
            <Body
              size={{ base: 'lg', lg: 'xl' }}
              textAlign={{ base: 'left', lg: 'center' }}
              width="100%"
              dark
              zIndex={2}
            >
              {title}
            </Body>
            <Items items={items} loading={loading} />
          </>
        ) : (
          <>
            <Items items={items} loading={loading} />

            <Body
              size={{ base: 'lg', lg: 'xl' }}
              textAlign={{ base: 'left', lg: 'center' }}
              width="100%"
              dark
              zIndex={2}
            >
              {title}
            </Body>
          </>
        )}
      </Direction>
    </Box>
  )
}

const Items = ({
  items,
  loading,
}: {
  items?: { label: string; value: string; suffix?: string }[]
  loading: boolean
}) => {
  const isMobile = useMobileMode()
  const Column = isMobile ? VStack : HStack

  return (
    <Box width="100%" justifyContent="center">
      {items && (
        <Column
          w={{ base: '100%', lg: 'auto' }}
          spacing={{ base: 2, lg: 6 }}
          alignItems={{ base: 'flex-end', lg: 'center' }}
          justifyContent="center"
        >
          {items.map((item, index) => (
            <BannerItem key={index} label={item.label} value={item.value} suffix={item.suffix} loading={loading} />
          ))}
        </Column>
      )}
    </Box>
  )
}

const BannerItem = ({
  label,
  value,
  loading,
  suffix,
}: {
  label: string
  value: string
  loading: boolean
  suffix?: string
}) => {
  if (loading) {
    return <Skeleton height="20px" width="60px" />
  }

  return (
    <HStack>
      <Body fontSize={{ base: 'lg', lg: '3xl' }} dark bold zIndex={2}>
        {value}
      </Body>
      <Body fontSize={{ base: 'lg', lg: '3xl' }} dark bold zIndex={2}>
        {label}
      </Body>
      {suffix && (
        <Body fontSize={{ base: 'lg', lg: '3xl' }} dark bold zIndex={2}>
          {suffix}
        </Body>
      )}
    </HStack>
  )
}
