import { useQuery } from '@apollo/client'
import { Button, GridItem, HStack, Link as ChakraLink, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router'

import { Tooltip } from '@/components/ui/Tooltip.tsx'
import { LandingProjectCard } from '@/modules/discovery/pages/landing/components/LandingProjectCard.tsx'
import { QUERY_FIELD_PARTNER_PROJECTS } from '@/modules/project/graphql/queries/fieldPartnerProjectsQuery.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { getPath, getPathWithGeyserPromotionsHero } from '@/shared/constants'
import { ProjectForLandingPageFragment, ProjectStatus } from '@/types/index.ts'

import { useProjectAtom } from '../../../../../../hooks/useProjectAtom'
import { BodySectionLayout } from '../../components/BodySectionLayout.tsx'

type FieldPartnerUser = {
  id: string
  username?: string | null
  bio?: string | null
}

type ProjectWithFieldPartner = {
  fieldPartner?: FieldPartnerUser | null
}

type FieldPartnerProjectsQueryData = {
  projectsGet: {
    projects: ProjectForLandingPageFragment[]
  }
}

const RELATED_PROJECTS_TO_SHOW = 3

export const FieldPartnerSection = () => {
  const { project } = useProjectAtom()
  const { fieldPartner } = project as typeof project & ProjectWithFieldPartner

  const { data: linkedProjectsData } = useQuery<FieldPartnerProjectsQueryData>(QUERY_FIELD_PARTNER_PROJECTS, {
    skip: !fieldPartner?.id,
    variables: {
      input: {
        where: {
          fieldPartnerUserId: fieldPartner?.id,
          status: ProjectStatus.Active,
        },
        pagination: {
          take: 50,
        },
      },
    },
  })

  const { data: ownedProjectsData } = useQuery<FieldPartnerProjectsQueryData>(QUERY_FIELD_PARTNER_PROJECTS, {
    skip: !fieldPartner?.id,
    variables: {
      input: {
        where: {
          ownerId: fieldPartner?.id,
          status: ProjectStatus.Active,
        },
        pagination: {
          take: 50,
        },
      },
    },
  })

  const facilitatedProjects = useMemo(() => {
    const projects = [
      ...(linkedProjectsData?.projectsGet.projects || []),
      ...(ownedProjectsData?.projectsGet.projects || []),
    ]
    return [...new Map(projects.map((project) => [project.id, project])).values()]
  }, [linkedProjectsData?.projectsGet.projects, ownedProjectsData?.projectsGet.projects])

  const relatedProjects = facilitatedProjects
    .filter((facilitatedProject) => facilitatedProject.id !== project.id)
    .slice(0, RELATED_PROJECTS_TO_SHOW)

  if (!fieldPartner) {
    return null
  }

  const fieldPartnerName = fieldPartner.username || t('this Field Partner')
  const fieldPartnerProfilePath = fieldPartner.id ? getPath('userProfile', fieldPartner.id) : undefined
  const description = fieldPartner.bio

  return (
    <>
      <BodySectionLayout
        title={t('Field Partner')}
        rightComponent={
          <Tooltip
            content={t(
              'Field Partners are part of a trust network of local operators that onboard, assist and monitor projects that launch on Geyser. This provides an additional layer of accountability to the project.',
            )}
          >
            <Body size="xs" muted textDecoration="underline" cursor="help">
              {t('What is a Field Partner?')}
            </Body>
          </Tooltip>
        }
      >
        <CardLayout w="full" spacing={6} paddingX={{ base: 3, lg: 5 }} paddingY={{ base: 4, lg: 5 }}>
          <Body size="md">
            <Trans
              i18nKey="This project is facilitated by our trusted Field Partner, <1>{{fieldPartnerName}}</1>."
              values={{ fieldPartnerName }}
              components={{
                1: fieldPartnerProfilePath ? (
                  <ChakraLink as={Link} to={fieldPartnerProfilePath} textDecoration="underline" />
                ) : (
                  <Body as="span" size="md" textDecoration="underline" />
                ),
              }}
            />
            {description ? ` ${description}` : ''}
          </Body>

          <HStack w="full" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={4}>
            <Body size="sm">
              {t('Projects facilitated')}{' '}
              <Body as="span" size="sm" bold sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {facilitatedProjects.length}
              </Body>
            </Body>
          </HStack>
        </CardLayout>
      </BodySectionLayout>

      {relatedProjects.length > 0 && (
        <VStack w="full" spacing={4} alignItems="start">
          <HStack w="full" justifyContent="space-between" alignItems="flex-start">
            <H3 size="xl" bold>
              {t('Also facilitated by')}{' '}
              <Body as="span" size="xl" bold color="primary1.9">
                {fieldPartnerName}
              </Body>
            </H3>
            {fieldPartnerProfilePath && (
              <Button as={Link} to={fieldPartnerProfilePath} variant="outline" size="md" colorScheme="neutral1">
                {t('See all')}
              </Button>
            )}
          </HStack>

          <SimpleGrid w="full" columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, lg: 5 }}>
            {relatedProjects.map((relatedProject) => (
              <GridItem key={relatedProject.id}>
                <LandingProjectCard
                  project={relatedProject}
                  to={getPathWithGeyserPromotionsHero('project', relatedProject.name)}
                />
              </GridItem>
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </>
  )
}
