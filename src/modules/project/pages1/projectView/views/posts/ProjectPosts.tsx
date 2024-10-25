import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context'
import { useProjectPostsAPI } from '@/modules/project/API/useProjectPostsAPI'
import { usePostsAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { truthyFilter } from '@/utils/array'

import { CreatorPostPageBottomBar, CreatorPostPageTopBar } from './components'
import { ProjectPostCard } from './shared'

export const ProjectPosts = () => {
  const { loading: userLoading } = useAuthContext()
  const { loading: projectLoading, project } = useProjectAtom()
  const navigate = useNavigate()

  const { queryProjectPosts, queryUnpublishedProjectPosts } = useProjectPostsAPI(true)

  const { posts: publishedPosts, unpublishedPosts, hasPosts } = usePostsAtom()

  const posts = [...publishedPosts, ...unpublishedPosts]

  const sortedPosts =
    posts && posts.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  const loading = userLoading || projectLoading || queryProjectPosts.loading || queryUnpublishedProjectPosts.loading

  useEffect(() => {
    let number: any

    if (!loading && !hasPosts) {
      number = setInterval(() => {
        navigate(getPath('project', project.name))
      }, 500)
    }

    return () => {
      clearInterval(number)
    }
  }, [loading, hasPosts, navigate, project])

  return (
    <VStack w="full" spacing={8} paddingBottom={28}>
      <CardLayout w="full" direction="row" justifyContent="center" dense noborder>
        <VStack maxWidth={dimensions.project.posts.view.maxWidth} w="full" spacing={6}>
          <CreatorPostPageTopBar />
          <VStack w="full" spacing={4} alignItems={'start'}>
            <H2 bold size="2xl" display={{ base: 'unset', lg: 'none' }}>
              {t('Posts')}
            </H2>
            {sortedPosts.map((entry, index) => {
              return <ProjectPostCard post={entry} key={entry.id} />
            })}
          </VStack>
        </VStack>
      </CardLayout>
      <CreatorPostPageBottomBar />
    </VStack>
  )
}
