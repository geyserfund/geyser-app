import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Spinner,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PiArrowLeft, PiImages, PiLink, PiNotePencil, PiX } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useProjectPostsAPI } from '@/modules/project/API/useProjectPostsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'
import { getPath, ProjectPostValidations } from '@/shared/constants/index.ts'
import { FileUpload } from '@/shared/molecules'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { PostCreateInput, PostType, PostUpdateInput, useProjectPostQuery } from '@/types'
import { toInt, useMobileMode, useNotification } from '@/utils'

import { useWriteUpdateModal } from '../../../hooks/useWriteUpdateModal.ts'
import { postTypeOptions } from '../utils/postTypeLabel.ts'
import { isValidUrl } from '../utils/postUrlUtils.tsx'
import { OgLinkPreviewCard } from './OgLinkPreviewCard.tsx'
import { PublishSuccessState } from './PublishSuccessState.tsx'

type ModalView = 'select' | 'share-link' | 'write-post'

/** Derives a title from a URL — uses the hostname, falling back to 'Project update'. */
const generateTitleFromUrl = (url: string): string => {
  const trimmed = url.trim()
  if (!trimmed) return t('Project update')
  try {
    return new URL(trimmed).hostname.substring(0, ProjectPostValidations.title.maxLength)
  } catch {
    return t('Project update')
  }
}

// ── Screen sub-components ──

type SelectionScreenProps = {
  onShareLink: () => void
  onWritePost: () => void
}

const SelectionScreen = ({ onShareLink, onWritePost }: SelectionScreenProps) => (
  <VStack px={5} py={8} spacing={4} alignItems="stretch">
    <Button
      size="lg"
      variant="outline"
      colorScheme="neutral1"
      leftIcon={<PiLink fontSize="20px" />}
      justifyContent="flex-start"
      height="72px"
      borderRadius="12px"
      borderWidth="1px"
      _hover={{ borderColor: 'primary1.8', bg: 'primary1.2' }}
      onClick={onShareLink}
      fontSize="md"
    >
      {t('Share a link')}
    </Button>
    <Button
      size="lg"
      variant="outline"
      colorScheme="neutral1"
      leftIcon={<PiNotePencil fontSize="20px" />}
      justifyContent="flex-start"
      height="72px"
      borderRadius="12px"
      borderWidth="1px"
      _hover={{ borderColor: 'primary1.8', bg: 'primary1.2' }}
      onClick={onWritePost}
      fontSize="md"
    >
      {t('Write a post')}
    </Button>
  </VStack>
)

type ShareLinkScreenProps = {
  linkUrl: string
  linkInputValue: string
  postType: PostType
  loadingPost: boolean
  onLinkInputChange: (val: string) => void
  onAddLink: () => void
  onRemoveLink: () => void
  onPostTypeChange: (val: PostType) => void
}

