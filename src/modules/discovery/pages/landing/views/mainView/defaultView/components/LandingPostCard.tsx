import { type StackProps, Box, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router'

import { postTypeOptions } from '@/modules/project/pages/projectView/views/posts/utils/postTypeLabel.ts'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import type { PostForLandingPageFragment } from '@/types/index.ts'
import { toInt } from '@/utils/index.ts'

type LandingPostCardProps = {
  post: PostForLandingPageFragment
  isMobile?: boolean
  showProjectCategory?: boolean
} & StackProps

/** Shared landing and discovery card for displaying a post preview. */
export const LandingPostCard = ({ post, isMobile, showProjectCategory = false, ...rest }: LandingPostCardProps) => {
  const navigate = useNavigate()
  const projectLabel = post.project?.subCategory
    ? ProjectSubCategoryLabel[post.project.subCategory]
    : post.project?.category
    ? ProjectCategoryLabel[post.project.category]
    : null
  const postTypeLabel = post.postType ? postTypeOptions.find((option) => option.value === post.postType)?.label : null

  const handleCardClick = () => {
    if (!post.project?.name) {
      return
    }

    navigate(getPath('projectPostView', post.project.name, post.id))
  }

  const renderProjectContent = () => {
    return (
      <HStack w="full" justifyContent="space-between">
        <HStack flex={1} spacing={2} w="full" minWidth={0}>
          {postTypeLabel ? (
            <Body size="sm" light flexShrink={0}>
              {t('{{type}} in', { type: postTypeLabel })}
            </Body>
          ) : null}
          <Body size="sm" light isTruncated>
            {post?.project?.title}
          </Body>
        </HStack>
        {post.publishedAt && (
          <Body size="sm" light>
            {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
          </Body>
        )}
      </HStack>
    )
  }

  return (
    <VStack
      width="100%"
      alignItems="start"
      outlineColor="neutralAlpha.3"
      _hover={{
        cursor: 'pointer',
      }}
      onClick={handleCardClick}
      {...rest}
      position="relative"
      role="group"
    >
      <Box
        position="absolute"
        top={{ base: '-8px', lg: '-16px' }}
        left={{ base: '-8px', lg: '-16px' }}
        right={{ base: '-8px', lg: '-16px' }}
        bottom={{ base: '-8px', lg: '-16px' }}
        borderRadius="8px"
        display="none"
        _groupHover={{
          display: 'block',
          shadow: 'xl',
          outline: '1px solid',
          outlineColor: 'neutralAlpha.6',
          transition: 'all 0.3s ease-in-out',
        }}
      />

      <VStack width="100%" alignItems="start" spacing={isMobile ? 2 : 3}>
        <Box w="full">{renderProjectContent()}</Box>
        <Box width="full" position="relative" padding={2}>
          <ImageWithReload
            src={post.image || post.project?.thumbnailImage || ''}
            alt={post.title}
            width="100%"
            borderRadius="8px"
            aspectRatio={1.45}
            objectFit="cover"
          />
          {showProjectCategory && projectLabel ? (
            <HStack
              position="absolute"
              bottom={4}
              left={4}
              backgroundColor="utils.pbg"
              borderRadius="md"
              paddingX={2}
              paddingY={1}
              boxShadow="sm"
              maxWidth="calc(100% - 32px)"
            >
              <Body size="xs" medium isTruncated>
                {projectLabel}
              </Body>
            </HStack>
          ) : null}
        </Box>
        <VStack
          width="100%"
          alignItems="start"
          overflow="hidden"
          spacing={isMobile ? 2 : 3}
          paddingX={2}
          paddingBottom={2}
        >
          <H3 size={isMobile ? 'sm' : 'md'} medium width="100%" noOfLines={isMobile ? 2 : 1}>
            {post.title}
          </H3>
          <Body
            size={isMobile ? 'sm' : 'md'}
            dark
            wordBreak="break-word"
            whiteSpace="normal"
            lineHeight="1.4"
            width="100%"
            noOfLines={3}
          >
            {post.description}
          </Body>
        </VStack>
      </VStack>
    </VStack>
  )
}
