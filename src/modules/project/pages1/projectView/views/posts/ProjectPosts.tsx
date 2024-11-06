import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context'
import { useProjectPostsAPI } from '@/modules/project/API/useProjectPostsAPI'
import { usePostsAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { PostType } from '@/types'
import { truthyFilter } from '@/utils/array'

import { CreatorPostPageBottomBar, CreatorPostPageTopBar } from './components'
import { PostTypeFilterBar } from './components/PostTypeFilterBar'
import { ProjectPostCard } from './shared'
import { postTypeOptions } from './utils/postTypeLabel'

export const ProjectPosts = () => {
  const { loading: userLoading } = useAuthContext()
  const { loading: projectLoading, project } = useProjectAtom()
  const navigate = useNavigate()

  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(null)

  const { queryProjectPosts, queryUnpublishedProjectPosts } = useProjectPostsAPI(true)

  const { posts: publishedPosts, unpublishedPosts, hasPosts } = usePostsAtom()

  const posts = [...publishedPosts, ...unpublishedPosts]

  const sortedPosts =
    posts && posts.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  const loading = userLoading || projectLoading || queryProjectPosts.loading || queryUnpublishedProjectPosts.loading

  const filteredPosts = sortedPosts.filter((post) =>
    selectedPostType === null ? true : post.postType === selectedPostType,
  )

  const availablePostTypes = postTypeOptions.filter((option) =>
    sortedPosts.some((post) => post.postType === option.value),
  )

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
            <PostTypeFilterBar
              availablePostTypes={availablePostTypes}
              selectedPostType={selectedPostType}
              onFilterChange={setSelectedPostType}
            />
            {filteredPosts.map((entry, index) => {
              return <ProjectPostCard post={entry} key={entry.id} />
            })}
          </VStack>
        </VStack>
      </CardLayout>
      <CreatorPostPageBottomBar />
    </VStack>
  )
}
