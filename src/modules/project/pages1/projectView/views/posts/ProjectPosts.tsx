import { VStack } from '@chakra-ui/react'

import { useInitEntries } from '@/modules/project/hooks/useInitEntries'
import { useEntriesAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { truthyFilter } from '@/utils/array'

import { ProjectEntryCard } from './shared'

export const ProjectPosts = () => {
  const { loading } = useProjectAtom()

  const { entriesLoading } = useInitEntries(true)

  const { entries: publishedEntries, unpublishedEntries } = useEntriesAtom()

  const entries = [...publishedEntries, ...unpublishedEntries]

  const sortedEntries =
    entries && entries.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  if (loading || entriesLoading) {
    return null
  }

  return (
    <CardLayout w="full" direction="row" justifyContent="center" paddingY={{ base: 6, lg: 12 }} mobileDense>
      <VStack maxWidth="538px" w="full" spacing={6}>
        {sortedEntries.map((entry, index) => {
          return <ProjectEntryCard entry={entry} key={entry.id} />
        })}
      </VStack>
    </CardLayout>
  )
}
