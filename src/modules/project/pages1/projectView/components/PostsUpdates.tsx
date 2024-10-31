import { HStack, Tag } from '@chakra-ui/react'
import { PiFile } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { Post } from '@/types'
import { getFormattedDate } from '@/utils'

import { postTypeOptions } from '../views/posts/utils/postTypeLabel'

export const PostsUpdates = ({ posts }: { posts: Pick<Post, 'id' | 'title' | 'createdAt' | 'postType'>[] }) => {
  const { project } = useProjectAtom()

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      border="1px solid"
      borderColor="neutralAlpha.6"
      borderRadius="8px"
      p={1}
    >
      {posts.map((post) => (
        <>
          <HStack as={Link} to={getPath('projectPostView', project?.name, post.id)} key={post.id}>
            <Tag size="sm" variant="soft" bg="neutralAlpha.3">
              <PiFile />
              <Body size="sm" light pl={2}>
                {postTypeOptions.find((option) => option.value === post.postType)?.label}
              </Body>
            </Tag>
            <Body size="md" medium>
              {post.title}
            </Body>
          </HStack>
          <Body size="sm" light>
            {getFormattedDate(post.createdAt)}
          </Body>
        </>
      ))}
    </HStack>
  )
}
