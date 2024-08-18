import { Box, Heading, VStack } from '@chakra-ui/react'
import { useState } from 'react'

import { CustomSelect } from '@/components/ui/CustomSelect'
import PlatformLayout from '@/components/ui/PlatformLayout'
import { useAuthContext } from '@/context'

import ProjectCard from '../components/ProjectCard'
import { useMyProjects } from '../hooks/useMyProjects'

export const MyProjects = () => {
  const [timePeriod, setTimePeriod] = useState<'week' | 'month'>('week')
  const { user } = useAuthContext()
  const { projects, isLoading } = useMyProjects(user?.id)

  return (
    <PlatformLayout>
      <VStack spacing={6} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            My Projects
          </Heading>
          <CustomSelect
            width="200px"
            value={timePeriod}
            onChange={(e: any) => setTimePeriod(e.target.value as 'week' | 'month')}
          >
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </CustomSelect>
        </Box>
        {isLoading && <Box>Loading...</Box>}
        {projects && projects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
      </VStack>
    </PlatformLayout>
  )
}
