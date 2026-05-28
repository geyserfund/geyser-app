import {
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import type { MouseEvent } from 'react'
import { useEffect } from 'react'
import { PiX } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useBlockedProjectContribution } from '@/modules/project/hooks/useBlockedProjectContribution.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { FundingResourceType, useProjectPostLazyQuery } from '@/types'
import { toInt, useMobileMode } from '@/utils'

import { MdxMarkdownEditor } from '../../../../../../../shared/markdown/MdxMarkdownEditor.tsx'
import { sourceResourceAtom } from '../../../state/sourceActivityAtom.ts'
import { postTypeOptions } from '../utils/postTypeLabel.ts'
import { isValidUrl, LinkifiedText } from '../utils/postUrlUtils.tsx'
import { LinkedRewardsAndGoals } from './LinkedRewardsAndGoals.tsx'
import { OgLinkPreviewCard } from './OgLinkPreviewCard.tsx'
import { PostEditMenu } from './PostEditMenu.tsx'
import { PostShare } from './PostShare.tsx'

type PostViewModalProps = {
  postId: string
  isOpen: boolean
  onClose: () => void
}

/** Inline modal that renders the full post content without nav bars. */
export const PostViewModal = ({ postId, isOpen, onClose }: PostViewModalProps) => {
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const { project, isProjectOwner } = useProjectAtom()
  const { handleBlockedContribution } = useBlockedProjectContribution(project)
  const [sourceResource, setSourceResource] = useAtom(sourceResourceAtom)

  const [queryPost, { data, loading }] = useProjectPostLazyQuery({
    fetchPolicy: 'cache-first',
    variables: { postId },
  })

  useEffect(() => {
    if (isOpen && postId) {
      queryPost()
    }
  }, [isOpen, postId, queryPost])

  const post = data?.post

  const onContributeClick = (event?: MouseEvent<HTMLButtonElement>) => {
    if (handleBlockedContribution(event)) return
    if (!sourceResource.resourceId) {
      setSourceResource({ resourceId: post?.id ?? postId, resourceType: FundingResourceType.Entry })
    }

    onClose()
    navigate(getPath('projectFunding', project?.name))
  }

  const descriptionTrimmed = post?.description?.trim() ?? ''
  const isLinkOnly = descriptionTrimmed.length > 0 && isValidUrl(descriptionTrimmed)
  const showLinkedRewardsAndGoals =
    (post?.projectGoals.inProgress.length ?? 0) > 0 || (post?.projectRewards.length ?? 0) > 0

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="3xl"
      motionPreset={isMobile ? 'slideInBottom' : 'scale'}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent
        maxWidth={{ base: 'full', md: '760px' }}
        maxHeight={{ base: '100dvh', md: '90vh' }}
        borderRadius={{ base: 0, md: '16px' }}
        overflow="hidden"
        bg="utils.pbg"
        display="flex"
        flexDirection="column"
        mx={{ base: 0, md: 4 }}
        my={{ base: 0, md: 'auto' }}
      >
        {/* ── Header ── */}
        <HStack
          px={5}
          py={3}
          borderBottom="1px solid"
          borderColor="neutral1.6"
          justifyContent="space-between"
          flexShrink={0}
        >
          <HStack spacing={2}>
            {post && !loading && (
              <>
                <PostShare size="md" post={post} project={project} />
                {isProjectOwner ? (
                  <PostEditMenu size="md" post={post} onDeleteComplete={onClose} />
                ) : (
                  <Button size="md" variant="solid" colorScheme="primary1" onClick={onContributeClick}>
                    {t('Contribute')}
                  </Button>
                )}
              </>
            )}
          </HStack>
          <IconButton
            aria-label={t('Close')}
            icon={<PiX />}
            size="sm"
            variant="ghost"
            colorScheme="neutral1"
            onClick={onClose}
          />
        </HStack>

        {/* ── Body ── */}
        <ModalBody px={0} py={0} flex={1} overflowY="auto">
          {loading || !post ? (
            <PostViewModalSkeleton />
          ) : (
            <VStack w="full" alignItems="start" spacing={0}>
              {/* Cover image */}
              {post.image && (
                <Box w="full" overflow="hidden" position="relative" paddingTop="56.25%">
                  <ImageWithReload
                    src={post.image}
                    alt={post.title}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    position="absolute"
                    top={0}
                    left={0}
                  />
                </Box>
              )}

              <VStack w="full" px={{ base: 4, md: 8 }} py={6} spacing={4} alignItems="start">
                {/* Title */}
                <H2 size="2xl" bold>
                  {post.title}
                </H2>

                {/* Type badge + date row */}
                <HStack w="full" justifyContent="space-between" flexWrap="wrap" spacing={2}>
                  <HStack spacing={2} flexWrap="wrap">
                    {post.postType && (
                      <Badge variant="soft" colorScheme="neutral1" gap={2}>
                        <Icon as={postTypeOptions.find((o) => o.value === post.postType)?.icon} />
                        {postTypeOptions.find((o) => o.value === post.postType)?.label}
                      </Badge>
                    )}
                  </HStack>
                  {post.publishedAt && (
                    <Body size="sm" muted>
                      {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLLL, yyyy')}
                    </Body>
                  )}
                </HStack>

                {/* Description */}
                {descriptionTrimmed &&
                  (isLinkOnly ? (
                    <OgLinkPreviewCard url={descriptionTrimmed} />
                  ) : (
                    <Body size="md" dark>
                      <LinkifiedText text={descriptionTrimmed} />
                    </Body>
                  ))}

                {/* Markdown content */}
                {post.markdown && (
                  <Box fontSize="16px" color="utils.text" width="full" sx={{ p: { marginTop: '0px' } }}>
                    <MdxMarkdownEditor mode="preview" value={post.markdown} />
                  </Box>
                )}

                {/* Linked rewards and goals */}
                {showLinkedRewardsAndGoals && <LinkedRewardsAndGoals post={post} />}
              </VStack>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

const PostViewModalSkeleton = () => (
  <VStack w="full" alignItems="start" spacing={0}>
    <SkeletonLayout w="full" height="280px" borderRadius={0} />
    <VStack w="full" px={{ base: 4, md: 8 }} py={6} spacing={4} alignItems="start">
      <SkeletonLayout height="32px" width="70%" />
      <HStack w="full" justifyContent="space-between">
        <SkeletonLayout height="24px" width="120px" />
        <SkeletonLayout height="16px" width="100px" />
      </HStack>
      <SkeletonText noOfLines={6} width="100%" spacing={3} />
    </VStack>
  </VStack>
)
