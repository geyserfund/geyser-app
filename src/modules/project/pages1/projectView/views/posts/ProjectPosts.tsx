import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context'
import { useProjectEntriesAPI } from '@/modules/project/API/useProjectEntriesAPI'
import { useEntriesAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { truthyFilter } from '@/utils/array'

import { CreatorPostPageBottomBar, CreatorPostPageTopBar } from './components'
import { ProjectEntryCard } from './shared'

export const ProjectPosts = () => {
  const { loading: userLoading } = useAuthContext()
  const { loading: projectLoading, project } = useProjectAtom()
  const navigate = useNavigate()

  const { queryProjectEntries, queryUnpublishedProjectEntries } = useProjectEntriesAPI(true)

  const { entries: publishedEntries, unpublishedEntries, hasEntries } = useEntriesAtom()

  const entries = [...publishedEntries, ...unpublishedEntries]

  const sortedEntries =
    entries && entries.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  const loading = userLoading || projectLoading || queryProjectEntries.loading || queryUnpublishedProjectEntries.loading

  useEffect(() => {
    let number: any

    if (!loading && !hasEntries) {
      number = setInterval(() => {
        navigate(getPath('project', project.name))
      }, 500)
    }

    return () => {
      clearInterval(number)
    }
  }, [loading, hasEntries, navigate, project])

  return (
    <VStack w="full" spacing={8} paddingBottom={28}>
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
