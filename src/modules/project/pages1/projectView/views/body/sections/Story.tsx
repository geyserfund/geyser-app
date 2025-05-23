import { HStack, SkeletonText } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { getPath } from '@/shared/constants'
import { MarkdownField } from '@/shared/markdown/MarkdownField'

import { Body } from '../../../../../../../shared/components/typography'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { BodySectionLayout, CreatorEditButton } from '../components'

export const Story = () => {
  const { t } = useTranslation()

  const { project, loading } = useProjectAtom()

  if (loading) {
    return <StorySkeleton />
  }

  if (!project?.description && !project?.shortDescription) {
    return null
  }

  return (
    <BodySectionLayout title={t('Story')}>
      <CardLayout w="full" direction="column" spacing={5} paddingX={{ base: 3, lg: 6 }} paddingY={{ base: 6, lg: 8 }}>
        <Body bold size="2xl">
          {project.shortDescription}
        </Body>
        {project?.description && (
          <article>
            <MarkdownField preview content={project?.description} />
          </article>
        )}
        <HStack w="full" justifyContent={'end'}>
          <CreatorEditButton as={Link} to={getPath('projectStoryEdit', project.name)} />
        </HStack>
      </CardLayout>
    </BodySectionLayout>
  )
}

export const StorySkeleton = () => {
  const { t } = useTranslation()
  return (
    <BodySectionLayout title={t('Story')}>
      <CardLayout w="full">
        <SkeletonText noOfLines={10} spacing="4" />
      </CardLayout>
    </BodySectionLayout>
  )
}
