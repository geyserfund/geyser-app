import { Badge, HStack, Icon, VStack } from '@chakra-ui/react'
import { PiNewspaper } from 'react-icons/pi'
import { Link } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { Post } from '@/types'
import { getFormattedDate } from '@/utils'

import { postTypeOptions } from '../views/posts/utils/postTypeLabel'

export const PostsUpdates = ({ posts }: { posts: Pick<Post, 'id' | 'title' | 'createdAt' | 'postType'>[] }) => {
  const { project } = useProjectAtom()

  return (
    <VStack w="full" alignItems="flex-start">
      {posts.map((post) => (
        <CardLayout
          as={Link}
          to={getPath('projectPostView', project?.name, post.id)}
          key={post.id}
          w="full"
          padding="4px 8px"
          alignItems="start"
          spacing={1}
          justifyContent="space-between"
        >
          <HStack w="full" justifyContent="space-between" flexWrap="wrap">
            <Badge size="sm" variant="soft" colorScheme="neutral1" mt={1}>
              <Icon as={PiNewspaper} fontSize="16px" />
              <Body size="sm" light pl={2} whiteSpace="nowrap">
                {postTypeOptions.find((option) => option.value === post.postType)?.label}
              </Body>
            </Badge>

            <Body size="sm" light>
              {getFormattedDate(post.createdAt)}
            </Body>
          </HStack>
          <Body size="md" medium flex={1}>
            {post.title}
          </Body>
        </CardLayout>
      ))}
    </VStack>
  )
}
