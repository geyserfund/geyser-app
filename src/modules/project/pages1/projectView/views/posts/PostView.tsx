import { Box, Button, HStack, Link as ChakraLink, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { PiArrowLeft, PiCopy, PiShareFat } from 'react-icons/pi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { Head } from '@/config/Head'
import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'
import { useProjectEntryLazyQuery } from '@/types'
import { toInt, useNotification } from '@/utils'

import { MarkdownField } from '../../../../../../shared/markdown/MarkdownField'
import { PostEditMenu, PostShare } from './components'

export const PostView = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()

  const toast = useNotification()

  const [loading, setLoading] = useState(false)

  const [queryEntry, { data }] = useProjectEntryLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      entryId: postId,
    },
  })

  useEffect(() => {
    if (postId) {
      const handleEntryQuery = async () => {
        setLoading(true)

        try {
          await queryEntry()
        } catch {
          toast.error({
            title: t('Something went wrong'),
            description: t('Failed to fetch the post, please try again.'),
          })
        }

        setLoading(false)
      }

      handleEntryQuery()
    }
  }, [postId])

  const entry = data?.entry

  if (loading) {
    return <EntryViewSkeleton />
  }

  if (!entry) {
    return null
  }

  const onContributeClick = () => navigate(getPath('projectFunding', project?.name), { state: { entryId: entry.id } })

  return (
    <>
      <Head
        title={entry?.title || ''}
        description={entry?.description || ''}
        image={entry?.image || project.thumbnailImage || ''}
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
            <PostShare entry={entry} />

            {isProjectOwner ? (
              <PostEditMenu
                size="lg"
                display={{ base: 'none', lg: 'flex' }}
                entry={entry}
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
            {entry.image && (
              <Box overflow={'hidden'} width="100%" position="relative" paddingTop="75%" borderRadius={'8px'}>
                <ImageWithReload
                  src={entry.image || ''}
                  alt={entry.title}
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
                {entry.title}
              </H2>

              <Body size="sm" medium light>
                {entry.createdAt && DateTime.fromMillis(toInt(entry.createdAt)).toFormat(' dd LLLL, yyyy')}
              </Body>
            </VStack>

            <Body size="md" bold dark>
              {entry.description}
            </Body>

            {entry.markdown && (
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
                <MarkdownField preview content={entry.markdown || ''} />
              </Box>
            )}
          </VStack>
        </CardLayout>
        <BottomNavBarContainer direction="column">
          {isProjectOwner ? (
            <PostEditMenu size="lg" w="full" entry={entry} />
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

export const EntryViewSkeleton = () => {
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

  const entryLink = `${window.location.origin}${location.pathname}`

  const { onCopy, hasCopied } = useCopyToClipboard(entryLink)

  useEffect(() => {
    if (location.state?.justPublished) {
      modalProps.onOpen()
      navigate(location.pathname)
    }
  }, [location, modalProps, navigate])

  return (
    <AlertDialogue
      {...modalProps}
      title={t('Post published')}
      description={t('Your post is live! Don’t forget to share it on social media to maximize its reach.')}
      neutralButtonProps={{
        colorScheme: hasCopied ? 'primary1' : 'neutral1',
        children: t('Copy link'),
        rightIcon: <PiCopy />,
        onClick: onCopy,
      }}
      positiveButtonProps={{
        as: ChakraLink,
        href: generateTwitterShareUrl(entryLink),
        isExternal: true,
        children: t('Post on X'),
        onClick: modalProps.onClose,
        rightIcon: <PiShareFat />,
      }}
    />
  )
}
