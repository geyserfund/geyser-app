import { Badge, Box, Button, HStack, Icon, Image, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import type { MouseEvent } from 'react'
import { useMemo, useState } from 'react'
import { PiLink } from 'react-icons/pi'

import { useBlockedProjectContribution } from '@/modules/project/hooks/useBlockedProjectContribution.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'
import { FundingResourceType, PostStatus, ProjectPostFragment } from '@/types'
import { toInt } from '@/utils'
import { getPath } from '@/shared/constants'
import { useNavigate } from 'react-router'

import { useWriteUpdateModal } from '../../../hooks/useWriteUpdateModal.ts'
import { sourceResourceAtom } from '../../../state/sourceActivityAtom.ts'
import { useOgPreview } from '../hooks/useOgPreview.ts'
import { postTypeOptions } from '../utils/postTypeLabel.ts'
import { PostEditMenu } from './PostEditMenu.tsx'
import { PostShare } from './PostShare.tsx'
import { PostViewModal } from './PostViewModal.tsx'
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

/**
 * Inline OG preview rendered inside a post card.
 * Does NOT wrap in a link — the parent card handles opening the post modal.
 */
const InlineOgPreview = ({ url }: { url: string }) => {
  const { data, loading } = useOgPreview(url)
  const domain = extractDomain(url)

  if (loading) {
    return (
      <VStack w="full" alignItems="start" spacing={1}>
        <SkeletonLayout height="12px" width="80px" />
        <SkeletonLayout height="16px" width="full" />
        <SkeletonLayout height="12px" width="60%" />
      </VStack>
    )
  }

  return (
    <VStack w="full" alignItems="start" spacing={1}>
      {data?.image && !data.image.includes('default') && (
        <Box w="full" maxHeight="180px" overflow="hidden" borderRadius="6px">
          <Image src={data.image} alt={data.title ?? ''} w="full" objectFit="cover" maxHeight="180px" />
        </Box>
      )}
      <HStack spacing={1} color="neutral1.9">
        <Icon as={PiLink} fontSize="11px" flexShrink={0} />
        <Body size="xs" muted isTruncated>
          {data?.domain ?? domain}
        </Body>
      </HStack>
      {data?.title && (
        <Body size="sm" medium dark noOfLines={2}>
          {data.title}
        </Body>
      )}
      {data?.description && (
        <Body size="xs" muted noOfLines={2}>
          {data.description}
        </Body>
      )}
    </VStack>
  )
}

type Props = {
  post: ProjectPostFragment
}

/** Card that displays a project post in the updates list. Clicking opens a full-content modal. */
export const ProjectPostCard = ({ post }: Props) => {
  const { project, isProjectOwner } = useProjectAtom()
  const { openWriteUpdateModal } = useWriteUpdateModal()
  const { handleBlockedContribution } = useBlockedProjectContribution(project)
  const [sourceResource, setSourceResource] = useAtom(sourceResourceAtom)
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const isDraft = useMemo(() => post.status === PostStatus.Unpublished, [post.status])

  const descriptionTrimmed = post.description?.trim() ?? ''
  const isLinkOnly = isValidUrl(descriptionTrimmed)

  const handleCardClick = () => {
    if (isDraft) {
      openWriteUpdateModal(String(post.id))
    } else {
      setIsModalOpen(true)
    }
  }

  const handleContributeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (handleBlockedContribution(e)) return
    if (!sourceResource.resourceId) {
      setSourceResource({ resourceId: post.id, resourceType: FundingResourceType.Entry })
    }

    navigate(getPath('projectFunding', project.name))
  }

  return (
    <>
      <CardLayout
        dense
        spacing={0}
        w="100%"
        role="group"
        cursor="pointer"
        border="none"
        boxShadow="none"
        transition="box-shadow 0.2s ease, transform 0.2s ease"
        _hover={{
          cursor: 'pointer',
          transform: 'translateY(-3px)',
          boxShadow: 'md',
        }}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleCardClick()
          }
        }}
        tabIndex={0}
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
          {/* Type badge + date — first visible row */}
          <HStack w="full" justifyContent="space-between" flexWrap="wrap" spacing={2}>
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
            {post.publishedAt && (
              <Body size="xs" muted>
                {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
              </Body>
            )}
          </HStack>

          {/* Title (only shown for posts with a non-link-only description) */}
          {!isLinkOnly && post.title && post.title !== 'Project update' && (
            <Body size="lg" medium dark>
              {post.title}
            </Body>
          )}

          {/* Description or inline OG link preview */}
          {isLinkOnly ? (
            <InlineOgPreview url={descriptionTrimmed} />
          ) : (
            post.description && (
              <Body medium dark wordBreak="break-word" noOfLines={3}>
                {post.description}
              </Body>
            )
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
            {!isDraft && !isProjectOwner && (
              <Button
                size="md"
                variant="solid"
                colorScheme="primary1"
                onClick={handleContributeClick}
              >
                {t('Contribute')}
              </Button>
            )}
          </HStack>
        </VStack>
      </CardLayout>

      {!isDraft && (
        <PostViewModal
          postId={String(post.id)}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export const ProjectPostCardSkeleton = () => {
  return (
    <CardLayout dense spacing={0} w="100%" border="none" boxShadow="none">
      <Box w="full" maxHeight="280px" overflow="hidden">
        <SkeletonLayout w="full" height="200px" />
      </Box>

      <VStack w="full" p={{ base: 3, lg: 4 }} spacing={2} alignItems="start">
        <HStack w="full" justifyContent="space-between">
          <SkeletonLayout width="120px" height="24px" />
          <SkeletonLayout width="80px" height="16px" />
        </HStack>
        <SkeletonLayout width="300px" height="24px" />
        <SkeletonText height="80px" width="full" />
        <HStack w="full" justifyContent="flex-end">
          <SkeletonLayout width="80px" height="36px" />
        </HStack>
      </VStack>
    </CardLayout>
  )
}
