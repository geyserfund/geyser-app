import { Box, Button, HStack, Input, Spinner, StackProps, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import { PiArrowLeft, PiImages } from 'react-icons/pi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { ImageWithReload, TextArea } from '@/components/ui'
import Loader from '@/components/ui/Loader'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useEntriesAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H1 } from '@/shared/components/typography'
import { dimensions, getPath, ProjectEntryValidations } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { MarkdownField } from '@/shared/markdown/MarkdownField'
import { FileUpload } from '@/shared/molecules'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { Entry, EntryStatus } from '@/types'
import { isActive, useCustomTheme, useNotification } from '@/utils'

import { useEntryForm } from '../hooks/useEntryForm'
import { entryTemplateForGrantApplicants } from '../utils/entryTemplate'

export const PostCreateEdit = () => {
  const navigate = useNavigate()
  const toast = useNotification()

  const confirmViewPostModal = useModal()

  const { project, loading: projectLoading } = useProjectAtom()

  const { hasEntries } = useEntriesAtom()

  const { postId } = useParams<{ postId: string }>()

  const location = useLocation()
  const { state } = location as { state: { grantId: number } }
  const entryTemplate = state?.grantId ? (entryTemplateForGrantApplicants as Entry) : undefined

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

  const { loading, saveEntry, saving, publishEntry, publishing, isDirty, setValue, watch, control } = useEntryForm(
    project.id,
    postId,
    {
      fetchPolicy: 'network-only',
      onError() {
        navigate(getPath('notFound'))
      },
      onCompleted(data) {
        if (data.entry === null) {
          navigate(getPath('notFound'))
        }
      },
    },
    entryTemplate,
  )

  const entryForm = watch()

  useEffect(() => {
    let number: any
    if (isDirty && entryForm.status !== EntryStatus.Published) {
      number = setInterval(() => {
        saveEntry()
      }, 2000)
    }

    if (entryForm.status === EntryStatus.Published) {
      clearInterval(number)
    }

    return () => clearInterval(number)
  }, [entryForm, isDirty, saveEntry])

  const handleSaveButtonClick = () => {
    saveEntry({
      onCompleted() {
        toast.success({
          title: 'Post saved successfully!',
        })
      },
    })
  }

  const handleInput = (event: any) => {
    const { name, value } = event.target

    if (name === 'title' && value.length > ProjectEntryValidations.title.maxLength) {
      return
    }

    if (name === 'description' && value.length > ProjectEntryValidations.description.maxLength) {
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
          document.getElementById('entry-description-input')?.focus()
        }
      } else if (event.target.name === 'description') {
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          document.getElementById('entry-title-input')?.focus()
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

    if (entryForm.id) {
      if (isDirty) {
        return 'Save'
      }

      return 'Saved'
    }

    return 'Save draft'
  }

  const handlePublishEntry = () => {
    publishEntry({
      onCompleted() {
        navigate(getPath('projectPostView', project.name, entryForm?.id), { state: { justPublished: true } })
      },
    })
  }

  if (loading || projectLoading) {
    return <Loader />
  }

  const isEntryPublished = entryForm?.status === EntryStatus.Published

  const postUrl = postId ? getPath('projectPostView', project.name, postId) : ''

  const handleBackClick = () => {
    const pathToGo = isEntryPublished
      ? postUrl
      : hasEntries
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
            {isEntryPublished ? t('Back to post') : hasEntries ? t('Back to posts') : t('Back to project')}
          </Button>
          <HStack>
            <Button size="lg" variant="soft" colorScheme="neutral1" onClick={handleSaveButtonClick}>
              {t(getSaveButtonText())}
            </Button>
            {!isEntryPublished && (
              <Tooltip label={!isActive(project.status) ? t('Cannot publish entry for inActive project') : ''}>
                <Button
                  size="lg"
                  variant="solid"
                  colorScheme="primary1"
                  onClick={handlePublishEntry}
                  isDisabled={!isActive(project.status)}
                  isLoading={publishing}
                >
                  {t('Publish')}
                </Button>
              </Tooltip>
            )}
          </HStack>
        </TopNavContainerBar>

        <CardLayout
          noborder
          backgroundColor="utils.pbg"
          w="full"
          h="full"
          flex={1}
          spacing={3}
          dense
          alignItems="center"
          paddingTop={8}
        >
          <VStack
            width="full"
            overflow={'hidden'}
            flex={1}
            maxWidth={dimensions.project.posts.view.maxWidth}
            alignItems="start"
          >
            <H1 size="2xl" bold>
              {t('Write a post')}
            </H1>
            <CardLayout
              padding={0}
              paddingY="24px"
              w="full"
              flex={1}
              backgroundColor={'utils.surface'}
              height="calc(100% - 40px)"
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
                      {entryForm.image ? (
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
                          <ImageWithReload width="100%" objectFit="cover" src={entryForm.image} />
                        </HStack>
                      ) : (
                        <ImageUploadUi />
                      )}
                    </>
                  </FileUpload>
                </Box>

                <VStack width="100%">
                  <Input
                    id={'entry-title-input'}
                    border="none"
                    _focus={{ border: 'none' }}
                    _focusVisible={{}}
                    placeholder={t('Post Title')}
                    color="utils.text"
                    fontSize={'20px'}
                    fontWeight={700}
                    paddingX={6}
                    name="title"
                    value={entryForm.title}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                  />

                  <TextArea
                    id={'entry-description-input'}
                    border="none"
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
                    value={entryForm.description}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                  />
                </VStack>

                <Box flex={1} width="100%" paddingX={6}>
                  {isStoryLoading ? null : (
                    <MarkdownField
                      initialContentReady={!loading}
                      initialContent={() => entryForm.markdown || ''}
                      content={entryForm.markdown || ''}
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
        </CardLayout>
      </VStack>
      <AlertDialogue
        {...confirmViewPostModal}
        title={t('Unsaved changes will be lost!')}
        description={t('Are you sure you want to leave this screen?')}
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
