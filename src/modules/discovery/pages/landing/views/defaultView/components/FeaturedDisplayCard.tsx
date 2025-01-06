import { Box, Link, VStack } from '@chakra-ui/react'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles'

import { FeatureAirtableData } from '../sections/Featured'

export const FeaturedDisplayCard = ({ data }: { data: FeatureAirtableData }) => {
  const hadFeaturedData = data?.Featured_Author && data.Featured_Comment

  return (
    <CardLayout
      direction={{ base: 'column', sm: 'row' }}
      width="100%"
      height={{ base: 'auto', sm: '252px' }}
      alignItems="start"
      spacing="0px"
      padding="0px"
      borderRadius="8px"
      overflow="hidden"
      as={Link}
      href={data.link}
      _hover={{ backgroundColor: 'neutral1.2', cursor: 'pointer' }}
    >
      <Box width={{ base: '100%', sm: '44%' }} height={{ base: '240px', sm: '100%' }} overflow="hidden">
        <ImageWithReload height="full" width="full" src={`${data.imageUrl}`} objectFit="cover" />
      </Box>
      <VStack
        width={{ base: '100%', sm: '55%' }}
        height="100%"
        minWidth="200px"
        alignItems="start"
        spacing="10px"
        overflow="hidden"
        padding={standardPadding}
        justifyContent={{ base: 'start', sm: 'space-between' }}
      >
        <H2 size="2xl" bold>
          {data.Name}
        </H2>
        {hadFeaturedData && (
          <VStack alignItems={'start'}>
            <Body size="xl" fontStyle={'italic'} bold light>
              {data.Featured_Comment}
            </Body>
            <Body>{data.Featured_Author}</Body>
          </VStack>
        )}
      </VStack>
    </CardLayout>
  )
}
