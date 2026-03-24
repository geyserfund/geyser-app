import { Badge, Box, Button, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { SkeletonLayout } from '@/shared/components/layouts/index.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { getPathWithGeyserPromotionsHero } from '@/shared/constants/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import type { ProjectForLandingPageFragment } from '@/types/index.ts'

type LandingShowcaseProjectCardProps = {
  project: ProjectForLandingPageFragment
  description?: string | null
}

/** LandingShowcaseProjectCard renders the large static project card used in the landing carousel. */
export const LandingShowcaseProjectCard = ({ project, description }: LandingShowcaseProjectCardProps) => {
  const backgroundColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const mutedSurface = useColorModeValue('gray.50', 'gray.700')

  const typeCode = isAllOrNothing(project) ? 'AON' : 'TIA'
  const typeLabel = isAllOrNothing(project) ? t('All-or-nothing') : t('Flexible')

  return (
    <VStack
      align="stretch"
      spacing={0}
      width="100%"
      minHeight="100%"
      overflow="hidden"
      borderRadius="28px"
      border="1px solid"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      boxShadow="0 24px 70px rgba(15, 23, 42, 0.08)"
    >
      <Box position="relative" aspectRatio={1.2}>
        <ImageWithReload
          src={project.thumbnailImage || ''}
          alt={t('{{title}} project image', { title: project.title })}
          width="100%"
          height="100%"
          objectFit="cover"
        />
        <Box
          position="absolute"
          insetX={0}
          bottom={0}
          height="45%"
          background="linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.72) 100%)"
          pointerEvents="none"
        />
      </Box>

      <VStack align="stretch" spacing={5} p={{ base: 5, lg: 6 }} flex={1}>
        <VStack align="stretch" spacing={3} flex={1}>
          <H3 size={{ base: 'md', lg: 'xl' }} dark bold noOfLines={2}>
            {project.title}
          </H3>

          <Body color="neutral1.10" lineHeight={1.6} noOfLines={3}>
            {description || project.shortDescription || t('Support this project on Geyser')}
          </Body>
        </VStack>

        <HStack justify="space-between" spacing={3} align="center" flexWrap="wrap">
          <HStack spacing={3} flexWrap="wrap">
            <Badge
              px={3}
              py={1.5}
              borderRadius="full"
              bg="primary1.2"
              color="primary1.11"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.08em"
            >
              {typeCode}
            </Badge>
            <Body size="sm" color="neutral1.10">
              {t('{{code}} = {{label}}', { code: typeCode, label: typeLabel })}
            </Body>
          </HStack>

          <Button
            as={Link}
            to={getPathWithGeyserPromotionsHero('project', project.name)}
            variant="solid"
            colorScheme="primary1"
            borderRadius="full"
            minWidth={{ base: 'full', sm: '150px' }}
            backgroundColor={mutedSurface}
            color="primary1.11"
            _hover={{ backgroundColor: 'primary1.2', textDecoration: 'none' }}
          >
            {t('View project')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export const LandingShowcaseProjectCardSkeleton = () => {
  const backgroundColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')

  return (
    <VStack
      align="stretch"
      spacing={0}
      width="100%"
      overflow="hidden"
      borderRadius="28px"
      border="1px solid"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      boxShadow="0 24px 70px rgba(15, 23, 42, 0.08)"
    >
      <SkeletonLayout width="100%" height="250px" />
      <VStack align="stretch" spacing={4} p={{ base: 5, lg: 6 }}>
        <SkeletonLayout width="110px" height="24px" />
        <SkeletonLayout width="100%" height="28px" />
        <SkeletonLayout width="85%" height="20px" />
        <SkeletonLayout width="72%" height="20px" />
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
          <SkeletonLayout width="100%" height="40px" />
          <SkeletonLayout width="100%" height="40px" />
        </SimpleGrid>
      </VStack>
    </VStack>
  )
}