const ShareLinkScreen = ({
  linkUrl,
  linkInputValue,
  postType,
  loadingPost,
  onLinkInputChange,
  onAddLink,
  onRemoveLink,
  onPostTypeChange,
}: ShareLinkScreenProps) => (
  <VStack spacing={0} alignItems="stretch">
    <HStack px={5} pt={5} pb={3} spacing={2}>
      <Input
        size="md"
        placeholder="https://..."
        value={linkInputValue}
        onChange={(e) => onLinkInputChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onAddLink()}
        autoFocus={!linkUrl}
        flex={1}
        isDisabled={Boolean(linkUrl)}
      />
      {!linkUrl && (
        <Button
          size="md"
          variant="solid"
          colorScheme="primary1"
          onClick={onAddLink}
          isDisabled={!linkInputValue.trim()}
        >
          {t('Add')}
        </Button>
      )}
    </HStack>

    {linkUrl && (
      <Box px={5} pb={3}>
        <OgLinkPreviewCard url={linkUrl} onRemove={onRemoveLink} />
      </Box>
    )}

    <Box px={5} pb={4}>
      <Select
        size="sm"
        value={postType}
        onChange={(e) => onPostTypeChange(e.target.value as PostType)}
        borderRadius="8px"
        color="neutral1.11"
        borderColor="neutral1.6"
        _hover={{ borderColor: 'neutral1.8' }}
        fontSize="sm"
      >
        {postTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </Select>
    </Box>

    {loadingPost && (
      <HStack justifyContent="center" py={4}>
        <Spinner size="sm" color="primary1.9" />
      </HStack>
    )}
  </VStack>
)

type WritePostScreenProps = {
  image: string
  description: string
  postType: PostType
  loadingPost: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement>
  onImageUpload: (url: string) => void
  onImageRemove: () => void
  onDescriptionChange: (val: string) => void
  onAdjustTextarea: () => void
  onPostTypeChange: (val: PostType) => void
}

const WritePostScreen = ({
  image,
  description,
  postType,
  loadingPost,
  textareaRef,
  onImageUpload,
  onImageRemove,
  onDescriptionChange,
  onAdjustTextarea,
  onPostTypeChange,
}: WritePostScreenProps) => (
  <VStack spacing={0} alignItems="stretch">
    <Box px={5} pt={4}>
      <FileUpload
        onUploadComplete={onImageUpload}
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
                  onImageRemove()
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

    <Box px={5} pt={3} pb={2}>
      <Textarea
        ref={textareaRef}
        value={description}
        onChange={(e) => {
          onDescriptionChange(e.target.value)
          onAdjustTextarea()
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
    </Box>

    <Box px={5} pb={4}>
      <Select
        size="sm"
        value={postType}
        onChange={(e) => onPostTypeChange(e.target.value as PostType)}
        borderRadius="8px"
        color="neutral1.11"
        borderColor="neutral1.6"
        _hover={{ borderColor: 'neutral1.8' }}
        fontSize="sm"
      >
        {postTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </Select>
    </Box>

    {loadingPost && (
      <HStack justifyContent="center" py={4}>
        <Spinner size="sm" color="primary1.9" />
      </HStack>
    )}
  </VStack>
)

// ── Main modal ──

/** Composer modal for quick project updates */
export const WriteUpdateModal = () => {
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const toast = useNotification()
  const { project } = useProjectAtom()
  const { isOpen, postId, closeWriteUpdateModal } = useWriteUpdateModal()

  const { postCreate, postUpdate, postPublish } = useProjectPostsAPI()

  // ── view routing ──
  const [view, setView] = useState<ModalView>('select')

  // ── composer state ──
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkInputValue, setLinkInputValue] = useState('')
  const [postType, setPostType] = useState<PostType>(PostType.Announcement)

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
          setView('share-link')
        } else if (desc.trim() || p.image) {
          setView('write-post')
        }

        setPostType(p.postType ?? PostType.Announcement)
        setCurrentPostId(p.id)
      }
    },
  })

  // ── reset when modal closes ──
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setView('select')
        setDescription('')
        setImage('')
        setLinkUrl('')
        setLinkInputValue('')
        setPostType(PostType.Announcement)
        setCurrentPostId(null)
        setShowSuccessState(false)
        setPublishedPostId(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const hasMeaningfulContent = description.trim().length > 0 || Boolean(image) || Boolean(linkUrl)

  // auto-resize textarea
  const adjustTextarea = useCallback(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 240)}px`
    }
  }, [])

  useEffect(() => {
    adjustTextarea()
  }, [description, adjustTextarea])

  // ── build API inputs ──
  const buildDescription = (): string => (linkUrl ? linkUrl : description)

  /** Share-link posts get a hostname-derived title; write-post (short posts) use an empty title. */
  const buildTitle = (): string => (view === 'share-link' ? generateTitleFromUrl(linkUrl) : '')

  const buildCreateInput = (): PostCreateInput => ({
    projectId: toInt(project.id),
    title: buildTitle(),
    description: buildDescription(),
    image: image || undefined,
    postType,
    projectGoalIds: [],
    projectRewardUUIDs: [],
  })

  const buildUpdateInput = (id: number): PostUpdateInput => ({
    postId: id,
    title: buildTitle(),
    description: buildDescription(),
    image: image || undefined,
    postType,
    projectGoalIds: [],
    projectRewardUUIDs: [],
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
  }, [hasMeaningfulContent, currentPostId, description, image, linkUrl, postType])

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
    const hasProtocol = /^https?:\/\//i.test(raw)
    const withProtocol = hasProtocol ? raw.toLowerCase().replace(/^https?/i, (m) => m.toLowerCase()) : `https://${raw}`
    if (!isValidUrl(withProtocol)) {
      toast.error({ title: t('Please enter a valid URL') })
      return
    }

    setLinkUrl(withProtocol)
    setLinkInputValue('')
  }

  const handleBack = () => {
    setView('select')
    setLinkUrl('')
    setLinkInputValue('')
    setDescription('')
    setImage('')
  }

  const isLoading = isSaving || isPublishing

  const renderBody = () => {
    if (showSuccessState && publishedPostId) {
      return (
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
              setPostType(PostType.Announcement)
            }}
            onClose={closeWriteUpdateModal}
          />
        </Box>
      )
    }

    if (view === 'select') {
      return <SelectionScreen onShareLink={() => setView('share-link')} onWritePost={() => setView('write-post')} />
    }

    if (view === 'share-link') {
      return (
        <ShareLinkScreen
          linkUrl={linkUrl}
          linkInputValue={linkInputValue}
          postType={postType}
          loadingPost={loadingPost}
          onLinkInputChange={setLinkInputValue}
          onAddLink={handleAddLink}
          onRemoveLink={() => setLinkUrl('')}
          onPostTypeChange={setPostType}
        />
      )
    }

    return (
      <WritePostScreen
        image={image}
        description={description}
        postType={postType}
        loadingPost={loadingPost}
        textareaRef={textareaRef}
        onImageUpload={setImage}
        onImageRemove={() => setImage('')}
        onDescriptionChange={setDescription}
        onAdjustTextarea={adjustTextarea}
        onPostTypeChange={setPostType}
      />
    )
  }

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
            {view !== 'select' && !showSuccessState && (
              <IconButton
                aria-label={t('Back')}
                icon={<PiArrowLeft />}
                size="sm"
                variant="ghost"
                colorScheme="neutral1"
                onClick={handleBack}
              />
            )}
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
        <ModalBody px={0} py={0} flex={1} overflowY="auto" display="flex" flexDirection="column">
          {renderBody()}
        </ModalBody>

        {/* ── Footer (hidden on selection screen and success state) ── */}
        {!showSuccessState && view !== 'select' && (
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
