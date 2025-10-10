import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { useAtom } from 'jotai'

import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook.tsx'
import { ProjectsMostFundedAllOrNothingRange, useProjectsMostFundedAllOrNothingQuery } from '@/types/index.ts'

import { LandingProjectCard } from '../../../components/LandingProjectCard.tsx'
import { campaignProjectsAtom } from './campaignProjectsAtom.ts'

const NO_OF_PROJECT_TO_LOAD = 20

export const Campaigns = () => {
  const [campaignProjects, setCampaignProjects] = useAtom(campaignProjectsAtom)

  const { fetchMore } = useProjectsMostFundedAllOrNothingQuery({
    variables: {
      input: {
        take: NO_OF_PROJECT_TO_LOAD,
        range: ProjectsMostFundedAllOrNothingRange.Week,
      },
    },
    onCompleted(data) {
      handleDataUpdate(data.projectsMostFundedAllOrNothing.map((project) => project.project))
    },
  })

  const { handleDataUpdate } = usePaginationAtomHook({
    fetchMore,
    queryName: ['projectsMostFundedAllOrNothing', 'projects'],
    itemLimit: NO_OF_PROJECT_TO_LOAD,
    setData: setCampaignProjects,
  })

  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={{ base: 4, lg: 8 }}>
      {campaignProjects.map((project) => (
        <GridItem key={project.id}>
          <LandingProjectCard key={project.id} project={project} />
        </GridItem>
      ))}
    </SimpleGrid>
  )
}
