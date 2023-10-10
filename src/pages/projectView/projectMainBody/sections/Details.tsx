import { Wrap } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FiTag } from 'react-icons/fi'
import { SlLocationPin } from 'react-icons/sl'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { getPath, ID } from '../../../../constants'
import { SortType, useProjectContext } from '../../../../context'
import { ProjectLinks, SummaryInfoLine, TagBox } from '../components'

export const Details = () => {
  const { t } = useTranslation()
  const { project } = useProjectContext()

  if (!project) {
    return null
  }

  return (
    <CardLayout mobileDense id={ID.project.details.container}>
      <TitleDivider>{t('Details')}</TitleDivider>
      {project.tags?.length > 0 && (
        <SummaryInfoLine
          label={t('Tags')}
          icon={
            <span>
              <FiTag color="neutral.600" />
            </span>
          }
        >
          <Wrap>
            {project.tags.map((tag) => {
              return (
                <Link
                  key={tag.id}
                  to={getPath('landingPage')}
                  state={{
                    filter: { tagIds: [tag.id], sort: SortType.balance },
                  }}
                >
                  <TagBox>{tag.label}</TagBox>
                </Link>
              )
            })}
          </Wrap>
        </SummaryInfoLine>
      )}

      {(project.location?.country?.name || project.location?.region) && (
        <SummaryInfoLine
          label={t('Region')}
          icon={
            <span>
              <SlLocationPin color="neutral.600" />
            </span>
          }
        >
          <Wrap spacing="5px">
            {project?.location?.country?.name &&
              project.location.country.name !== 'Online' && (
                <Link
                  key={project?.location?.country?.name}
                  to={getPath('landingPage')}
                  state={{
                    filter: {
                      countryCode: project?.location?.country?.code,
                      sort: SortType.balance,
                    },
                  }}
                >
                  <TagBox>{project?.location?.country?.name}</TagBox>
                </Link>
              )}
            {project?.location?.region && (
              <Link
                key={project?.location?.region}
                to={getPath('landingPage')}
                state={{
                  filter: {
                    region: project?.location?.region,
                    sort: SortType.balance,
                  },
                }}
              >
                <TagBox>{project?.location?.region}</TagBox>
              </Link>
            )}
          </Wrap>
        </SummaryInfoLine>
      )}

      <ProjectLinks links={project.links as string[]} />
    </CardLayout>
  )
}
