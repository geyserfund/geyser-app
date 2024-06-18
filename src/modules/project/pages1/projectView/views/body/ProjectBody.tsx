import { HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../../../shared/components/layouts'
import { ProjectStatus } from '../../../../../../types'
import { useProjectAtom } from '../../hooks/useProjectAtom'
import { FinalizeProjectNotice, Header, LaunchProjectNotice } from './sections'

export const ProjectBody = () => {
  const { project, loading } = useProjectAtom()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (project?.status === ProjectStatus.Draft && !location.pathname.includes('/draft')) {
      navigate(location.pathname + '/draft')
    } else if (project?.status === ProjectStatus.Active && location.pathname.includes('/draft')) {
      navigate(location.pathname.replace('/draft', ''))
    }
  }, [project?.status, location.pathname, navigate, project?.name, loading])

  // const projectDetails = useProjectDetails(project)

  return (
    <HStack w="full" overflow="visible" spacing={4}>
      <VStack flex={8} w="full">
        <FinalizeProjectNotice />
        <LaunchProjectNotice />
        <Header />
      </VStack>
      <VStack w="full" flex={5} justifyContent="start">
        <CardLayout w="full">
          <Text>Project Contribution Summary</Text>
        </CardLayout>
      </VStack>

      {/* <Story />
      <ShareProject />
      <Rewards /> */}
      {/* {projectDetails.entriesLength ? <Entries /> : null}
      {goals.hasGoals ? <Goals /> : null} */}
      {/* <CreatorTools />
      <Details /> */}
    </HStack>
  )
}
