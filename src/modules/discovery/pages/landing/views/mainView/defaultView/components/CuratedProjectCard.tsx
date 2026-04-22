import { Badge, Box, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectForLandingPageFragment, ProjectFundingStrategy } from '@/types/index.ts'

type CuratedProjectCardProps = {
  project: ProjectForLandingPageFragment
}

/** Curated landing-page project card with thumbnail, title, description, and CTA. */
export const CuratedProjectCard = ({ project }: CuratedProjectCardProps) => {
  const navigate = useNavigate()

  const handleViewProject = () => {
    navigate(getPath('project', project.name))
  }

  const getFundingLabel = () => {
    if (project.fundingStrategy === ProjectFundingStrategy.TakeItAll) {
      return t('Flexible')
    }

    if (project.fundingStrategy === ProjectFundingStrategy.AllOrNothing) {
      return t('All-or-nothing')
    }

    return null
  }

  const fundingLabel = getFundingLabel()

  return (
    <CardLayout
      width="100%"
      dense
      spacing={0}
      alignItems="stretch"
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      cursor="pointer"
      _hover={{
        transform: 'translateY(-2px)',
      }}
      onClick={handleViewProject}
    >
      <Box width="100%" aspectRatio={1} position="relative" overflow="hidden">
        <ImageWithReload
          width="100%"
          height="100%"
          objectFit="cover"
          src={project.thumbnailImage || ''}
          alt={`${project.title}-thumbnail`}
        />
      </Box>

      <VStack padding={4} spacing={3} alignItems="start" flex={1}>
        <HStack w="full" alignItems="start" spacing={2} flexWrap="wrap">
          <H3 size="md" medium flex={1} noOfLines={2}>
            {project.title}
          </H3>
          {fundingLabel && (
            <Badge colorScheme="purple" fontSize="xs" paddingX={2} paddingY={1} borderRadius="md" textTransform="none">
              {fundingLabel}
            </Badge>
          )}
        </HStack>

        <Body size="sm" color="neutral1.11" noOfLines={3} flex={1}>
          {project.shortDescription}
        </Body>

        <Button
          variant="solid"
          colorScheme="primary1"
          size="md"
          width="100%"
          onClick={(event) => {
            event.stopPropagation()
            handleViewProject()
          }}
        >
          {t('View Project')}
        </Button>
      </VStack>
    </CardLayout>
  )
}
