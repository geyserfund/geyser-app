import { Badge, Box, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router'

import { postTypeOptions } from '@/modules/project/pages/projectView/views/posts/utils/postTypeLabel.ts'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import type { PostForLandingPageFragment } from '@/types/index.ts'
import { toInt } from '@/utils/index.ts'

type NewsPostCardProps = {
  post: PostForLandingPageFragment
}

/** Card for displaying a post on the News page with post-type and category badges. */
export const NewsPostCard = ({ post }: NewsPostCardProps) => {
  const navigate = useNavigate()

  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.800')
  const hoverBgColor = useColorModeValue('gray.50', 'gray.750')
  const mutedColor = useColorModeValue('neutral1.11', 'neutral1.10')

  const postTypeLabel = postTypeOptions.find((o) => o.value === post.postType)?.label
  const categoryLabel = post.project?.category ? ProjectCategoryLabel[post.project.category] : null

  const handleClick = () => {
    if (post.project?.name) {
      navigate(getPath('projectPostView', post.project.name, post.id))
    }
  }

  return (
    <VStack
      width="100%"
      height="100%"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="8px"
      bg={bgColor}
      overflow="hidden"
      spacing={0}
      alignItems="stretch"
      transition="all 0.2s"
      _hover={{ bg: hoverBgColor, boxShadow: 'md', transform: 'translateY(-2px)' }}
      cursor="pointer"
      onClick={handleClick}
      role="group"
    >
      <Box width="100%" position="relative" flexShrink={0}>
        <Box aspectRatio={16 / 9}>
          <ImageWithReload
            width="100%"
            height="100%"
            objectFit="cover"
            src={post.image || post.project?.thumbnailImage || ''}
            alt={post.title}
          />
        </Box>
        <HStack position="absolute" top={2} right={2} spacing={1.5} flexWrap="wrap">
          {postTypeLabel && (
            <Badge
              colorScheme="green"
              fontSize="xs"
              paddingX={2}
              paddingY={0.5}
              borderRadius="md"
              textTransform="none"
            >
              {postTypeLabel}
            </Badge>
          )}
          {categoryLabel && (
            <Badge
              colorScheme="cyan"
              fontSize="xs"
              paddingX={2}
              paddingY={0.5}
              borderRadius="md"
              textTransform="none"
            >
              {categoryLabel}
            </Badge>
          )}
        </HStack>
      </Box>

      <VStack padding={4} spacing={2} alignItems="start" flex={1}>
        <Body size="lg" bold noOfLines={2}>
          {post.title}
        </Body>
        <Body size="sm" color={mutedColor} noOfLines={2}>
          {post.description}
        </Body>

        <HStack w="full" justifyContent="space-between" marginTop="auto" pt={1}>
          <HStack spacing={2} alignItems="center">
            {post.project?.thumbnailImage && (
              <ImageWithReload
                width="20px"
                height="20px"
                borderRadius="4px"
                objectFit="cover"
                src={post.project.thumbnailImage}
                alt={post.project.title}
              />
            )}
            <Body size="sm" light isTruncated maxWidth="180px">
              {post.project?.title}
            </Body>
          </HStack>
          {post.publishedAt && (
            <Body size="xs" light flexShrink={0}>
              {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
            </Body>
          )}
        </HStack>
      </VStack>
    </VStack>
  )
}
