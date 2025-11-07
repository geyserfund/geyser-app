import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useTopProjects } from '@/modules/discovery/hooks/useTopProjects.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { getPath } from '@/shared/constants'
import { LeaderboardPeriod } from '@/types'

import { ProjectHeroDisplay, ProjectHeroDisplaySkeleton } from '../../../../components/ProjectHeroDisplay.tsx'
import { ProjectRowLayout } from './ProjectRowLayout.tsx'

const MAX_PROJECTS = 12

export const TopProjects = () => {
  const navigate = useNavigate()

  const { projects, loading } = useTopProjects(LeaderboardPeriod.Month, MAX_PROJECTS)

  return (
    <ProjectRowLayout
      title={t('Top Projects this month')}
      width="100%"
      rightContent={
        <Button variant="soft" colorScheme="neutral1" onClick={() => navigate(getPath('hallOfFameProjects'))}>
          {t('See all')}
        </Button>
      }
    >
      <CardLayout w="full" direction="row" flexWrap={'wrap'}>
        {loading
          ? [...Array(12).keys()].map((key) => {
              return <ProjectHeroDisplaySkeleton key={key} />
            })
          : projects.map((project, index) => {
              return <ProjectHeroDisplay key={project.projectName} project={project} index={index} />
            })}
      </CardLayout>
    </ProjectRowLayout>
  )
}
