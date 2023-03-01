import { Box, Button, Image, Text } from '@chakra-ui/react'

import { H3 } from '../../../components/typography'
import { Project } from '../../../types'
import { useMobileMode } from '../../../utils'
import { AvatarElement } from '../../projectView/projectMainBody/components'
import { SectionCard } from './SectionCard'

interface Props {
  projects: Array<Project>
}

export const CommunityVoting = ({ projects }: Props) => {
  const isMobile = useMobileMode()
  return (
    <SectionCard p={5}>
      <H3 fontSize="18px">
        Let the Sats flow to your favorite projects. 1 Sat = 1 vote.
      </H3>
      {projects.map((project) => (
        <SectionCard p={2} key={project.id}>
          <Box display="flex">
            {project.thumbnailImage && (
              <Image
                mr={3}
                borderRadius="7px"
                width={isMobile ? '90px' : '144px'}
                height={'101px'}
                src={project.thumbnailImage}
                alt="project thumbnail"
              />
            )}
            <Box pr={2}>
              <H3 fontSize="18px">{project.title}</H3>
              <Text>{project.shortDescription}</Text>
            </Box>
          </Box>
          <Box pl={2}>
            {project.funders.filter(Boolean).map(
              (funder) =>
                funder &&
                funder.user && (
                  <AvatarElement
                    key={funder.id}
                    wrapperProps={{
                      display: 'inline-block',
                      marginLeft: '-5px',
                      marginTop: 2,
                    }}
                    avatarOnly
                    borderRadius="50%"
                    user={funder.user}
                  />
                ),
            )}
          </Box>
          <Button mt={3} height="57px" variant="hugeContained">
            Vote
          </Button>
        </SectionCard>
      ))}
    </SectionCard>
  )
}
