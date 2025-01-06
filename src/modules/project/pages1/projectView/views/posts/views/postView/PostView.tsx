/* eslint-disable complexity */
import { Badge, Box, Button, HStack, Icon, Link as ChakraLink, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { PiArrowLeft, PiCopy, PiEnvelope, PiShareFat } from 'react-icons/pi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Head } from '@/config/Head'
import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body, H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { useProjectPostLazyQuery } from '@/types'
import { toInt, useNotification } from '@/utils'

import { MarkdownField } from '../../../../../../../../shared/markdown/MarkdownField'
import { PostEditMenu, PostShare } from '../../components'
import { postTypeOptions } from '../../utils/postTypeLabel'
import { LinkedRewardsAndGoals } from './LinkedRewardsAndGoals'

export const PostView = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()

  const toast = useNotification()

  const [loading, setLoading] = useState(false)

  const [queryPost, { data }] = useProjectPostLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      postId,
    },
  })

  useEffect(() => {
    if (postId) {
      const handlePostQuery = async () => {
        setLoading(true)

        try {
          await queryPost()
        } catch {
          toast.error({
            title: t('Something went wrong'),
            description: t('Failed to fetch the post, please try again.'),
          })
        }

        setLoading(false)
      }

      handlePostQuery()
    }
  }, [postId])

  const post = data?.post

  if (loading) {
    return <PostViewSkeleton />
  }

  if (!post) {
    return null
  }

  const onContributeClick = () => navigate(getPath('projectFunding', project?.name), { state: { postId: post.id } })
  const showLinkedRewardsAndGoals = post.projectGoals.inProgress.length > 0 || post.projectRewards.length > 0

  return (
    <>
      <Head
        title={post?.title || ''}
        description={post?.description || ''}
        image={post?.image || project.thumbnailImage || ''}
        type="article"
      />

      <VStack w="full" paddingBottom="80px">
        <TopNavContainerBar>
          <Button
            as={Link}
            to={getPath('projectPosts', project?.name)}
            size="lg"
            variant="ghost"
            colorScheme="neutral1"
            leftIcon={<PiArrowLeft />}
          >
            {t('All posts')}
          </Button>
          <HStack>
            <PostShare post={post} />

            {isProjectOwner ? (
              <PostEditMenu
                size="lg"
                display={{ base: 'none', lg: 'flex' }}
                post={post}
                onDeleteComplete={() => navigate(getPath('projectPosts', project?.name))}
              />
            ) : (
              <Button
                variant="solid"
                colorScheme="primary1"
                size="lg"
                width="160px"
                display={{ base: 'none', lg: 'flex' }}
                onClick={onContributeClick}
              >
                {t('Contribute')}
              </Button>
            )}
          </HStack>
        </TopNavContainerBar>

        <CardLayout w="full" direction="row" justifyContent="center" paddingY={{ base: 6, lg: 12 }} mobileDense>
          <VStack maxWidth={dimensions.project.posts.view.maxWidth} w="full" alignItems="start" spacing={6}>
            {post.image && (
              <Box overflow={'hidden'} width="100%" position="relative" paddingTop="75%" borderRadius={'8px'}>
                <ImageWithReload
                  src={post.image || ''}
                  alt={post.title}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  position="absolute"
                  top={0}
                  left={0}
                />
              </Box>
            )}
            <VStack w="full" spacing={3} alignItems="start">
              <H2 flex={1} size="2xl" bold>
                {post.title}
              </H2>

              <Body size="sm" medium light>
                {post.createdAt && DateTime.fromMillis(toInt(post.createdAt)).toFormat(' dd LLLL, yyyy')}
              </Body>
              <HStack w="full">
                {post.postType && (
                  <Badge variant="soft" colorScheme="neutral1" gap={2}>
                    <Icon as={postTypeOptions.find((option) => option.value === post.postType)?.icon} />
                    {postTypeOptions.find((option) => option.value === post.postType)?.label}
                  </Badge>
                )}
                {post.sentByEmailAt && (
                  <Badge variant="outline" colorScheme="neutral1" gap={2}>
                    <Icon as={PiEnvelope} />
                    {DateTime.fromMillis(post.sentByEmailAt).toFormat(' dd LLLL, yyyy')}
                  </Badge>
                )}
              </HStack>
            </VStack>

            <Body size="md" bold dark>
              {post.description}
            </Body>

            {post.markdown && (
              <Box
                fontSize="16px"
                color="utils.text"
                width="full"
                sx={{
                  p: {
                    marginTop: '0px',
                  },
                }}
                flex={1}
              >
                <MarkdownField preview content={post.markdown || ''} />
              </Box>
            )}
            {showLinkedRewardsAndGoals && <LinkedRewardsAndGoals post={post} />}
          </VStack>
        </CardLayout>
        <BottomNavBarContainer direction="column">
          {isProjectOwner ? (
            <PostEditMenu size="lg" w="full" post={post} />
          ) : (
            <Button size="lg" variant="solid" colorScheme="primary1" width="full" onClick={onContributeClick}>
              {t('Contribute')}
            </Button>
          )}
        </BottomNavBarContainer>
      </VStack>
      <PostJustPublishedModal />
    </>
  )
}

export const PostViewSkeleton = () => {
  return (
    <VStack w="full" paddingBottom="120px">
      <TopNavContainerBar>
        <SkeletonLayout height="40px" width="135px" />
        <SkeletonLayout height="40px" width="100px" />
      </TopNavContainerBar>

      <CardLayout
        w="full"
        direction="row"
        justifyContent="center"
        paddingX={{ base: 3, lg: 6 }}
        backgroundColor="neutral1.1"
        paddingY={{ base: 6, lg: 12 }}
      >
        <VStack maxWidth="538px" w="full" spacing={6}>
          <VStack w="full" spacing={3} alignItems="start">
            <HStack w="full" alignItems="start" justifyContent="space-between">
              <SkeletonLayout height="28px" width="220px" />
              <SkeletonLayout height="28px" width="160px" />
            </HStack>

            <SkeletonLayout height="20px" width="180px" />
          </VStack>
          <SkeletonText noOfLines={6} width="100%" />
          <SkeletonLayout height="330px" width="100%" />
          <SkeletonText noOfLines={40} width="100%" />
        </VStack>
      </CardLayout>
      <BottomNavBarContainer direction="column">
        <SkeletonLayout height="28px" w={'100%'} />
      </BottomNavBarContainer>
    </VStack>
  )
}

const PostJustPublishedModal = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const modalProps = useModal()

  const postLink = `${window.location.origin}${location.pathname}`

  const { onCopy, hasCopied } = useCopyToClipboard(postLink)

  useEffect(() => {
    if (location.state?.justPublished) {
      modalProps.onOpen()
      navigate(location.pathname)
    }
  }, [location, modalProps, navigate])

  return (
    <AlertDialogue
      {...modalProps}
      title={t('Your post is live!')}
      description={t('Don’t forget to share it on social media to maximize its reach.')}
      neutralButtonProps={{
        colorScheme: hasCopied ? 'primary1' : 'neutral1',
        children: t('Copy link'),
        rightIcon: <PiCopy />,
        onClick: onCopy,
      }}
      positiveButtonProps={{
        as: ChakraLink,
        href: generateTwitterShareUrl(postLink),
        isExternal: true,
        children: t('Post on X'),
        onClick: modalProps.onClose,
        rightIcon: <PiShareFat />,
      }}
    />
  )
}
