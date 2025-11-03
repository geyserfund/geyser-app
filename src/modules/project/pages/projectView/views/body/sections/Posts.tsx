import { Button, HStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { forwardRef } from 'react'
import { Link } from 'react-router'

import { useProjectPostsAPI } from '@/modules/project/API/useProjectPostsAPI.ts'
import { getPath } from '@/shared/constants'
import { truthyFilter } from '@/utils/array'

import { usePostsAtom, useProjectAtom } from '../../../../../hooks/useProjectAtom.ts'
import { ProjectPostCard } from '../../posts/components/ProjectPostCard.tsx'
import { BodySectionLayout } from '../components/BodySectionLayout.tsx'

export const Posts = forwardRef<HTMLDivElement>((_, ref) => {
  const { project, loading } = useProjectAtom()

  const { queryProjectPosts, queryUnpublishedProjectPosts } = useProjectPostsAPI(true)

  const { posts: publishedPosts } = usePostsAtom()

  const posts = [...publishedPosts]

  const sortedPosts =
    posts && posts.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  const hasMorePosts = sortedPosts.length > 3

  const postsToRender = hasMorePosts ? sortedPosts.slice(0, 3) : sortedPosts

  if (loading || queryProjectPosts.loading || queryUnpublishedProjectPosts.loading || postsToRender.length === 0) {
    return null
  }

  return (
    <BodySectionLayout ref={ref} title={t('Posts')}>
      {postsToRender.map((post) => {
        return <ProjectPostCard post={post} key={post.id} />
      })}
      {hasMorePosts && (
        <HStack w="full" justifyContent="center">
          <Button variant="soft" colorScheme="neutral1" as={Link} to={getPath('projectPosts', project.name)}>
            {t('See all')} {`${posts.length} posts`}
          </Button>
        </HStack>
      )}
    </BodySectionLayout>
  )
})
