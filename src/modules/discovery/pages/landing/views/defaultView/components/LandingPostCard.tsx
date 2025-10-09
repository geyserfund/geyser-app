import { Badge, Box, HStack, Stack, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar.tsx'
import { ProfileText } from '@/shared/components/display/ProfileText.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import { PostForLandingPageFragment } from '@/types/index.ts'
import { toInt } from '@/utils/index.ts'

type LandingPostCardProps = {
  post: PostForLandingPageFragment
  isMobile?: boolean
} & StackProps

export const LandingPostCard = ({ post, isMobile, ...rest }: LandingPostCardProps) => {
  const navigate = useNavigate()

  const getResponsiveValue = (prop: { base: any; lg: any }) => {
    return isMobile ? prop.base : prop
  }

  const renderProjectContent = () => {
    return (
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
          <Body size="sm" light isTruncated maxWidth="200px">
            {post?.project?.title}
          </Body>
        </HStack>
        {post.publishedAt && (
          <Body size="sm" light>
            {DateTime.fromMillis(toInt(post.publishedAt)).toFormat('dd LLL, yyyy')}
          </Body>
        )}
      </HStack>
    )
  }

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
      padding={standardPadding}
      marginX={{ base: -3, lg: -6 }}
      {...rest}
    >
      <Stack width="100%" direction={getResponsiveValue({ base: 'column', lg: 'row' })}>
        <Box w="full" display={getResponsiveValue({ base: 'block', lg: 'none' })}>
          {renderProjectContent()}
        </Box>
        <Box width={getResponsiveValue({ base: '100%', lg: '48%' })} height="200px" maxHeight={'200px'}>
          <ImageWithReload
            src={post.image || ''}
            alt={post.title}
            width="100%"
            borderRadius={'8px'}
            height="100%"
            objectFit="cover"
          />
        </Box>
        <VStack flex={1} alignItems="start" overflow="hidden" spacing={0}>
          <Box w="full" display={getResponsiveValue({ base: 'none', lg: 'block' })}>
            {renderProjectContent()}
          </Box>

          <Body size="md" bold dark>
            {post.title}
          </Body>
          <Body size="sm" medium dark wordBreak={'break-all'} noOfLines={2}>
            {post.description}
          </Body>
          <HStack w={'full'} paddingTop={2}>
            {post.postType && (
              <Badge variant="soft" colorScheme="neutral1">
                {post.postType}
              </Badge>
            )}
            <PostAuthor post={post} />
          </HStack>
        </VStack>
      </Stack>
    </VStack>
  )
}

/** Component for displaying post author information */
const PostAuthor = ({ post }: { post: PostForLandingPageFragment }) => {
  const navigate = useNavigate()
  return (
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
  )
}
