import { Badge, Box, HStack, Icon, Image, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { PostStatus, ProjectPostFragment } from '@/types'
import { toInt } from '@/utils'

import { PostShare } from '../components'
import { PostEditMenu } from '../components/PostEditMenu'
import { ProjectPostCardThumbnailPlaceholder } from '../components/ProjectPostCardThumbnailPlaceholder'
import { postTypeOptions } from '../utils/postTypeLabel'

type Props = {
  post: ProjectPostFragment
}

export const ProjectPostCard = ({ post }: Props) => {
  const { project } = useProjectAtom()

  const isDraft = useMemo(() => {
    return post.status === PostStatus.Unpublished
  }, [post.status])

  return (
    <>
      <CardLayout
        hover
        as={Link}
        to={
          isDraft
            ? getPath('projectPostEdit', project.name, post.id)
            : getPath('projectPostView', project.name, post.id)
        }
        dense
        spacing={0}
        w="100%"
      >
        {post.image && (
          <Box w="full" maxHeight="330px" overflow="hidden">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={post.image || ''}
              alt={post.title}
              fallback={<ProjectPostCardThumbnailPlaceholder />}
            />
          </Box>
        )}
        <VStack w="full" p={{ base: 3, lg: 6 }} spacing={3} alignItems="start">
          <VStack w="full" spacing={2} alignItems="start">
            <HStack spacing={2}>
              <Body size="xl" medium dark>
                {post.title}
              </Body>
              {isDraft && (
                <Badge variant="soft" colorScheme="neutral1">
                  Draft
                </Badge>
              )}
            </HStack>
            {post.postType && (
              <Badge variant="soft" colorScheme="neutral1" gap={2}>
                <Icon as={postTypeOptions.find((option) => option.value === post.postType)?.icon} />
                {postTypeOptions.find((option) => option.value === post.postType)?.label}
              </Badge>
            )}
            {post.publishedAt && (
              <Body size="sm" medium muted whiteSpace="nowrap">
                {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
              </Body>
            )}
          </VStack>
          <Body medium dark wordBreak={'break-all'}>
            {post.description}
          </Body>
          <HStack w="full" justifyContent={'end'}>
            <PostEditMenu post={post} />

            <PostShare size="md" post={post} />
          </HStack>
        </VStack>
      </CardLayout>
    </>
  )
}
