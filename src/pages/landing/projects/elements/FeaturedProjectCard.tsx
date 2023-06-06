import { Box, Stack, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { H2, H3 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { useFeaturedProjectForLandingPageQuery } from '../../../../types'
import { AvatarElement } from '../../../projectView/projectMainBody/components'
import { FundingStatWithFollow } from '../../components/FundingStatWithFollow'
import { FeaturedCardSkeleton } from './FeaturedSkeleton'
import { ProjectRowLayout } from './ProjectRowLayout'

export const FeaturedProjectCard = ({
  projectName,
}: {
  projectName: string
}) => {
  const navigate = useNavigate()
  const { data, loading } = useFeaturedProjectForLandingPageQuery({
    variables: {
      where: {
        name: projectName,
      },
    },
  })

  const project = data?.project

  if (loading || !project) {
    return <FeaturedCardSkeleton title="Featured Project" />
  }

  return (
    <ProjectRowLayout title="Featured Project" width="100%">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        width="100%"
        height={{ base: 'auto', sm: '245px' }}
        alignItems="start"
        spacing="0px"
        padding="0px"
        borderRadius="8px"
        overflow="hidden"
        onClick={() => navigate(getPath('project', projectName))}
        _hover={{ backgroundColor: 'neutral.100', cursor: 'pointer' }}
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
          padding="10px"
        >
          <H2 color="neutral.700"> {project.title} </H2>
          <AvatarElement
            wrapperProps={{ minHeight: '20px' }}
            noLink
            rounded="full"
            user={project.owners[0]?.user}
          />
          <H3
            color="neutral.800"
            noOfLines={3}
            isTruncated
            whiteSpace="normal"
          >
            {project.shortDescription}
          </H3>
          <FundingStatWithFollow
            flex={1}
            align={'center'}
            justifyContent={'space-between'}
            fundersCount={project.fundersCount || 0}
            amountFunded={project.balance}
            projectId={project.id}
            bold
          />
        </VStack>
      </Stack>
    </ProjectRowLayout>
  )
}
