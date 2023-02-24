import { useQuery } from '@apollo/client'
import { Box, HStack, Image, VStack } from '@chakra-ui/react'

import { H2, H3 } from '../../../../components/typography'
import Loader from '../../../../components/ui/Loader'
import { Project, UniqueProjectQueryInput } from '../../../../types'
import { AvatarElement } from '../../../projectView/projectMainBody/components'
import { QUERY_FEATURED_PROJECT_FOR_LANDING_PAGE } from '../../projects.graphql'
import { ProjectFundingStatWithFollow } from './ProjectFundingStatWithFollow'
import { ProjectRowLayout } from './ProjectRowLayout'

export const FeaturedProjectCard = ({
  projectName,
}: {
  projectName: string
}) => {
  const { data, loading } = useQuery<
    { project: Project },
    { where: UniqueProjectQueryInput }
  >(QUERY_FEATURED_PROJECT_FOR_LANDING_PAGE, {
    variables: {
      where: {
        name: projectName,
      },
    },
  })

  const project = data?.project

  if (!project || loading) {
    return <Loader />
  }

  return (
    <ProjectRowLayout title="Featured Project" width="100%">
      <HStack width="100%" height="245px" alignItems="start" spacing="20px">
        <Box flex={4} height="100%" borderRadius="8px" overflow="hidden">
          <Image
            height="full"
            width="full"
            src="https://picsum.photos/200/300"
            objectFit="cover"
          ></Image>
        </Box>
        <VStack
          flex={3}
          height="100%"
          alignItems="start"
          justifyContent="start"
          spacing="10px"
          overflow="hidden"
        >
          <H2 color="brand.neutral700"> {project.title} </H2>
          <AvatarElement user={project.owners[0].user} />
          <H3
            color="brand.neutral800"
            isTruncated
            noOfLines={5}
            whiteSpace="normal"
          >
            {project.shortDescription}
          </H3>
          <ProjectFundingStatWithFollow
            flex={1}
            pb={1}
            align={'flex-end'}
            justifyContent={'space-between'}
            project={project}
            bold
          />
        </VStack>
      </HStack>
    </ProjectRowLayout>
  )
}
