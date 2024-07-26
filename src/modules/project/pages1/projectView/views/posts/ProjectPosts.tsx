import { VStack } from '@chakra-ui/react'

import { useProjectEntriesAPI } from '@/modules/project/API/useProjectEntriesAPI'
import { useEntriesAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { dimensions } from '@/shared/constants'
import { truthyFilter } from '@/utils/array'

import { CreatorPostPageBottomBar, CreatorPostPageTopBar } from './components'
import { ProjectEntryCard } from './shared'

export const ProjectPosts = () => {
  const { loading } = useProjectAtom()

  const { queryProjectEntries, queryUnpublishedProjectEntries } = useProjectEntriesAPI(true)

  const { entries: publishedEntries, unpublishedEntries } = useEntriesAtom()

  const entries = [...publishedEntries, ...unpublishedEntries]

  const sortedEntries =
    entries && entries.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  if (loading || queryProjectEntries.loading || queryUnpublishedProjectEntries.loading) {
    return null
  }

  return (
    <VStack w="full" spacing={8} paddingBottom={'80px'}>
      <CardLayout w="full" direction="row" justifyContent="center" paddingY={{ base: 6, lg: 12 }} mobileDense>
        <VStack maxWidth={dimensions.project.posts.view.maxWidth} w="full" spacing={6}>
          <CreatorPostPageTopBar />
          {sortedEntries.map((entry, index) => {
            return <ProjectEntryCard entry={entry} key={entry.id} />
          })}
        </VStack>
      </CardLayout>
      <CreatorPostPageBottomBar />
    </VStack>
  )
}
