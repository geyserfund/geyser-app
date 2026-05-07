import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Collapse,
  Divider,
  HStack,
  IconButton,
  Input,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Textarea,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PiArrowLeft, PiImages, PiLink, PiVideoCamera, PiX } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useProjectGoalsAPI } from '@/modules/project/API/useProjectGoalsAPI'
import { useProjectPostsAPI } from '@/modules/project/API/useProjectPostsAPI'
import { useProjectRewardsAPI } from '@/modules/project/API/useProjectRewardsAPI'
import { useGoalsAtom, useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'
import { getPath, ProjectPostValidations } from '@/shared/constants/index.ts'
import { FileUpload } from '@/shared/molecules'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { PostCreateInput, PostType, PostUpdateInput, useProjectPostQuery } from '@/types'
import { toInt, useMobileMode, useNotification } from '@/utils'

import { useWriteUpdateModal } from '../../../hooks/useWriteUpdateModal.ts'
import { OgLinkPreviewCard } from './OgLinkPreviewCard.tsx'
import { PublishSuccessState } from './PublishSuccessState.tsx'

/** Returns true when the entire string is a valid URL */
const isValidUrl = (str: string): boolean => {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/** Trims description to title length or returns fallback */
const generateTitle = (description: string): string => {
  const trimmed = description.trim()
  if (trimmed && !isValidUrl(trimmed)) {
    return trimmed.substring(0, ProjectPostValidations.title.maxLength)
  }

  return 'Project update'
}

/** Composer modal for quick project updates */
export const WriteUpdateModal = () => {
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const toast = useNotification()
  const { project } = useProjectAtom()
  const { isOpen, postId, closeWriteUpdateModal } = useWriteUpdateModal()

  const { postCreate, postUpdate, postPublish } = useProjectPostsAPI()

  // load goals/rewards for linking section
  const { queryInProgressGoals, queryCompletedGoals } = useProjectGoalsAPI(true)
  const { queryProjectRewards } = useProjectRewardsAPI(true)
  const { inProgressGoals, completedGoals } = useGoalsAtom()
  const { rewards } = useRewardsAtom()

  // ── composer state ──
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkInputValue, setLinkInputValue] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [projectGoalIds, setProjectGoalIds] = useState<number[]>([])
  const [projectRewardUUIDs, setProjectRewardUUIDs] = useState<string[]>([])

  // runtime state
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showSuccessState, setShowSuccessState] = useState(false)
  const [publishedPostId, setPublishedPostId] = useState<number | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // ── load existing draft when editing ──
  const { loading: loadingPost } = useProjectPostQuery({
    variables: { postId: toInt(postId) },
    skip: !postId,
    fetchPolicy: 'network-only',
    onCompleted(data) {
      if (data.post) {
        const p = data.post
        const desc = p.description ?? ''
        setDescription(desc)
        setImage(p.image ?? '')
        if (isValidUrl(desc.trim())) {
          setLinkUrl(desc.trim())
        }

        setProjectGoalIds([
          ...(p.projectGoals?.inProgress?.map((g) => g.id) ?? []),
          ...(p.projectGoals?.completed?.map((g) => g.id) ?? []),
        ])
        setProjectRewardUUIDs(p.projectRewards.map((r) => r.uuid))
        setCurrentPostId(p.id)
      }
    },
  })

  // ── reset when modal closes ──
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setDescription('')
        setImage('')
        setLinkUrl('')
        setLinkInputValue('')
        setShowLinkInput(false)
        setProjectGoalIds([])
        setProjectRewardUUIDs([])
        setCurrentPostId(null)
        setShowSuccessState(false)
        setPublishedPostId(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const hasMeaningfulContent = description.trim().length > 0 || !!image || !!linkUrl

  // auto-resize textarea
  const adjustTextarea = useCallback(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 240)}px`
    }
  }, [])

  // ── build API inputs ──
  const buildDescription = (): string => {
    if (linkUrl) {
      const captionText = description.trim()
      if (!captionText || isValidUrl(captionText)) return linkUrl
      if (!captionText.includes(linkUrl)) return `${captionText}\n${linkUrl}`
      return captionText
    }

    return description
  }

  const buildCreateInput = (): PostCreateInput => ({
    projectId: toInt(project.id),
    title: generateTitle(buildDescription()),
    description: buildDescription(),
    image: image || undefined,
    postType: PostType.Announcement,
    projectGoalIds,
    projectRewardUUIDs,
  })

  const buildUpdateInput = (id: number): PostUpdateInput => ({
    postId: id,
    title: generateTitle(buildDescription()),
    description: buildDescription(),
    image: image || undefined,
    postType: PostType.Announcement,
    projectGoalIds,
    projectRewardUUIDs,
  })

  // ── save/create draft ──
  const saveOrUpdateDraft = useCallback((): Promise<number | null> => {
    if (!hasMeaningfulContent) return Promise.resolve(null)

    return new Promise((resolve) => {
      if (currentPostId) {
        postUpdate.execute({
          variables: { input: buildUpdateInput(currentPostId) },
          onCompleted(data) {
            resolve(data.postUpdate.id)
          },
          onError() {
            toast.error({ title: t('Failed to save draft') })
            resolve(null)
          },
        })
      } else {
        postCreate.execute({
          variables: { input: buildCreateInput() },
          onCompleted(data) {
            setCurrentPostId(data.postCreate.id)
            resolve(data.postCreate.id)
          },
          onError() {
            toast.error({ title: t('Failed to save draft') })
            resolve(null)
          },
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMeaningfulContent, currentPostId, description, image, linkUrl, projectGoalIds, projectRewardUUIDs])

  const handleSaveDraft = async () => {
    if (!hasMeaningfulContent) return
    setIsSaving(true)
    const id = await saveOrUpdateDraft()
    setIsSaving(false)
    if (id) {
      toast.success({ title: t('Draft saved') })
      closeWriteUpdateModal()
    }
  }

  const handlePublish = async () => {
    if (!hasMeaningfulContent) return
    setIsPublishing(true)
    const id = await saveOrUpdateDraft()
    if (!id) {
      setIsPublishing(false)
      return
    }

    postPublish.execute({
      variables: { input: { postId: id } },
      onCompleted(data) {
        setIsPublishing(false)
        setPublishedPostId(data.postPublish.id)
        setShowSuccessState(true)
      },
      onError() {
        setIsPublishing(false)
        toast.error({ title: t('Failed to publish update') })
      },
    })
  }

  const handleOpenFullEditor = async () => {
    if (!hasMeaningfulContent) {
      closeWriteUpdateModal()
      navigate(getPath('projectPostCreate', project.name))
      return
    }

    setIsSaving(true)
    const id = currentPostId ?? (await saveOrUpdateDraft())
    setIsSaving(false)
    if (id) {
      closeWriteUpdateModal()
      navigate(getPath('projectPostEdit', project.name, String(id)))
    }
  }

  const handleAddLink = () => {
    const raw = linkInputValue.trim()
    if (!raw) return
    const withProtocol = raw.startsWith('http') ? raw : `https://${raw}`
    if (!isValidUrl(withProtocol)) {
      toast.error({ title: t('Please enter a valid URL') })
      return
    }

    setLinkUrl(withProtocol)
    setLinkInputValue('')
    setShowLinkInput(false)
  }

  const hasGoals = inProgressGoals.length > 0 || completedGoals.length > 0
  const hasRewards = rewards.length > 0
  const totalLinked = projectGoalIds.length + projectRewardUUIDs.length

  const isLoading = isSaving || isPublishing

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={closeWriteUpdateModal}
      isCentered
      size="xl"
      motionPreset={isMobile ? 'slideInBottom' : 'scale'}
      closeOnOverlayClick={!hasMeaningfulContent}
    >
      <ModalOverlay />
      <ModalContent
        maxWidth="580px"
        maxHeight="90vh"
        borderRadius="16px"
        overflow="hidden"
        bg="utils.pbg"
        display="flex"
        flexDirection="column"
        mx={{ base: 2, lg: 'auto' }}
      >
        {/* ── Header ── */}
        <HStack
          px={5}
          py={4}
          borderBottom="1px solid"
          borderColor="neutral1.6"
          justifyContent="space-between"
          flexShrink={0}
        >
          <HStack spacing={3}>
            {project.thumbnailImage && (
              <Box
                w="32px"
                h="32px"
                borderRadius="full"
                overflow="hidden"
                border="1px solid"
                borderColor="neutral1.6"
                flexShrink={0}
              >
                <ImageWithReload src={project.thumbnailImage} alt={project.name} w="full" h="full" objectFit="cover" />
              </Box>
            )}
            <VStack spacing={0} alignItems="start">
              <Body size="xs" muted lineHeight="short">
                {t('Posting to')}
              </Body>
              <Body size="sm" medium dark lineHeight="short">
                {project.title || project.name}
              </Body>
            </VStack>
          </HStack>

          <IconButton
            aria-label={t('Close')}
            icon={<PiX />}
            size="sm"
            variant="outline"
            colorScheme="neutral1"
            onClick={closeWriteUpdateModal}
          />
        </HStack>

        {/* ── Body ── */}
        <ModalBody
          px={0}
          py={0}
          flex={1}
          overflowY="auto"
          display="flex"
          flexDirection="column"
        >
          {showSuccessState && publishedPostId ? (
            <Box px={5} py={6}>
              <PublishSuccessState
                postId={publishedPostId}
                description={description}
                onWriteAnother={() => {
                  setShowSuccessState(false)
                  setPublishedPostId(null)
                  setDescription('')
                  setImage('')
                  setLinkUrl('')
                  setCurrentPostId(null)
                  setProjectGoalIds([])
                  setProjectRewardUUIDs([])
                }}
                onClose={closeWriteUpdateModal}
              />
            </Box>
          ) : (
            <VStack spacing={0} alignItems="stretch">
              {/* Image upload area */}
              <Box px={5} pt={4}>
                <FileUpload
                  onUploadComplete={(url) => setImage(url)}
                  childrenOnLoading={<SkeletonLayout height="200px" width="100%" />}
                  imageCrop={ImageCropAspectRatio.Post}
                >
                  <>
                    {image ? (
                      <Box
                        position="relative"
                        borderRadius="8px"
                        overflow="hidden"
                        role="group"
                        cursor="pointer"
                        style={{ aspectRatio: '16/9' }}
                      >
                        <ImageWithReload src={image} alt={t('Post image')} w="full" h="full" objectFit="cover" />
                        <VStack
                          position="absolute"
                          inset={0}
                          bg="utils.overlay"
                          opacity={0}
                          _groupHover={{ opacity: 1 }}
                          transition="opacity 0.2s ease"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                          pointerEvents="none"
                        >
                          <Body size="sm" medium color="utils.whiteContrast">
                            {t('Change image')}
                          </Body>
                        </VStack>
                        <IconButton
                          aria-label={t('Remove image')}
                          icon={<PiX />}
                          size="xs"
                          position="absolute"
                          top={2}
                          right={2}
                          variant="solid"
                          colorScheme="neutral1"
                          zIndex={1}
                          onClick={(e) => {
                            e.stopPropagation()
                            setImage('')
                          }}
                        />
                      </Box>
                    ) : (
                      <HStack
                        w="full"
                        h="160px"
                        borderRadius="8px"
                        border="2px dashed"
                        borderColor="neutral1.6"
                        justifyContent="center"
                        spacing={2}
                        cursor="pointer"
                        transition="border-color 0.2s, background-color 0.2s"
                        _hover={{ borderColor: 'primary1.8', bg: 'primary1.2' }}
                      >
                        <PiImages fontSize="20px" color="var(--chakra-colors-neutral1-9)" />
                        <Body size="sm" muted>
                          {t('Drag and drop or click to upload')}
                        </Body>
                      </HStack>
                    )}
                  </>
                </FileUpload>
              </Box>

              {/* Action pills row */}
              <HStack px={5} pt={3} pb={1} spacing={2}>
                {/* Share a link */}
                <Button
                  size="sm"
                  variant={linkUrl ? 'solid' : 'outline'}
                  colorScheme={linkUrl ? 'primary1' : 'neutral1'}
                  leftIcon={<PiLink />}
                  onClick={() => setShowLinkInput(!showLinkInput)}
                  borderRadius="full"
                >
                  {linkUrl ? t('Link added') : t('Share a link')}
                </Button>

                {/* Record a video — placeholder, disabled */}
                <Tooltip label={t('Coming soon')} hasArrow>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="neutral1"
                    leftIcon={<PiVideoCamera />}
                    isDisabled
                    borderRadius="full"
                    cursor="not-allowed"
                  >
                    {t('Record a video')}
                  </Button>
                </Tooltip>
              </HStack>

              {/* Link input panel */}
              <Collapse in={showLinkInput} animateOpacity>
                <HStack px={5} pb={3} pt={2} spacing={2}>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="neutral1"
                    leftIcon={<PiArrowLeft />}
                    onClick={() => {
                      setShowLinkInput(false)
                      setLinkInputValue('')
                    }}
                    px={1}
                    aria-label={t('Back')}
                  />
                  <Input
                    size="sm"
                    placeholder="https://..."
                    value={linkInputValue}
                    onChange={(e) => setLinkInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                    autoFocus
                    flex={1}
                  />
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="primary1"
                    onClick={handleAddLink}
                    isDisabled={!linkInputValue.trim()}
                  >
                    {t('Add')}
                  </Button>
                </HStack>
              </Collapse>

              {/* OG preview when link set */}
              {linkUrl && (
                <Box px={5} pb={3}>
                  <OgLinkPreviewCard url={linkUrl} onRemove={() => setLinkUrl('')} />
                </Box>
              )}

              {/* Caption textarea */}
              <Box px={5} pb={2}>
                <Textarea
                  ref={textareaRef}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                    adjustTextarea()
                  }}
                  placeholder={t('Share what changed, what you built, or what supporters helped make happen…')}
                  border="none"
                  bg="transparent"
                  _focus={{ border: 'none', boxShadow: 'none' }}
                  _focusVisible={{ boxShadow: 'none' }}
                  resize="none"
                  minHeight="100px"
                  maxLength={ProjectPostValidations.description.maxLength}
                  px={0}
                  fontSize="sm"
                  color="utils.text"
                />
                {!hasMeaningfulContent && (
                  <Body size="xs" muted mt={1}>
                    {t("A title isn't required — a caption or image is enough.")}
                  </Body>
                )}
              </Box>

              <Divider borderColor="neutral1.5" mx={5} w="auto" />

              {/* Link goals and products accordion */}
              {(hasGoals || hasRewards) && (
                <Accordion allowToggle>
                  <AccordionItem border="none">
                    <AccordionButton px={5} py={3} _hover={{ bg: 'neutral1.2' }}>
                      <HStack flex={1} spacing={2} textAlign="left">
                        <Body size="sm" muted>
                          {t('Link goal or product')}
                        </Body>
                        {totalLinked > 0 && (
                          <Body size="xs" color="primary1.11" fontWeight={600}>
                            {`(${totalLinked})`}
                          </Body>
                        )}
                      </HStack>
                      <AccordionIcon color="neutral1.9" />
                    </AccordionButton>
                    <AccordionPanel px={5} pb={4}>
                      <Body size="xs" muted mb={3}>
                        {t('Linked goals and products appear on the full post view, not on update cards.')}
                      </Body>

                      {/* Goals */}
                      {hasGoals && (
                        <VStack alignItems="start" spacing={2} mb={4}>
                          <Body size="sm" medium>
                            {t('Goals')}
                          </Body>
                          {queryInProgressGoals.loading || queryCompletedGoals.loading ? (
                            <VStack w="full" spacing={1}>
                              {[1, 2].map((k) => (
                                <SkeletonLayout key={k} height="24px" width="100%" />
                              ))}
                            </VStack>
                          ) : (
                            <CheckboxGroup
                              value={projectGoalIds.map(String)}
                              onChange={(vals) => setProjectGoalIds(vals.map((v) => toInt(v)))}
                            >
                              <VStack alignItems="start" spacing={2} w="full">
                                {[...inProgressGoals, ...completedGoals].map((goal) => (
                                  <Checkbox key={goal.id} value={String(goal.id)} size="md">
                                    <Body size="sm">{goal.title}</Body>
                                  </Checkbox>
                                ))}
                              </VStack>
                            </CheckboxGroup>
                          )}
                        </VStack>
                      )}

                      {/* Rewards */}
                      {hasRewards && (
                        <VStack alignItems="start" spacing={2}>
                          <Body size="sm" medium>
                            {t('Products')}
                          </Body>
                          {queryProjectRewards.loading ? (
                            <VStack w="full" spacing={1}>
                              {[1, 2].map((k) => (
                                <SkeletonLayout key={k} height="24px" width="100%" />
                              ))}
                            </VStack>
                          ) : (
                            <CheckboxGroup
                              value={projectRewardUUIDs}
                              onChange={(vals) => setProjectRewardUUIDs(vals as string[])}
                            >
                              <VStack alignItems="start" spacing={2} w="full">
                                {rewards.map((reward) => (
                                  <Checkbox key={reward.id} value={reward.uuid} size="md">
                                    <Body size="sm">{reward.name}</Body>
                                  </Checkbox>
                                ))}
                              </VStack>
                            </CheckboxGroup>
                          )}
                        </VStack>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}

              {/* Loading indicator while fetching existing post */}
              {loadingPost && (
                <HStack justifyContent="center" py={4}>
                  <Spinner size="sm" color="primary1.9" />
                </HStack>
              )}
            </VStack>
          )}
        </ModalBody>

        {/* ── Footer (hidden in success state) ── */}
        {!showSuccessState && (
          <HStack
            px={5}
            py={4}
            borderTop="1px solid"
            borderColor="neutral1.6"
            justifyContent="space-between"
            flexShrink={0}
          >
            <Button
              size="sm"
              variant="ghost"
              colorScheme="neutral1"
              onClick={handleOpenFullEditor}
              isLoading={isSaving && !isPublishing}
            >
              {t('Open full editor')}
            </Button>

            <HStack spacing={2}>
              <Button
                size="md"
                variant="outline"
                colorScheme="neutral1"
                isDisabled={!hasMeaningfulContent || isLoading}
                isLoading={isSaving && !isPublishing}
                onClick={handleSaveDraft}
              >
                {t('Save draft')}
              </Button>
              <Button
                size="md"
                variant="solid"
                colorScheme="primary1"
                isDisabled={!hasMeaningfulContent || isLoading}
                isLoading={isPublishing}
                onClick={handlePublish}
              >
                {t('Publish')}
              </Button>
            </HStack>
          </HStack>
        )}
      </ModalContent>
    </ChakraModal>
  )
}
