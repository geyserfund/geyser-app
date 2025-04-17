/* eslint-disable complexity */
import { Badge, Button, HStack, Icon, Link as ChakraLink, Wrap } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { PiFlag } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useProjectDetailsAPI } from '@/modules/project/API/useProjectDetailsAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import {
  ProjectCategoryLabel,
  ProjectSubCategoryLabel,
  ProjectSubCategoryList,
} from '@/shared/constants/platform/projectCategory.ts'

import { getPath, ID } from '../../../../../../../shared/constants'
import { BodySectionLayout, ProjectLinks } from '../components'
import { CreatorSocial } from './header/components/CreatorSocial'

const REPORT_PROJECT_AIRTABLE_URL = 'https://airtable.com/appyM7XlNIWVypuP5/pagpNDtO12bhTK6hQ/form'

export const Details = () => {
  const { t } = useTranslation()
  const { loading, project } = useProjectAtom()

  const { queryProjectDetails } = useProjectDetailsAPI(true)

  if (loading || queryProjectDetails.loading) {
    return null
  }

  return (
    <BodySectionLayout title={t('Project details')}>
      <CardLayout w="full" id={ID.project.details.container}>
        <DetailLine title={t('Creator')}>
          <CreatorSocial />
        </DetailLine>

        {project.links && (
          <DetailLine title={t('Project links')} empty={!project?.links?.length}>
            <ProjectLinks links={project.links} />
          </DetailLine>
        )}

        {(project.category || project.subCategory) && (
          <DetailLine title={t('Category')} empty={!project.category}>
            <Wrap>
              {project.category && (
                <Link
                  key={project.category}
                  to={getPath('landingPage')}
                  state={{
                    filter: { category: project.category },
                  }}
                >
                  <Badge
                    size="md"
                    variant="soft"
                    colorScheme={tagColorScheme(
                      ProjectSubCategoryList.findIndex((subCategory) => subCategory === project.subCategory),
                    )}
                  >
                    {ProjectCategoryLabel[project.category]}
                  </Badge>
                </Link>
              )}
              {project.subCategory && (
                <Link
                  key={project.subCategory}
                  to={getPath('landingPage')}
                  state={{
                    filter: { subCategory: project.subCategory },
                  }}
                >
                  <Badge
                    size="md"
                    variant="soft"
                    colorScheme={tagColorScheme(
                      ProjectSubCategoryList.findIndex((subCategory) => subCategory === project.subCategory),
                    )}
                  >
                    {ProjectSubCategoryLabel[project.subCategory]}
                  </Badge>
                </Link>
              )}
            </Wrap>
          </DetailLine>
        )}

        {project?.location && (project.location.country || project.location.region) && (
          <DetailLine title={t('Location')} empty={!project?.location?.country?.name && !project?.location?.region}>
            <Wrap spacing="5px">
              {project?.location?.country?.name && project.location.country.name !== 'Online' && (
                <Button
                  as={Link}
                  to={getPath('landingPage')}
                  state={{
                    filter: {
                      countryCode: project?.location?.country?.code,
                    },
                  }}
                  size="sm"
                  variant="outline"
                  colorScheme="neutral1"
                >
                  {project?.location?.country?.name}
                </Button>
              )}
              {project?.location?.region && (
                <Button
                  as={Link}
                  to={getPath('landingPage')}
                  state={{
                    filter: {
                      region: project?.location?.region,
                    },
                  }}
                  size="sm"
                  variant="outline"
                  colorScheme="neutral1"
                >
                  {project?.location?.region}
                </Button>
              )}
            </Wrap>
          </DetailLine>
        )}
        {project.launchedAt && (
          <DetailLine title={t('Launched')}>
            <Body size="sm" medium dark>
              {DateTime.fromMillis(Number(project.launchedAt)).toFormat('dd LLL yyyy')}
            </Body>
          </DetailLine>
        )}
        <ReportProjectButton />
      </CardLayout>
    </BodySectionLayout>
  )
}

const ReportProjectButton = () => {
  const { t } = useTranslation()
  return (
    <Button
      size="sm"
      width="150px"
      as={ChakraLink}
      href={REPORT_PROJECT_AIRTABLE_URL}
      isExternal
      variant="outline"
      colorScheme="neutral1"
      leftIcon={<Icon as={PiFlag} />}
    >
      {t('Report project')}
    </Button>
  )
}

export const DetailLine = ({ title, empty, children }: PropsWithChildren<{ title: string; empty?: boolean }>) => {
  if (empty) {
    return null
  }

  return (
    <HStack w="full" alignItems={'start'}>
      <Body size="sm" medium light>
        {`${title}: `}
      </Body>
      {children}
    </HStack>
  )
}

const tagColorScheme = (id: number) => {
  const list = [
    'primary1',
    'neutral1',
    'error',
    'success',
    'info',
    'warning',
    'tomato',
    'ruby',
    'crimson',
    'pink',
    'plum',
    'purple',
    'violet',
    'iris',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'jade',
    'grass',
    'orange',
    'brown',
    'mint',
    'yellow',
    'bronze',
    'gold',
  ]

  const index = id % list.length
  return list[index]
}
