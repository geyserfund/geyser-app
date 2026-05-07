import { Badge, Box, HStack, Icon, Image, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { PiLink } from 'react-icons/pi'
import { Link } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { PostStatus, ProjectPostFragment } from '@/types'
import { toInt } from '@/utils'

import { useWriteUpdateModal } from '../../../hooks/useWriteUpdateModal.ts'
import { postTypeOptions } from '../utils/postTypeLabel.ts'
import { PostEditMenu } from './PostEditMenu.tsx'
import { PostShare } from './PostShare.tsx'
import { ProjectPostCardThumbnailPlaceholder } from './ProjectPostCardThumbnailPlaceholder.tsx'

/** Returns true when the entire trimmed string is a valid URL */
const isValidUrl = (str: string): boolean => {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/** Extracts the domain from a URL string, or returns the original string on failure */
const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

type Props = {
  post: ProjectPostFragment
}

export const ProjectPostCard = ({ post }: Props) => {
  const { project } = useProjectAtom()
  const { openWriteUpdateModal } = useWriteUpdateModal()

  const isDraft = useMemo(() => post.status === PostStatus.Unpublished, [post.status])

  const descriptionTrimmed = post.description?.trim() ?? ''
  const isLinkOnly = isValidUrl(descriptionTrimmed)

  const linkDomain = isLinkOnly ? extractDomain(descriptionTrimmed) : null

  const handleDraftClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openWriteUpdateModal(String(post.id))
  }

  return (
    <CardLayout
      hover
      dense
      spacing={0}
      w="100%"
      role="group"
      as={isDraft ? undefined : Link}
      to={isDraft ? undefined : getPath('projectPostView', project.name, post.id)}
      onClick={isDraft ? handleDraftClick : undefined}
      cursor={isDraft ? 'pointer' : undefined}
    >
      {/* Media area */}
      {post.image && (
        <Box w="full" maxHeight="280px" overflow="hidden" position="relative">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={post.image}
            alt={post.title}
            fallback={<ProjectPostCardThumbnailPlaceholder />}
            transition="transform 0.3s ease"
            _groupHover={{ transform: 'scale(1.03)' }}
          />
          {isDraft && (
            <Badge
              position="absolute"
              top={2}
              left={2}
              variant="solid"
              colorScheme="orange"
              fontSize="xs"
            >
              {t('Draft')}
            </Badge>
          )}
        </Box>
      )}

      <VStack w="full" p={{ base: 3, lg: 4 }} spacing={2} alignItems="start">
        {/* Status badges */}
        <HStack spacing={2} flexWrap="wrap">
          {!post.image && isDraft && (
            <Badge variant="soft" colorScheme="neutral1">
              {t('Draft')}
            </Badge>
          )}
          {post.postType && (
            <Badge variant="soft" colorScheme="neutral1" gap={2}>
              <Icon as={postTypeOptions.find((o) => o.value === post.postType)?.icon} />
              {postTypeOptions.find((o) => o.value === post.postType)?.label}
            </Badge>
          )}
        </HStack>

        {/* Title (only shown for posts with a non-link-only description) */}
        {!isLinkOnly && post.title && post.title !== 'Project update' && (
          <Body size="lg" medium dark>
            {post.title}
          </Body>
        )}

        {/* Description or link domain */}
        {isLinkOnly ? (
          <HStack spacing={1} color="neutral1.9">
            <Icon as={PiLink} fontSize="12px" />
            <Body size="xs" muted isTruncated>
              {linkDomain}
            </Body>
          </HStack>
        ) : (
          post.description && (
            <Body medium dark wordBreak="break-word" noOfLines={3}>
              {post.description}
            </Body>
          )
        )}

        {/* Date */}
        {post.publishedAt && (
          <Body size="xs" muted>
            {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
          </Body>
        )}

        {/* Action buttons — visible on hover */}
        <HStack
          w="full"
          justifyContent="flex-end"
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.2s"
        >
          <PostEditMenu post={post} />
          {!isDraft && <PostShare size="md" post={post} project={project} />}
        </HStack>
      </VStack>
    </CardLayout>
  )
}

export const ProjectPostCardSkeleton = () => {
  return (
    <CardLayout dense spacing={0} w="100%">
      <Box w="full" maxHeight="280px" overflow="hidden">
        <SkeletonLayout w="full" height="200px" />
      </Box>

      <VStack w="full" p={{ base: 3, lg: 4 }} spacing={2} alignItems="start">
        <SkeletonLayout width="300px" height="24px" />
        {[1, 2].map((key) => (
          <SkeletonLayout key={key} width="150px" height="20px" />
        ))}
        <SkeletonText height="80px" width="full" />
        <HStack w="full" justifyContent="flex-end">
          <SkeletonLayout width="80px" height="36px" />
        </HStack>
      </VStack>
    </CardLayout>
  )
}
