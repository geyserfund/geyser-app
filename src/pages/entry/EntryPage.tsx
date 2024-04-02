import { ApolloError } from '@apollo/client'
import { Box } from '@chakra-ui/layout'
import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import Loader from '../../components/ui/Loader'
import { Head } from '../../config'
import { getPath, ProjectEntryThumbnailPlaceholderUrl } from '../../constants'
import { useProjectContext } from '../../context'
import { ProjectProvider } from '../../context'
import { EntryFragment, FundingResourceType, useEntryLazyQuery } from '../../types'
import { toInt, useMobileMode } from '../../utils'
import { NotFoundPage } from '../fallback/NotFoundPage'
import { FundingProvider } from '../projectFunding/context/FundingFlow'
import { FundingStages, useFundingStage } from '../projectFunding/state/fundingStagesAtom'
import { ProjectActivityPanel } from '../projectView/projectActivityPanel'
import { ProjectMobileBottomNavigation } from '../projectView/projectNavigation/components/ProjectMobileBottomNavigation'
import { useEntryAtom } from './entryAtom'

export const EntryPage = () => {
  const { entryId } = useParams<{ entryId: string }>()
  const navigate = useNavigate()

  const [entry, setEntry] = useEntryAtom()

  const [getEntry, { loading, error }] = useEntryLazyQuery({
    onCompleted(data) {
      const { entry } = data
      if (entry) {
        setEntry(entry)
        return
      }

      navigate(getPath('notFound'))
    },
    onError() {
      navigate(getPath('notFound'))
    },
  })

  useEffect(() => {
    if (entryId) {
      getEntry({ variables: { id: toInt(entryId) } })
    }
  }, [entryId, getEntry])

  return (
    <ProjectProvider projectId={Number(entry.project?.id)}>
      <FundingProvider>
        <EntryViewWrapper loading={loading} error={error} entry={entry} />
      </FundingProvider>
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

  const { project, error: projectError, loading: projectLoading } = useProjectContext()
  const { fundingStage } = useFundingStage()

  if (loading || projectLoading || !project) {
    return <Loader paddingTop="65px" />
  }

  if (error || !entry || projectError) {
    return <NotFoundPage />
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        overflow="hidden"
        position="relative"
        bg="neutral.0"
      >
        <Head
          title={`${entry.title} - ${project.title}`}
          description={entry.description}
          image={entry.image || entry.project?.image || ProjectEntryThumbnailPlaceholderUrl}
        />
        <Outlet />
        <ProjectActivityPanel resourceType={FundingResourceType.Entry} resourceId={entry.id} />
        {isMobile && fundingStage === FundingStages.initial && <ProjectMobileBottomNavigation fixed />}
      </Box>
    </Box>
  )
}
