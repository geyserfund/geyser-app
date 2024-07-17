import { Box, Button, HStack, Input, Textarea, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { PiArrowLeft, PiImages } from 'react-icons/pi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { FileUpload } from '@/components/molecules'
import { ImageWithReload } from '@/components/ui'
import Loader from '@/components/ui/Loader'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'
import { CardLayout } from '@/shared/components/layouts'
import { Body, H1 } from '@/shared/components/typography'
import { dimensions, getPath, ProjectEntryValidations } from '@/shared/constants'
import { useDebounce } from '@/shared/hooks'
import { Entry, EntryStatus } from '@/types'
import { isActive } from '@/utils'

import { entryTemplateForGrantApplicants, ProjectEntryEditor } from '../editor'
import { useEntryState } from '../hooks/useEntryState'

export const PostCreateEdit = () => {
  const navigate = useNavigate()

  const { project, loading: projectLoading } = useProjectAtom()

  const { postId } = useParams<{ postId: string }>()

  const location = useLocation()
  const { state } = location as { state: { grantId: number } }
  const entryTemplate = state?.grantId ? (entryTemplateForGrantApplicants as Entry) : undefined

  const [isEdit, setIsEdit] = useState(false)
  const [focusFlag, setFocusFlag] = useState('')

  const { loading, saving, updateEntry, hasDiff, entry, saveEntry, publishEntry, publishing } = useEntryState(
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
  const debouncedUpdateEntry = useDebounce(entry, entry.id ? 500 : 1000)

  useEffect(() => {
    if (debouncedUpdateEntry && debouncedUpdateEntry.status !== EntryStatus.Published) {
      saveEntry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUpdateEntry])

  useEffect(() => {
    if (entry.id) {
      setIsEdit(true)
    }
  }, [entry])

  const handleContentUpdate = (name: string, value: string) => {
    updateEntry({ [name]: value })
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
      updateEntry({ [name]: value })
    }
  }

  const onImageUpload = (url: string) => updateEntry({ image: url })

  const handleKeyDown = (event: any) => {
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
  }

  const getSaveButtonText = () => {
    if (saving) {
      return 'Saving'
    }

    if (isEdit) {
      if (hasDiff) {
        return 'Save'
      }

      return 'Saved'
    }

    return 'Save draft'
  }

  if (loading || projectLoading) {
    return <Loader />
  }

  const isEntryPublished = entry.status === EntryStatus.Published

  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectNavContainer>
        <Button
          as={Link}
          to={getPath('projectPosts', project?.name)}
          size={{ base: 'md', lg: 'lg' }}
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('Back to posts')}
        </Button>
        <HStack>
          <Button size={{ base: 'md', lg: 'lg' }} variant="soft" colorScheme="neutral1">
            {t(getSaveButtonText())}
          </Button>
          {!isEntryPublished && (
            <Tooltip label={!isActive(project.status) ? t('Cannot publish entry for inActive project') : ''}>
              <Button
                size={{ base: 'md', lg: 'lg' }}
                variant="solid"
                colorScheme="primary1"
                onClick={publishEntry}
                isDisabled={!isActive(project.status)}
                isLoading={publishing}
              >
                {t('Publish')}
              </Button>
            </Tooltip>
          )}
        </HStack>
      </ProjectNavContainer>

      <CardLayout noborder w="full" spacing={3} mobileDense alignItems="center">
        <VStack
          width={{
            base: dimensions.project.posts.view.maxWidth + 24 * 2,
            lg: dimensions.project.posts.view.maxWidth + 24 * 2,
          }}
          alignItems="start"
          paddingBottom="80px"
        >
          <H1 size="2xl" bold>
            {t('Write a post')}
          </H1>
          <CardLayout padding={{ base: 0, lg: '9px' }} w="full" backgroundColor={'utils.surface'}>
            <VStack
              spacing={3}
              width="100%"
              height="100%"
              maxWidth="1080px"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Box marginTop="20px" width="100%" paddingX="15px">
                <FileUpload onUploadComplete={onImageUpload}>
                  <>
                    {entry.image ? (
                      <HStack
                        width={'100%'}
                        justifyContent="center"
                        maxHeight="400px"
                        borderRadius="12px"
                        overflow="hidden"
                      >
                        <ImageWithReload width="100%" objectFit="cover" src={entry.image} />
                      </HStack>
                    ) : (
                      <HStack
                        width="100%"
                        minHeight="65px"
                        borderRadius="12px"
                        backgroundColor="neutral1.3"
                        justifyContent="center"
                        transition="background-color 0.5s ease"
                        _hover={{
                          cursor: 'pointer',
                          backgroundColor: 'neutral.400',
                          transition: 'background-color 0.5s ease',
                        }}
                      >
                        <Body size="lg" light medium>
                          {t('Upload header image')}
                        </Body>
                        <PiImages />
                      </HStack>
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
                  color="neutral.700"
                  fontSize={'20px'}
                  fontWeight={700}
                  paddingX={'15px'}
                  name="title"
                  value={entry.title}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                />

                <Textarea
                  id={'entry-description-input'}
                  border="none"
                  _focus={{ border: 'none' }}
                  _focusVisible={{}}
                  placeholder={t('The summary of the post')}
                  color="neutral.700"
                  fontSize={'18px'}
                  fontWeight={600}
                  paddingX={'15px'}
                  name="description"
                  value={entry.description}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                />
              </VStack>

              <Box flex={1} width="100%">
                <ProjectEntryEditor
                  name="content"
                  handleChange={handleContentUpdate}
                  value={entry.content as string}
                  focusFlag={focusFlag}
                  placeholder="The content of the post"
                />
              </Box>
            </VStack>
          </CardLayout>
        </VStack>
      </CardLayout>
    </VStack>
  )
}
