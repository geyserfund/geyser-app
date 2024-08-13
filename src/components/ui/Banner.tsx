import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'
import { primaryColorsLight } from '@/styles/colors'
import { useMobileMode } from '@/utils'

type BannerProps = {
  title: string
  items: { label: string; value: string }[]
  loading: boolean
}

export const Banner = ({ title, items, loading }: BannerProps) => {
  const isMobile = useMobileMode()

  const Direction = isMobile ? HStack : VStack
  const Column = isMobile ? VStack : HStack

  return (
    <Direction
      width="full"
      border="1px solid"
      justifyContent="center"
      borderColor="primaryAlpha.6"
      bgGradient={`linear(to-r, ${primaryColorsLight[200]}, ${primaryColorsLight[50]})`}
      p={4}
      borderRadius="md"
      height="130px"
      maxHeight="130px"
    >
      <Box>
        <Body fontSize={{ base: '16px', lg: '20px' }} color="primary1.12">
          {title}
        </Body>
      </Box>
      <Column
        w={{ base: '100%', lg: 'auto' }}
        spacing={{ base: 2, lg: 6 }}
        alignItems={{ base: 'flex-end', lg: 'center' }}
      >
        {items.map((item, index) => (
          <BannerItem key={index} label={item.label} value={item.value} loading={loading} />
        ))}
      </Column>
    </Direction>
  )
}

const BannerItem = ({ label, value, loading }: { label: string; value: string; loading: boolean }) => {
  if (loading) {
    return <Skeleton height="20px" width="60px" />
  }

  return (
    <HStack>
      <Body fontSize={{ base: '16px', lg: '24px' }} color="neutral1.12" bold>
        {value}
      </Body>
      <Body fontSize={{ base: '16px', lg: '24px' }} color="neutral1.12" bold>
        {label}
      </Body>
    </HStack>
  )
}
