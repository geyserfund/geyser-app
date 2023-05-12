import { ApolloError } from '@apollo/client'
import { Box } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { ProjectNav } from '../../components/nav'
import Loader from '../../components/ui/Loader'
import { Head } from '../../config/Head'
import { getPath, ProjectEntryThumbnailPlaceholderUrl } from '../../constants'
import { useProjectContext } from '../../context'
import { ProjectProvider } from '../../context'
import { useFundingFlow, useFundingFormState } from '../../hooks'
import {
  EntryFragment,
  FundingResourceType,
  ProjectRewardForCreateUpdateFragment,
  useEntryLazyQuery,
} from '../../types/generated/graphql'
import { toInt, useMobileMode } from '../../utils'
import { compactMap } from '../../utils/formatData/compactMap'
import { NotFoundPage } from '../notFound'
import { ProjectActivityPanel } from '../projectView/projectActivityPanel'
import { EntryContainer } from './EntryContainer'

export const EntryPage = () => {
  const { entryId } = useParams<{ entryId: string }>()
  const navigate = useNavigate()

  const [getEntry, { loading, error, data: entryData }] = useEntryLazyQuery({
    onCompleted(data) {
      const { entry } = data
      if (!entry) {
        navigate(getPath('notFound'))
      }
    },
    onError(error) {
      console.error(error)
      navigate(getPath('notFound'))
    },
  })

  useEffect(() => {
    if (entryId) {
      getEntry({ variables: { id: toInt(entryId) } })
    }
  }, [entryId, getEntry])

  return (
    <ProjectProvider
      projectId={Number(
        entryData && entryData.entry && entryData.entry.project?.id,
      )}
    >
      <EntryViewWrapper
        loading={loading}
        error={error}
        entry={entryData?.entry}
      />
    </ProjectProvider>
  )
}

interface IEntryViewWrapper {
  entry?: EntryFragment | null
  loading: boolean
  error: ApolloError | undefined
}

const EntryViewWrapper = ({ entry, loading, error }: IEntryViewWrapper) => {
  const isMobile = useMobileMode()

  const {
    project,
    error: projectError,
    loading: projectLoading,
  } = useProjectContext()

  const [detailOpen, setDetailOpen] = useState(true)

  const fundingFlow = useFundingFlow()

  const { setFundState } = fundingFlow

  const rewards =
    (project?.rewards &&
      compactMap<ProjectRewardForCreateUpdateFragment>(project.rewards)) ||
    []

  const fundForm = useFundingFormState({ rewards })

  if (loading || projectLoading || !project) {
    return <Loader paddingTop="65px" />
  }

  if (error || !entry || projectError) {
    return <NotFoundPage />
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        overflow="hidden"
        position="relative"
        bg="brand.bgGrey4"
      >
        <Head
          title={`${entry.title} - ${project.title}`}
          description={entry.description}
          image={
            entry.image ||
            entry.project?.image ||
            ProjectEntryThumbnailPlaceholderUrl
          }
        />
        <EntryContainer
          entry={entry}
          {...{ detailOpen, setDetailOpen, setFundState }}
        />
        <ProjectActivityPanel
          {...{ detailOpen, setDetailOpen, project, fundingFlow, fundForm }}
          resourceType={FundingResourceType.Entry}
          resourceId={entry.id}
        />
        {isMobile && <ProjectNav />}
      </Box>
    </Box>
  )
}
