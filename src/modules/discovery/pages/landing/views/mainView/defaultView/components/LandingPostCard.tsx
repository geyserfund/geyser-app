import { type StackProps, Box, Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
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
import { useMobileMode } from '@/utils/info/useMobileMode.ts'

type LandingPostCardProps = {
  post: PostForLandingPageFragment
  isMobile?: boolean
  showProjectCategory?: boolean
} & StackProps

/** Shared landing and discovery card for displaying a post preview. */
export const LandingPostCard = ({ post, isMobile, showProjectCategory = false, ...rest }: LandingPostCardProps) => {
  const isMobileMode = useMobileMode()
  const navigate = useNavigate()
  const useCompactLayout = isMobile ?? Boolean(isMobileMode)
  const readMoreColor = useColorModeValue('primary1.11', 'primary1.9')
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
        <Body size="sm" light flex={1} minWidth={0} isTruncated>
          {postTypeLabel ? `${t('{{type}} in', { type: postTypeLabel })} ` : ''}
          {post?.project?.title}
        </Body>
        {useCompactLayout && post.publishedAt && (
          <Body size="sm" light flexShrink={0}>
            {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
          </Body>
        )}
      </HStack>
    )
  }

  const renderPostImage = (compact?: boolean) => (
    <Box
      width={compact ? '128px' : 'full'}
      minWidth={compact ? '128px' : undefined}
      position="relative"
      padding={compact ? 0 : 2}
      flexShrink={0}
    >
      <ImageWithReload
        src={post.image || post.project?.thumbnailImage || ''}
        alt={post.title}
        width="100%"
        borderRadius="innerCard"
        aspectRatio={compact ? 1 : 1.45}
        objectFit="cover"
      />
      {showProjectCategory && projectLabel ? (
        <HStack
          position="absolute"
          bottom={compact ? 2 : 4}
          left={compact ? 2 : 4}
          backgroundColor="utils.pbg"
          borderRadius="md"
          paddingX={2}
          paddingY={1}
          boxShadow="sm"
          maxWidth={compact ? 'calc(100% - 16px)' : 'calc(100% - 32px)'}
        >
          <Body size="xs" medium isTruncated>
            {projectLabel}
          </Body>
        </HStack>
      ) : null}
    </Box>
  )

  return (
    <VStack
      width="100%"
      height="100%"
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
        borderRadius="card"
        display="none"
        _groupHover={{
          display: 'block',
          shadow: 'xl',
          outline: '1px solid',
          outlineColor: 'neutralAlpha.6',
          transition: 'all 0.3s ease-in-out',
        }}
      />

      {useCompactLayout ? (
        <HStack width="100%" height="100%" alignItems="stretch" spacing={0}>
          {renderPostImage(true)}
          <VStack
            flex={1}
            minWidth={0}
            alignItems="start"
            justifyContent="space-between"
            overflow="hidden"
            spacing={2}
            paddingX={3}
            paddingY={3}
          >
            <VStack width="100%" alignItems="start" spacing={2} overflow="hidden">
              <Box w="full">{renderProjectContent()}</Box>
              <H3 size="sm" medium width="100%" noOfLines={2}>
                {post.title}
              </H3>
              <Body
                size="sm"
                dark
                wordBreak="break-word"
                whiteSpace="normal"
                lineHeight="1.4"
                width="100%"
                noOfLines={2}
              >
                {post.description}
              </Body>
            </VStack>
          </VStack>
        </HStack>
      ) : (
        <VStack width="100%" height="100%" alignItems="start" spacing={3}>
          <Box w="full" paddingX={2}>
            {renderProjectContent()}
          </Box>
          {renderPostImage()}
          <VStack flex={1} width="100%" alignItems="start" overflow="hidden" spacing={3} paddingX={2} paddingBottom={2}>
            <HStack width="100%" justifyContent="space-between" alignItems="baseline" spacing={3}>
              <H3 size="md" medium flex={1} minWidth={0} noOfLines={1}>
                {post.title}
              </H3>
              {post.publishedAt && (
                <Body size="sm" light flexShrink={0} textAlign="right">
                  {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
                </Body>
              )}
            </HStack>
            <Body size="md" dark wordBreak="break-word" whiteSpace="normal" lineHeight="1.4" width="100%" noOfLines={3}>
              {post.description}
            </Body>
            <Button
              size="sm"
              variant="ghost"
              color={readMoreColor}
              alignSelf="flex-end"
              paddingX={0}
              minHeight="auto"
              height="auto"
              marginTop="auto"
              opacity={0}
              pointerEvents="none"
              transform="translateY(4px)"
              transition="opacity 0.2s ease, transform 0.2s ease"
              _groupHover={{ opacity: 1, pointerEvents: 'auto', transform: 'translateY(0)' }}
              _groupFocusWithin={{ opacity: 1, pointerEvents: 'auto', transform: 'translateY(0)' }}
              _hover={{ background: 'transparent' }}
              _active={{ background: 'transparent' }}
              onClick={(event) => {
                event.stopPropagation()
                handleCardClick()
              }}
            >
              {t('Read more')}
            </Button>
          </VStack>
        </VStack>
      )}
    </VStack>
  )
}
