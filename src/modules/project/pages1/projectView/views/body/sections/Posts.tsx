import { Button, HStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { useProjectEntriesAPI } from '@/modules/project/API/useProjectEntriesAPI'
import { getPath } from '@/shared/constants'
import { truthyFilter } from '@/utils/array'

import { useEntriesAtom, useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { ProjectEntryCard } from '../../posts/shared'
import { BodySectionLayout } from '../components'

export const Posts = forwardRef<HTMLDivElement>((_, ref) => {
  const { project, loading } = useProjectAtom()

  const { queryProjectEntries, queryUnpublishedProjectEntries } = useProjectEntriesAPI(true)

  const { entries: publishedEntries } = useEntriesAtom()

  const entries = [...publishedEntries]

  const sortedEntries =
    entries && entries.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  const hasMoreEntries = sortedEntries.length > 3

  const entriesToRender = hasMoreEntries ? sortedEntries.slice(0, 3) : sortedEntries

  if (
    loading ||
    queryProjectEntries.loading ||
    queryUnpublishedProjectEntries.loading ||
    entriesToRender.length === 0
  ) {
    return null
  }

  return (
    <BodySectionLayout ref={ref} title={t('Posts')}>
      {entriesToRender.map((entry) => {
        return <ProjectEntryCard entry={entry} key={entry.id} />
      })}
      {hasMoreEntries && (
        <HStack w="full" justifyContent="center">
          <Button
            size="sm"
            variant="outline"
            colorScheme="neutral1"
            as={Link}
            to={getPath('projectPosts', project.name)}
          >
            {t('See all')}
          </Button>
        </HStack>
      )}
    </BodySectionLayout>
  )
})
