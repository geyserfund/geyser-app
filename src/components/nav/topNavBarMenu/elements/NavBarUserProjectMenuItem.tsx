import { Container, Heading, HStack, Text, VStack } from '@chakra-ui/react'

import { Project } from '../../../../types/generated/graphql'
import { ProjectListItemImage } from '../../../molecules'

type Props = {
  project: Pick<Project, 'title' | 'name' | 'thumbnailImage'>
}

export const NavBarUserProjectMenuItem = ({ project }: Props) => {
  return (
    <Container padding={4}>
      <VStack
        spacing={1}
        paddingX={2}
        paddingY={1.5}
        alignItems="flex-start"
        backgroundColor={'neutral.200'}
        borderRadius="sm"
        overflow={'hidden'}
      >
        <Text
          textTransform={'uppercase'}
          fontSize="xs"
          fontWeight={'bold'}
          color={'neutral.500'}
        >
          Project
        </Text>

        <HStack spacing={1} overflow="hidden" width="full">
          <ProjectListItemImage project={project} flexShrink={0} />

          <Heading fontWeight={600} fontSize="16px" as={'h6'} isTruncated>
            {project.title}
          </Heading>
        </HStack>
      </VStack>
    </Container>
  )
}
