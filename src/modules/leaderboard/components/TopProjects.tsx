import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { GlobalProjectLeaderboardRow, LeaderboardPeriod } from '@/types'
import { commaFormatted, useMobileMode } from '@/utils'

import { useTopProjects } from '../hooks'
import { ScrollableList } from './ScrollableList'

interface TopProjectsProps {
  period: LeaderboardPeriod
}

export const TopProjects = ({ period }: TopProjectsProps) => {
  const { t } = useTranslation()
  const { projects } = useTopProjects(period, 20)

  const id = 'top-projects-scroll-container'

  return (
    <VStack width="full" alignItems="flex-start" spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        {t('Top Projects')}
      </Text>
      <VStack width="full" spacing={2} maxHeight="600px" overflowY="auto" id={id}>
        <ScrollableList
          data={projects}
          renderItem={(project, index) => <ProjectItem key={project.projectName} project={project} rank={index + 1} />}
        />
      </VStack>
    </VStack>
  )
}

const ProjectItem = ({ project, rank }: { project: GlobalProjectLeaderboardRow; rank: number }) => {
  const { t } = useTranslation()

  return (
    <HStack width="full" spacing={4} p={2} borderBottom="1px" borderColor="gray.200">
      <Text fontWeight="bold" minWidth="30px">
        {rank <= 3 ? <RankMedal rank={rank} /> : `#${rank}`}
      </Text>
      <VStack alignItems="flex-start" flex={1}>
        <Text fontWeight="bold">{project.projectTitle}</Text>
        <Text fontSize="sm">{commaFormatted(project.contributionsTotal)} sats</Text>
        <Text fontSize="sm">{t('{{count}} contributions', { count: project.contributionsCount })}</Text>
        <Text fontSize="sm">{t('{{count}} contributors', { count: project.contributorsCount })}</Text>
      </VStack>
    </HStack>
  )
}

const RankMedal = ({ rank }: { rank: number }) => {
  const medalColors = ['gold', 'silver', 'bronze']
  return <Image src={`/images/medals/${medalColors[rank - 1]}.svg`} alt={`Rank ${rank}`} boxSize="24px" />
}
