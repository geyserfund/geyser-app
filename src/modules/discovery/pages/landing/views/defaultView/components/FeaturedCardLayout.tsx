import { Box, HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body, H2 } from '@/shared/components/typography'

export const FeaturedCardLayout = ({
  startAnimating,
  comment,
  author,
  loading,
  thumbnailImage,
  title,
  children,
  imageContent,
  ...rest
}: {
  thumbnailImage: string
  title: string
  startAnimating?: boolean
  comment?: string
  author?: string
  loading?: boolean
  children?: React.ReactNode
  imageContent?: React.ReactNode
} & CardLayoutProps) => {
  if (loading) {
    return <FeaturedCardSkeleton />
  }

  return (
    <CardLayout
      direction={'column'}
      width="100%"
      height="auto"
      alignItems="start"
      padding="0px"
      overflow="hidden"
      noborder
      _hover={{ backgroundColor: 'neutral1.2', cursor: 'pointer' }}
      {...rest}
    >
      <HStack
        width="100%"
        height="100%"
        maxHeight="350px"
        aspectRatio={3 / 2}
        overflow="hidden"
        borderRadius="8px"
        position="relative"
        justifyContent="center"
      >
        <ImageWithReload
          height="full"
          width="full"
          src={`${thumbnailImage}`}
          alt={`${title} project thumbnail image`}
          objectFit="cover"
        />
        {imageContent}
      </HStack>
      <VStack
        width="100%"
        height="100%"
        minWidth="200px"
        alignItems="start"
        spacing="10px"
        overflow="hidden"
        justifyContent={{ base: 'start', sm: 'space-between' }}
      >
        <H2 size="2xl" bold width="100%" isTruncated>
          {title}
        </H2>

        {(comment || author) && (
          <VStack alignItems={'start'}>
            <Body size="xl" fontStyle={'italic'} bold light>
              {comment}
            </Body>
            <Body>{author}</Body>
          </VStack>
        )}
        {children}
      </VStack>
    </CardLayout>
  )
}

export const FeaturedCardSkeleton = () => {
  return (
    <CardLayout
      direction={'column'}
      width="100%"
      height="auto"
      alignItems="start"
      padding="0px"
      overflow="hidden"
      borderRadius="8px"
      noborder
    >
      <Box width="100%" height="auto" maxHeight="340x" aspectRatio={3 / 2} overflow="hidden" borderRadius="8px">
        <Skeleton height="full" width="full" />
      </Box>
      <VStack
        width="100%"
        height="100%"
        minWidth="200px"
        alignItems="start"
        spacing="10px"
        overflow="hidden"
        justifyContent={{ base: 'start', sm: 'space-between' }}
      >
        <VStack alignItems={'start'} w="full">
          <SkeletonLayout height="29px" width="200px" />

          <SkeletonText noOfLines={6} w="full" />
        </VStack>
        <HStack spacing={3} justifySelf={'end'} flexWrap={'wrap'}>
          <SkeletonLayout height="22px" width="40px" />
          <SkeletonLayout height="22px" width="60px" />
        </HStack>
      </VStack>
    </CardLayout>
  )
}
