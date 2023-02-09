import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { createUseStyles } from 'react-jss'
import { useLocation, useNavigate, useParams } from 'react-router'

import { FileUpload } from '../../../../components/molecules'
import { ImageWithReload } from '../../../../components/ui'
import Loader from '../../../../components/ui/Loader'
import { getPath } from '../../../../constants'
import { ProjectEntryValidations } from '../../../../constants/validations'
import { useAuthContext } from '../../../../context'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../../graphql'
import {
  MUTATION_CREATE_ENTRY,
  MUTATION_UPDATE_ENTRY,
} from '../../../../graphql/mutations/entries'
import { QUERY_GET_ENTRY } from '../../../../graphql/queries/entries'
import { useDebounce } from '../../../../hooks'
import {
  IEntryCreateInput,
  IEntryUpdateInput,
} from '../../../../interfaces/entry'
import { colors } from '../../../../styles'
import { Owner, Project } from '../../../../types/generated/graphql'
import { toInt, useMobileMode, useNotification } from '../../../../utils'
import { TcreateEntry, TEntry } from '../types'
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

export const EntryCreateEdit = () => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ entryId: string; projectId: string }>()
  const { setNav, user } = useAuthContext()

  const classes = useStyles()

  const [_form, _setForm] = useState<TEntry>(defaultEntry)
  const form = useRef(_form)
  const setForm = (value: TEntry) => {
    form.current = value
    _setForm(value)
  }

  const [focusFlag, setFocusFlag] = useState('')

  const debouncedUpdateEntry = useDebounce(form.current, 1000)

  const [createEntry, { data: createData, loading: createEntryLoading }] =
    useMutation(MUTATION_CREATE_ENTRY)

  const [updateEntry, { loading: updateEntryLoading }] = useMutation(
    MUTATION_UPDATE_ENTRY,
  )

  const [getEntry, { loading: loadingPosts, data: entryData }] = useLazyQuery(
    QUERY_GET_ENTRY,
    {
      onError() {
        navigate(getPath('notFound'))
      },
      onCompleted(data) {
        if (data.entry === null) {
          navigate(getPath('notAuthorized'))
        }
      },
    },
  )

  const { loading, data: projectData } = useQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: { where: { name: params.projectId } },
    onCompleted(data) {
      const project = data.project as Project

      if (!project.owners.some((owner) => owner.user.id === user.id)) {
        navigate(getPath('notAuthorized'))
      }

      setNav({
        projectName: data.project.name,
        projectTitle: data.project.title,
        projectPath: getPath('project', data.project.name),
        projectOwnerIDs:
          data.project.owners.map((ownerInfo: Owner) => {
            return Number(ownerInfo.user.id || -1)
          }) || [],
      })
    },
    onError() {
      navigate(getPath('notFound'))
    },
  })

  useEffect(() => {
    if (params && params.entryId) {
      try {
        getEntry({ variables: { id: toInt(params.entryId) } })
      } catch {
        navigate(getPath('notFound'))
      }
    }
  }, [params])

  useEffect(() => {
    if (entryData && entryData.entry) {
      setForm(entryData.entry)
    }
  }, [entryData])

  useEffect(() => {
    if (createData && createData.createEntry) {
      setForm(createData.createEntry)
    }
  }, [createData])

  useEffect(() => {
    if (debouncedUpdateEntry && debouncedUpdateEntry.id) {
      handleUpdateEntry(debouncedUpdateEntry)
    }
  }, [debouncedUpdateEntry])

  const handleCreateEntry = async (value: TcreateEntry) => {
    if (!form.current || !form.current.id) {
      if (
        form.current.content ||
        form.current.title ||
        form.current.description ||
        form.current.image
      ) {
        const { image, title, description, content } = value
        const input: IEntryCreateInput = {
          projectId: toInt(projectData?.project?.id),
          type: 'article',
          title,
          description,
          content,
          image,
        }
        try {
          await createEntry({ variables: { input } })
        } catch (error) {
          toast({
            title: 'Entry creation failed',
            description: 'Please try again later',
            status: 'error',
          })
        }
      }
    }
  }

  const handleUpdateEntry = async (params: TcreateEntry) => {
    const { image, title, description, content } = params
    if (form) {
      const input: IEntryUpdateInput = {
        entryId: toInt(form.current.id),
        title,
        description,
        content,
        image,
      }
      try {
        await updateEntry({ variables: { input } })
      } catch (error) {
        toast({
          title: 'Entry update failed',
          description: 'Please try again later',
          status: 'error',
        })
      }
    }
  }

  const handleContentUpdate = (name: string, value: string) => {
    const newForm = { ...form.current, [name]: value }
    setForm(newForm)
    handleCreateEntry(newForm)
  }

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
      const newForm = { ...form.current, [name]: value }
      setForm(newForm)
      handleCreateEntry(newForm)
    }
  }

  const onSave = () => {
    handleUpdateEntry(form.current)
  }

  const onPreview = () => {
    if (form.current && form.current.id) {
      navigate(
        getPath(
          'projectEntryPreview',
          `${params.projectId}`,
          `${form.current.id}`,
        ),
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
    if (location.key) {
      navigate(-1)
    } else {
      navigate(getPath('project', params.projectId || ''))
    }
  }

  const onImageUpload = (url: string) =>
    setForm({ ...form.current, image: url })

  const isEdit = Boolean(createData?.createEntry?.id) || Boolean(params.entryId)

  const handleEvent = (event: BeforeUnloadEvent) => {
    event.preventDefault()
    event.returnValue = 'are you there'
    return event
  }

  useEffect(() => {
    addEventListener('beforeunload', handleEvent, { once: true })
  }, [])

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
        } else if (
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

  if (loading || loadingPosts || (params.entryId && !form.current.id)) {
    return <Loader />
  }

  return (
    <>
      <CreateNav
        isSaving={createEntryLoading || updateEntryLoading}
        saveText={
          createEntryLoading || updateEntryLoading
            ? 'Saving'
            : isEdit
            ? 'Saved'
            : 'Save draft'
        }
        onSave={onSave}
        onPreview={onPreview}
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
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          overflowY="auto"
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
                  {form.current.image ? (
                    <HStack
                      width={'100%'}
                      justifyContent="center"
                      maxHeight="400px"
                      borderRadius="4px"
                      overflow="hidden"
                    >
                      <ImageWithReload
                        width="100%"
                        objectFit="cover"
                        src={form.current.image}
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
                value={form.current.title}
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
                value={form.current.description}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />
            </VStack>

            <Box flex={1} width="100%">
              <ProjectEntryEditor
                name="content"
                handleChange={handleContentUpdate}
                value={form.current.content}
                focusFlag={focusFlag}
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </>
  )
}
