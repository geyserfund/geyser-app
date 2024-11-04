import { Box, Button, HStack, Input, Spinner, StackProps, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import { PiArrowLeft, PiCaretDown, PiImages } from 'react-icons/pi'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { ImageWithReload, TextArea } from '@/components/ui'
import { CustomSelect } from '@/components/ui/CustomSelect'
import Loader from '@/components/ui/Loader'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { usePostsAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { dimensions, getPath, ProjectPostValidations } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { MarkdownField } from '@/shared/markdown/MarkdownField'
import { FileUpload } from '@/shared/molecules'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { PostStatus } from '@/types'
import { useCustomTheme, useMobileMode, useNotification } from '@/utils'

import { LinkGoalsAndRewardsModal } from '../components/LinkGoalsAndRewardsModal'
import { PublishModal } from '../components/PublishModal'
import { usePostForm } from '../hooks/usePostForm'
import { postTypeOptions } from '../utils/postTypeLabel'

export const PostCreateEdit = () => {
  const navigate = useNavigate()
  const toast = useNotification()
  const isMobile = useMobileMode()
  const confirmViewPostModal = useModal()

  const { project, loading: projectLoading } = useProjectAtom()

  const { hasPosts } = usePostsAtom()

  const { postId } = useParams<{ postId: string }>()

  const [searchParams] = useSearchParams()
  const linkedGoalId = searchParams.get('goalId')
  const linkedRewardUuid = searchParams.get('rewardUuid')

  const [focusFlag, setFocusFlag] = useState('')

  const { isOpen: isEditorMode, onToggle: toggleEditorMode } = useDisclosure()
  const [isStoryLoading, setIsStoryLoading] = useState(false)
  const handleToggleEditorMode = () => {
    toggleEditorMode()
    setIsStoryLoading(true)
    setTimeout(() => {
      setIsStoryLoading(false)
    }, 1)
  }

  const { loading, savePost, saving, postPublish, publishing, isDirty, setValue, watch, control } = usePostForm({
    projectId: project.id,
    postId,
    options: {
      fetchPolicy: 'network-only',
      onError() {
        navigate(getPath('notFound'))
      },
      onCompleted(data) {
        if (data.post === null) {
          navigate(getPath('notFound'))
        }
      },
    },
    linkedGoalId: linkedGoalId ?? undefined,
    linkedRewardUuid: linkedRewardUuid ?? undefined,
  })

  const postForm = watch()

  useEffect(() => {
    let number: any
    if (isDirty && postForm.status !== PostStatus.Published) {
      number = setInterval(() => {
        savePost()
      }, 2000)
    }

    if (postForm.status === PostStatus.Published) {
      clearInterval(number)
    }

    return () => clearInterval(number)
  }, [postForm, isDirty, savePost])

  const handleSaveButtonClick = () => {
    savePost({
      onCompleted() {
        toast.success({
          title: 'Post saved successfully!',
        })
      },
    })
  }

  const handleInput = (event: any) => {
    const { name, value } = event.target

    if (name === 'title' && value.length > ProjectPostValidations.title.maxLength) {
      return
    }

    if (name === 'description' && value.length > ProjectPostValidations.description.maxLength) {
      return
    }

    if (name) {
      setValue(name, value, { shouldDirty: true })
    }
  }

  const onImageUpload = (url: string) => setValue('image', url, { shouldDirty: true })

  const handleKeyDown = useCallback((event: any) => {
    if (event) {
      if (event.target.name === 'title') {
        if (event.key === 'ArrowDown' || event.key === 'Enter') {
          event.preventDefault()
          document.getElementById('post-description-input')?.focus()
        }
      } else if (event.target.name === 'description') {
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          document.getElementById('post-title-input')?.focus()
        } else if (event.key === 'ArrowDown' || event.key === 'Tab' || event.key === 'Enter') {
          event.preventDefault()
          const newDate = new Date()
          setFocusFlag(newDate.toISOString())
        }
      }
    }
  }, [])

  const getSaveButtonText = () => {
    if (saving) {
      return 'Saving'
    }

    if (postForm.id) {
      if (isDirty) {
        return 'Save'
      }

      return 'Saved'
    }

    return 'Save draft'
  }

  if (loading || projectLoading) {
    return <Loader />
  }

  const isPostPublished = postForm?.status === PostStatus.Published

  const postUrl = postId ? getPath('projectPostView', project.name, postId) : ''

  const handleBackClick = () => {
    const pathToGo = isPostPublished
      ? postUrl
      : hasPosts
      ? getPath('projectPosts', project?.name)
      : getPath('project', project?.name)

    if (isDirty) {
      confirmViewPostModal.onOpen({ path: pathToGo })
      return
    }

    navigate(pathToGo)
  }

  return (
    <>
      <VStack as={'form'} w="full" height="full" paddingBottom={20}>
        <TopNavContainerBar>
          <Button size="lg" variant="ghost" colorScheme="neutral1" onClick={handleBackClick} leftIcon={<PiArrowLeft />}>
            {isPostPublished ? t('Back to post') : hasPosts ? t('Back to posts') : t('Back to project')}
          </Button>
          <HStack>
            <Button size="lg" variant="soft" colorScheme="neutral1" onClick={handleSaveButtonClick}>
              {t(getSaveButtonText())}
            </Button>
            <PublishModal post={postForm} postPublish={postPublish} publishing={publishing} />
          </HStack>
        </TopNavContainerBar>

        <CardLayout
          padding={0}
          paddingY="24px"
          w="full"
          maxWidth={dimensions.project.posts.view.maxWidth}
          alignItems="start"
          backgroundColor="utils.pbg"
          paddingTop={8}
          flex={1}
          height="full"
          overflowY="auto"
        >
          <VStack
            spacing={3}
            width="100%"
            height="100%"
            maxWidth="1080px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box width="100%" paddingX={6}>
              <FileUpload
                onUploadComplete={onImageUpload}
                childrenOnLoading={<SkeletonLayout height="330px" width="100%" />}
                imageCrop={ImageCropAspectRatio.Post}
              >
                <>
                  {postForm.image ? (
                    <HStack
                      width={'100%'}
                      justifyContent="center"
                      maxHeight="400px"
                      borderRadius="8px"
                      overflow="hidden"
                      position="relative"
                    >
                      <ImageUploadUi
                        position="absolute"
                        left={0}
                        top={0}
                        opacity={0}
                        _hover={{ opacity: 0.9 }}
                        height="100%"
                      />
                      <ImageWithReload width="100%" objectFit="cover" src={postForm.image} />
                    </HStack>
                  ) : (
                    <ImageUploadUi />
                  )}
                </>
              </FileUpload>
            </Box>
            {isMobile ? (
              <VStack width="100%" alignItems="flex-start" paddingX={6}>
                <CustomSelect
                  name="postType"
                  options={postTypeOptions}
                  placeholder="Post Type"
                  onChange={(e) => setValue('postType', e?.value, { shouldDirty: true })}
                  value={
                    postForm.postType ? postTypeOptions.find((option) => option.value === postForm.postType) : null
                  }
                  dropdownIndicator={<PiCaretDown />}
                  width={'200px'}
                  size="sm"
                />
                <LinkGoalsAndRewardsModal
                  postId={postForm.id}
                  setValue={setValue}
                  projectRewardUUIDs={postForm.projectRewardUUIDs}
                  projectGoalIds={postForm.projectGoalIds}
                  projectName={project.name}
                />
              </VStack>
            ) : (
              <HStack px={6}>
                <CustomSelect
                  name="postType"
                  options={postTypeOptions}
                  placeholder="Post Type"
                  onChange={(e) => setValue('postType', e?.value, { shouldDirty: true })}
                  value={
                    postForm.postType ? postTypeOptions.find((option) => option.value === postForm.postType) : null
                  }
                  dropdownIndicator={<PiCaretDown />}
                  width={'200px'}
                  size="sm"
                />
                <LinkGoalsAndRewardsModal
                  postId={postForm.id}
                  setValue={setValue}
                  projectRewardUUIDs={postForm.projectRewardUUIDs}
                  projectGoalIds={postForm.projectGoalIds}
                  projectName={project.name}
                />
              </HStack>
            )}

            <VStack width="100%">
              <Input
                id={'post-title-input'}
                border="none"
                backgroundColor="transparent"
                _focus={{ border: 'none' }}
                _focusVisible={{}}
                placeholder={t('Post Title')}
                color="utils.text"
                fontSize={'20px'}
                fontWeight={700}
                paddingX={6}
                name="title"
                value={postForm.title}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />

              <TextArea
                id={'post-description-input'}
                border="none"
                backgroundColor="transparent"
                _focus={{ border: 'none' }}
                _focusVisible={{}}
                placeholder={t('The summary of the post')}
                color="utils.text"
                fontSize={'18px'}
                fontWeight={600}
                paddingX={6}
                paddingY={0}
                name="description"
                minHeight={7}
                value={postForm.description}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />
            </VStack>

            <Box flex={1} width="100%" paddingX={6}>
              {isStoryLoading ? null : (
                <MarkdownField
                  initialContentReady={!loading}
                  initialContent={() => postForm.markdown || ''}
                  content={postForm.markdown || ''}
                  name="markdown"
                  flex
                  control={control}
                  isFloatingToolbar
                  toolbarMaxWidth={dimensions.project.posts.view.maxWidth}
                  enableRawMode
                  autoFocus={Boolean(focusFlag)}
                  isEditorMode={isEditorMode}
                  toggleEditorMode={handleToggleEditorMode}
                />
              )}
            </Box>
          </VStack>
        </CardLayout>
      </VStack>
      <AlertDialogue
        {...confirmViewPostModal}
        title={t('Don’t Lose Your Progress')}
        description={t(
          'You’re about to leave. Consider saving your post as a draft to avoid losing your work and finish it later.',
        )}
        hasCancel
        positiveButtonProps={{
          children: t('Continue'),
          as: Link,
          to: confirmViewPostModal.props.path,
        }}
      />
    </>
  )
}

type ImageUploadUiProps = {
  isLoading?: boolean
} & StackProps

const ImageUploadUi = ({ isLoading, ...props }: ImageUploadUiProps) => {
  const { colors } = useCustomTheme()
  return (
    <HStack
      width="100%"
      height="330px"
      borderRadius="8px"
      backgroundColor="neutral1.3"
      justifyContent="center"
      transition="background-color 0.5s ease"
      _hover={{
        cursor: 'pointer',
        backgroundColor: 'neutral1.6',
        transition: 'background-color 0.5s ease',
      }}
      {...props}
    >
      <Body size="lg" light medium>
        {isLoading ? t('uploading...') : t('Upload header image')}
      </Body>
      {isLoading ? <Spinner color="primary1.9" /> : <PiImages fontSize={'20px'} color={colors.neutral1[11]} />}
    </HStack>
  )
}
