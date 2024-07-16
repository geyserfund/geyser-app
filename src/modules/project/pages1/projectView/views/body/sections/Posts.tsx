import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { useInitEntries } from '@/modules/project/hooks/useInitEntries'
import { getPath } from '@/shared/constants'
import { truthyFilter } from '@/utils/array'

import { useEntriesAtom, useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { ProjectEntryCard } from '../../posts/shared'
import { BodySectionLayout } from '../components'

export const Posts = forwardRef<HTMLDivElement>((_, ref) => {
  const { project, loading } = useProjectAtom()

  const { entriesLoading } = useInitEntries(true)

  const { entries: publishedEntries, unpublishedEntries } = useEntriesAtom()

  const entries = [...publishedEntries, ...unpublishedEntries]

  const sortedEntries =
    entries && entries.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  const hasMoreEntries = sortedEntries.length > 3

  const entriesToRender = hasMoreEntries ? sortedEntries.slice(0, 3) : sortedEntries

  if (loading || entriesLoading) {
    return null
  }

  return (
    <BodySectionLayout ref={ref} title={t('Posts')}>
      {entriesToRender.map((entry) => {
        return <ProjectEntryCard entry={entry} key={entry.id} />
      })}
      <Button size="sm" variant="outline" colorScheme="neutral1" as={Link} to={getPath('projectPosts', project.name)}>
        {t('See all')}
      </Button>
    </BodySectionLayout>
  )
})
