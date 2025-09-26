import { Badge, Box, HStack, Icon, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { PiNewspaper } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar.tsx'
import { ProfileText } from '@/shared/components/display/ProfileText.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { PostForLandingPageFragment } from '@/types/index.ts'
import { toInt } from '@/utils/index.ts'

export const LandingPostCard = ({ post }: { post: PostForLandingPageFragment }) => {
  const navigate = useNavigate()

  return (
    <VStack
      width="100%"
      alignItems="start"
      outlineColor="neutralAlpha.3"
      _hover={{
        cursor: 'pointer',
        shadow: 'xl',
        outline: '1px solid',
        outlineColor: 'neutralAlpha.6',
        transition: 'all 0.3s ease-in-out',
      }}
      onClick={() => navigate(getPath('projectPostView', post.project?.name || '', post.id))}
      borderRadius="8px"
      padding={2}
    >
      <HStack>
        <Icon as={PiNewspaper} />
        <Body light>{t('New post')}</Body>
      </HStack>
      <Stack width="100%" direction={{ base: 'column', lg: 'row' }} spacing={4}>
        <Box width={{ base: '100%', lg: '48%' }} height="200px" maxHeight={'200px'}>
          <ImageWithReload
            src={post.image || ''}
            alt={post.title}
            width="100%"
            borderRadius={'8px'}
            height="100%"
            objectFit="cover"
          />
        </Box>
        <VStack flex={1} alignItems="start">
          <HStack w="full" justifyContent="space-between">
            <HStack flex={1} spacing={1} w="full">
              <ImageWithReload
                width="16px"
                height="16px"
                borderRadius={'4px'}
                objectFit="cover"
                src={post?.project?.thumbnailImage}
                alt={`${post?.project?.name}-header-image`}
              />
              <Body size="sm" light isTruncated>
                {post?.project?.title}
              </Body>
            </HStack>
            {post.publishedAt && (
              <Body size="sm" light>
                {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
              </Body>
            )}
          </HStack>
          <Body size="xl" medium dark>
            {post.title}
          </Body>
          <Body medium dark wordBreak={'break-all'}>
            {post.description}
          </Body>
          <HStack w={'full'}>
            {post.postType && (
              <Badge variant="soft" colorScheme="neutral1">
                {post.postType}
              </Badge>
            )}
            <HStack>
              <Body size="sm" light>
                {t('written by')}
              </Body>
              <ProfileAvatar
                src={post?.project?.owners[0]?.user.imageUrl || ''}
                height="16px"
                width="16px"
                wrapperProps={{
                  padding: '1px',
                  height: '18px',
                  width: '18px',
                }}
              />
              <ProfileText
                size="sm"
                name={post?.project?.owners[0]?.user.username}
                _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/profile/${post?.project?.owners[0]?.user.username}`)
                }}
              >
                {post?.project?.owners[0]?.user.username}
              </ProfileText>
            </HStack>
          </HStack>
        </VStack>
      </Stack>
    </VStack>
  )
}
