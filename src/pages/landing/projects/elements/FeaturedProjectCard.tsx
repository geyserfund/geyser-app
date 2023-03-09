import { useQuery } from '@apollo/client'
import { Box, HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { H2, H3 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { Project, UniqueProjectQueryInput } from '../../../../types'
import { AvatarElement } from '../../../projectView/projectMainBody/components'
import { FundingStatWithFollow } from '../../components/FundingStatWithFollow'
import { QUERY_FEATURED_PROJECT_FOR_LANDING_PAGE } from '../projects.graphql'
import { ProjectRowLayout } from './ProjectRowLayout'

export const FeaturedProjectCard = ({
  projectName,
}: {
  projectName: string
}) => {
  const navigate = useNavigate()
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

  if (loading || !project) {
    return <FeaturedProjectSkeleton />
  }

  return (
    <ProjectRowLayout title="Featured Project" width="100%">
      <CardLayout
        noborder
        hover
        direction={{ base: 'column', sm: 'row' }}
        width="100%"
        height={{ base: 'auto', sm: '245px' }}
        alignItems="start"
        spacing="20px"
        padding="0px"
        onClick={() => navigate(getPath('project', projectName))}
      >
        <Box
          width={{ base: '100%', sm: '55%' }}
          height={{ base: '240px', sm: '100%' }}
          borderTopRightRadius="8px"
          borderBottomRightRadius="8px"
          overflow="hidden"
        >
          <ImageWithReload
            height="full"
            width="full"
            src={`${project.thumbnailImage}`}
            objectFit="cover"
          />
        </Box>
        <VStack
          width={{ base: '100%', sm: '45%' }}
          height="100%"
          minWidth="200px"
          alignItems="start"
          justifyContent="start"
          spacing="10px"
          overflow="hidden"
        >
          <H2 color="brand.neutral700"> {project.title} </H2>
          <AvatarElement
            wrapperProps={{ minHeight: '20px' }}
            noLink
            rounded="full"
            user={project.owners[0].user}
          />
          <H3 color="brand.neutral800" isTruncated whiteSpace="normal">
            {project.shortDescription}
          </H3>
          <FundingStatWithFollow
            flex={1}
            pb={1}
            align={'center'}
            justifyContent={'space-between'}
            fundersCount={project.fundersCount || 0}
            amountFunded={project.balance}
            projectId={project.id}
            bold
          />
        </VStack>
      </CardLayout>
    </ProjectRowLayout>
  )
}

export const FeaturedProjectSkeleton = () => {
  return (
    <ProjectRowLayout title="Featured Project" width="100%">
      <CardLayout
        noborder
        direction={{ base: 'column', sm: 'row' }}
        width="100%"
        height={{ base: 'auto', sm: '245px' }}
        alignItems="start"
        spacing="20px"
        padding="0px"
      >
        <Skeleton
          width={{ base: '100%', sm: '55%' }}
          height={{ base: '240px', sm: '100%' }}
          borderRadius="8px"
          overflow="hidden"
        />
        <VStack
          width={{ base: '100%', sm: '45%' }}
          height="100%"
          minWidth="200px"
          alignItems="start"
          justifyContent="start"
          spacing="10px"
          overflow="hidden"
        >
          <Skeleton borderRadius="8px" width="80%" height="20px" />
          <Skeleton borderRadius="8px" width="60%" height="20px" />
          <Skeleton borderRadius="8px" width="100%" height="20px" />
          <SkeletonText noOfLines={5} width="100%" />
          <HStack>
            <Skeleton borderRadius="8px" height="40px" width="40px" />
            <Skeleton borderRadius="8px" height="40px" width="40px" />
            <Skeleton borderRadius="8px" height="40px" width="40px" />
          </HStack>
        </VStack>
      </CardLayout>
    </ProjectRowLayout>
  )
}
