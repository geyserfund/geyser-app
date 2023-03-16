import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Box, Input, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router'

import { CardLayout } from '../../../components/layouts'
import {
  ButtonComponent,
  ImageWithReload,
  TextInputBox,
} from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { getPath } from '../../../constants'
import { ProjectEntryValidations } from '../../../constants/validations'
import { useNavContext } from '../../../context'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql'
import {
  MUTATION_PUBLISH_ENTRY,
  MUTATION_UPDATE_ENTRY,
} from '../../../graphql/mutations/entries'
import { QUERY_GET_ENTRY } from '../../../graphql/queries/entries'
import { IEntryUpdateInput } from '../../../interfaces/entry'
import { EntryStatus, Owner, Project } from '../../../types/generated/graphql'
import { isDraft, toInt, useNotification } from '../../../utils'
import { defaultEntry } from './editor'
import { CreateNav } from './editor/CreateNav'
import { TEntry } from './types'

let isEdited = false

export const EntryPreview = () => {
  const params = useParams<{ entryId: string; projectId: string }>()

  const { toast } = useNotification()
  const navigate = useNavigate()
  const { setNavData } = useNavContext()

  const [isEntryPublished, setIsEntryPublished] = useState(false)
  const [hasCopiedSharingLink, setHasCopiedSharingLink] = useState(false)

  const [entry, setEntry] = useState<TEntry>(defaultEntry)

  const [getPost, { loading: loadingPosts, data: entryData }] = useLazyQuery(
    QUERY_GET_ENTRY,
    {
      onCompleted(data) {
        if (data.entry === null) {
          navigate(getPath('notFound'))
        }

        if (data.entry.status === EntryStatus.Published) {
          navigate(getPath('entry', `${params.entryId}`))
        }
      },
    },
  )

  const [updatePost, { loading: updatePostLoading }] = useMutation(
    MUTATION_UPDATE_ENTRY,
  )

  const [publishPost] = useMutation(MUTATION_PUBLISH_ENTRY, {
    onCompleted() {
      setIsEntryPublished(true)
    },
  })

  const { loading, data: projectData } = useQuery<{ project: Project }>(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: { where: { name: params.projectId } },
      onCompleted(data) {
        setNavData({
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
    },
  )

  useEffect(() => {
    if (params && params.entryId) {
      getPost({ variables: { id: toInt(params.entryId) } })
    }
  }, [params])

  useEffect(() => {
    if (entryData && entryData.entry) {
      setEntry(entryData.entry)
    }
  }, [entryData])

  const handleUpdateEntry = async () => {
    if (entry) {
      const { image, title, description, content, id } = entry
      try {
        const input: IEntryUpdateInput = {
          entryId: toInt(id),
          title,
          description,
          content,
          image,
        }
        await updatePost({ variables: { input } })
        isEdited = false
      } catch (error) {
        toast({
          title: 'Entry update failed',
          description: 'Please try again later',
          status: 'error',
        })
      }
    }
  }

  const onSave = () => {
    if (entry) {
      handleUpdateEntry()
    }
  }

  const onBack = () => {
    if (params.projectId && params.entryId) {
      navigate(getPath('projectEntryDetails', params.projectId, params.entryId))
    }
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
      const newForm = { ...entry, [name]: value }
      setEntry(newForm)
      isEdited = true
    }
  }

  const handlePublish = async () => {
    try {
      if (isEdited) {
        await handleUpdateEntry()
      }

      await publishPost({ variables: { id: toInt(entry.id) } })
    } catch (error) {
      toast({
        title: 'Entry publish failed',
        description: 'Please try again later',
        status: 'error',
      })
    }
  }

  const handleGoToPost = () => {
    if (params.entryId) {
      navigate(getPath('entry', params.entryId))
    }
  }

  const handleTwitterShareButtonTapped = () => {
    if (params.entryId) {
      navigator.clipboard.writeText(
        `${window.location.origin}${getPath('entry', params.entryId)}`,
      )

      setHasCopiedSharingLink(true)
    }
  }

  if (loadingPosts || loading) {
    return <Loader />
  }

  return (
    <>
      <CreateNav
        isSaving={updatePostLoading}
        saveText={updatePostLoading ? 'Saving...' : 'Saved'}
        onSave={onSave}
        onBack={onBack}
      />
      <CardLayout
        background={'brand.bgGrey4'}
        position="relative"
        paddingTop={'70px'}
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <VStack
          spacing="20px"
          width="100%"
          maxWidth="380px"
          padding={'0px 10px'}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          paddingBottom="80px"
        >
          <Text fontSize="33px" fontWeight={600} color="brand.gray500">
            {isEntryPublished ? 'Share entry' : 'Publish entry'}
          </Text>

          {isEntryPublished ? (
            <VStack width="100%" alignItems="center">
              <Box
                borderRadius="50%"
                backgroundColor="brand.primary"
                padding="10px"
              >
                <BsCheckLg />
              </Box>

              <Text>Your entry is live!</Text>
            </VStack>
          ) : null}

          <Text fontSize="14px" color="brand.neutral800">
            {!isEntryPublished ? 'Edit Social Preview' : 'Preview'}{' '}
          </Text>

          <VStack
            alignItems="flex-start"
            backgroundColor="white"
            border="1px solid"
            borderColor="brand.neutral200"
            borderRadius="4px"
          >
            <Box height="220px" width="350px" overflow="hidden">
              <ImageWithReload
                src={entry.image}
                height="220px"
                width="350px"
                objectFit="cover"
              />
            </Box>
            <VStack width="100%" padding="5px">
              <Text fontSize="11px" color="brand.gray500">
                {`geyser.fund/${projectData?.project?.name}`}
              </Text>

              <Input
                border="none"
                _focus={{ border: 'none' }}
                _focusVisible={{}}
                placeholder="Title"
                color="brand.gray500"
                fontSize="28px"
                fontWeight={700}
                marginTop="20px"
                paddingX="0"
                name="title"
                value={entry.title}
                onChange={handleInput}
                disabled={isEntryPublished}
              />
              <Input
                border="none"
                _focus={{ border: 'none' }}
                _focusVisible={{}}
                placeholder="Title"
                color="brand.gray500"
                fontSize="16px"
                fontWeight={700}
                marginTop="0px"
                paddingX="0"
                name="description"
                value={entry.description}
                onChange={handleInput}
                disabled={isEntryPublished}
              />
            </VStack>
          </VStack>
          {!isEntryPublished && (
            <VStack alignItems="flex-start" width="100%">
              <Text fontSize="14px" color="brand.neutral800">
                Linked project
              </Text>
              <Text>Where should Satoshi donations go to?</Text>
              <TextInputBox
                isDisabled
                value={`${projectData?.project.name}@geyser.fund`}
              />
            </VStack>
          )}
          {isEntryPublished ? (
            <VStack width="100%">
              <ButtonComponent
                w="full"
                onClick={handleTwitterShareButtonTapped}
                primary={hasCopiedSharingLink}
              >
                {hasCopiedSharingLink ? 'Copied Link!' : 'Share on Twitter'}
              </ButtonComponent>

              <ButtonComponent primary w="full" onClick={handleGoToPost}>
                Go to entry
              </ButtonComponent>
            </VStack>
          ) : isDraft(projectData?.project.status) ? (
            <>
              <Text>
                You cannot publish a entry in an inactive project. Finish the
                project configuration or re-activate the project to publish this
                entry.
              </Text>
              <ButtonComponent
                primary
                w="full"
                onClick={() =>
                  navigate(
                    getPath('projectDashboard', projectData?.project.name),
                  )
                }
              >
                Go to Project Dashboard
              </ButtonComponent>
            </>
          ) : (
            <ButtonComponent primary w="full" onClick={handlePublish}>
              Publish
            </ButtonComponent>
          )}
        </VStack>
      </CardLayout>
    </>
  )
}
