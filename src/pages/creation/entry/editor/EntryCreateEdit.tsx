import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { createUseStyles } from 'react-jss'
import { useNavigate, useParams } from 'react-router'

import { FileUpload } from '../../../../components/molecules'
import { ImageWithReload } from '../../../../components/ui'
import Loader from '../../../../components/ui/Loader'
import { getPath, ID } from '../../../../constants'
import { ProjectEntryValidations } from '../../../../constants/validations'
import { useAuthContext, useNavContext } from '../../../../context'
import { useDebounce } from '../../../../hooks'
import { useEntryState } from '../../../../hooks/graphqlState'
import { colors } from '../../../../styles'
import {
  EntryStatus,
  Owner,
  Project,
} from '../../../../types/generated/graphql'
import { toInt, useMobileMode, useNotification } from '../../../../utils'
import { CreateNav } from './CreateNav'
import { ProjectEntryEditor } from './ProjectEntryEditor'

const useStyles = createUseStyles({
  uploadContainer: {
    width: '100%',
    minHeight: '65px',
    borderRadius: '4px',
    backgroundColor: colors.bgGrey,
    justifyContent: 'center',
    transition: 'background-color 0.5s ease',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: colors.gray300,
      transition: 'background-color 0.5s ease',
    },
  },
})

export const defaultEntry = {
  id: 0,
  title: '',
  description: '',
  image: '',
  content: '',
  published: false,
  type: 'article',
}

const PROJECT_EDITOR_NAME = 'content'
const ENTRY_UPDATE_DEVOUNCE_MS = 1000

export const EntryCreateEdit = () => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()
  const navigate = useNavigate()
  const params = useParams<{ entryId: string; projectId: string }>()
  const { user } = useAuthContext()
  const { setNavData } = useNavContext()

  const classes = useStyles()

  const [isEdit, setIsEdit] = useState(false)
  const [focusFlag, setFocusFlag] = useState('')

  const { loading, saving, updateEntry, hasDiff, entry, saveEntry } =
    useEntryState(
      toInt(
        user?.ownerOf?.find(
          (project) => project?.project?.name === params.projectId,
        )?.project?.id || '',
      ),
      params.entryId,
      {
        fetchPolicy: 'network-only',
        onError() {
          navigate(getPath('notFound'))
        },
        onCompleted(data) {
          if (data.entry === null) {
            navigate(getPath('notFound'))
          }

          const project = data.entry.project as Project

          if (!project.owners.some((owner) => owner.user.id === user.id)) {
            navigate(getPath('notAuthorized'))
          }

          setNavData({
            projectName: project.name,
            projectTitle: project.title,
            projectPath: getPath('project', project.name),
            projectOwnerIDs:
              project.owners.map((ownerInfo: Owner) => {
                return Number(ownerInfo.user.id || -1)
              }) || [],
          })
        },
      },
    )
  const debouncedUpdateEntry = useDebounce(entry, ENTRY_UPDATE_DEVOUNCE_MS)

  useEffect(() => {
    if (
      debouncedUpdateEntry &&
      debouncedUpdateEntry.status !== EntryStatus.Published
    ) {
      saveEntry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUpdateEntry])

  useEffect(() => {
    if (entry.id) {
      setIsEdit(true)
    }
  }, [entry])

  const handleContentUpdate = useCallback(
    (name: string, value: string) => {
      updateEntry({ [name]: value })
    },
    [updateEntry],
  )

  const handleInput = (event: any) => {
    const { name, value } = event.target

    if (
      name === 'title' &&
      value.length > ProjectEntryValidations.title.maxLength
    ) {
      return
    }

    if (
      name === 'description' &&
      value.length > ProjectEntryValidations.description.maxLength
    ) {
      return
    }

    if (name) {
      updateEntry({ [name]: value })
    }
  }

  const onPreview = () => {
    if (isEdit) {
      navigate(
        getPath('projectEntryPreview', `${params.projectId}`, `${entry.id}`),
      )
    } else {
      toast({
        title: 'Cannot preview',
        description: 'Please edit your content before preview',
        status: 'info',
      })
    }
  }

  const onBack = () => {
    navigate(getPath('project', params.projectId || ''))
  }

  const onImageUpload = (url: string) => updateEntry({ image: url })

  const handleKeyDown = (event: any) => {
    if (event) {
      if (event.target.name === 'title') {
        if (event.key === 'ArrowDown' || event.key === 'Enter') {
          event.preventDefault()
          document.getElementById('entry-description-input')?.focus()
        }

        return
      }

      if (event.target.name === 'description') {
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          document.getElementById('entry-title-input')?.focus()
          return
        }

        if (
          event.key === 'ArrowDown' ||
          event.key === 'Tab' ||
          event.key === 'Enter'
        ) {
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

  if (loading) {
    return <Loader />
  }

  const isPublished = entry.status === EntryStatus.Published

  return (
    <>
      <CreateNav
        isSaving={saving}
        saveText={getSaveButtonText()}
        onSave={saveEntry}
        onPreview={!isPublished ? onPreview : undefined}
        onBack={onBack}
      />
      <VStack
        background={'brand.bgGrey4'}
        position="relative"
        paddingTop={isMobile ? '0px' : '15px'}
        height="100%"
        justifyContent="space-between"
      >
        <Box
          id={ID.entry.editEntryScrollContainer}
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          overflowY="auto"
          marginBottom="70px"
        >
          <VStack
            spacing="20px"
            width="100%"
            height="100%"
            maxWidth="1080px"
            padding={isMobile ? '0px 10px' : '0px 40px'}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            paddingBottom="80px"
          >
            <Box marginTop="20px" width="100%" px="15px">
              <FileUpload onUploadComplete={onImageUpload}>
                <>
                  {entry.image ? (
                    <HStack
                      width={'100%'}
                      justifyContent="center"
                      maxHeight="400px"
                      borderRadius="4px"
                      overflow="hidden"
                    >
                      <ImageWithReload
                        grey
                        width="100%"
                        objectFit="cover"
                        src={entry.image}
                      />
                    </HStack>
                  ) : (
                    <HStack className={classes.uploadContainer}>
                      <BsImage />
                      <Text> Select a header image</Text>
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
                placeholder="The Entry Title"
                color="brand.gray500"
                fontSize={isMobile ? '35px' : '40px'}
                fontWeight={700}
                paddingBottom="5px"
                paddingX="15px"
                name="title"
                value={entry.title || ''}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />

              <Input
                id={'entry-description-input'}
                border="none"
                _focus={{ border: 'none' }}
                _focusVisible={{}}
                placeholder="The summary of this entry"
                color="brand.gray500"
                fontSize={isMobile ? '20px' : '26px'}
                paddingX="15px"
                fontWeight={600}
                name="description"
                value={entry.description || ''}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />
            </VStack>

            <Box flex={1} width="100%">
              <ProjectEntryEditor
                name={PROJECT_EDITOR_NAME}
                handleChange={handleContentUpdate}
                value={entry.content as string}
                focusFlag={focusFlag}
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </>
  )
}
