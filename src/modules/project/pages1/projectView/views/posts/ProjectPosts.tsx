import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Navigate } from 'react-router'

import { useProjectEntriesAPI } from '@/modules/project/API/useProjectEntriesAPI'
import { useEntriesAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { truthyFilter } from '@/utils/array'

import { CreatorPostPageBottomBar, CreatorPostPageTopBar } from './components'
import { ProjectEntryCard } from './shared'

export const ProjectPosts = () => {
  const { loading, project, isProjectOwner } = useProjectAtom()

  const { queryProjectEntries, queryUnpublishedProjectEntries } = useProjectEntriesAPI(true)

  const { entries: publishedEntries, unpublishedEntries } = useEntriesAtom()

  const entries = [...publishedEntries, ...unpublishedEntries]

  const sortedEntries =
    entries && entries.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  if (loading || queryProjectEntries.loading || queryUnpublishedProjectEntries.loading) {
    return null
  }

  if (publishedEntries.length === 0 && (isProjectOwner ? unpublishedEntries.length === 0 : true)) {
    return <Navigate to={getPath('project', project.name)} />
  }

  return (
    <VStack w="full" spacing={8} paddingBottom={'80px'}>
      <CardLayout w="full" direction="row" justifyContent="center" mobileDense noborder>
        <VStack maxWidth={dimensions.project.posts.view.maxWidth} w="full" spacing={6}>
          <CreatorPostPageTopBar />
          <VStack w="full" spacing={4} alignItems={'start'}>
            <H2 bold size="2xl" display={{ base: 'unset', lg: 'none' }}>
              {t('Posts')}
            </H2>
            {sortedEntries.map((entry, index) => {
              return <ProjectEntryCard entry={entry} key={entry.id} />
            })}
          </VStack>
        </VStack>
      </CardLayout>
      <CreatorPostPageBottomBar />
    </VStack>
  )
}
