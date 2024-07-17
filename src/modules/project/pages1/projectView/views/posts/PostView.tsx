import { Box, Button, HStack, SkeletonText, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { PiArrowLeft, PiShareFat } from 'react-icons/pi'
import { Link, useParams } from 'react-router-dom'

import { ImageWithReload } from '@/components/ui'
import { BottomNavBarContainer } from '@/modules/navigation/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavContainer } from '@/modules/project/navigation/ProjectNavContainer'
import { ProjectEntryEditor } from '@/modules/project/pages1/projectView/views/posts/editor'
import { CardLayout, SkeletonLayout } from '@/shared/components/layouts'
import { Body, H2 } from '@/shared/components/typography'
import { dimensions, getPath } from '@/shared/constants'
import { useProjectEntryQuery } from '@/types'
import { toInt } from '@/utils'

import { PostEditMenu } from './components'

export const PostView = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const { postId } = useParams<{ postId: string }>()

  const { loading, data } = useProjectEntryQuery({
    skip: !postId,
    variables: {
      entryId: postId,
    },
  })

  const entry = data?.entry

  if (loading) {
    return <EntryViewSkeleton />
  }

  if (!entry) {
    return null
  }

  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectNavContainer>
        <Button
          as={Link}
          to={getPath('projectPosts', project?.name)}
          size={{ base: 'md', lg: 'lg' }}
          variant="ghost"
          colorScheme="neutral1"
          leftIcon={<PiArrowLeft />}
        >
          {t('All posts')}
        </Button>
        <Button size={{ base: 'md', lg: 'lg' }} variant="soft" colorScheme="neutral1" rightIcon={<PiShareFat />}>
          {t('Share')}
        </Button>
      </ProjectNavContainer>

      <CardLayout w="full" direction="row" justifyContent="center" paddingY={{ base: 6, lg: 12 }}>
        <VStack maxWidth={dimensions.project.posts.view.maxWidth} w="full" alignItems="start" spacing={6}>
          <VStack w="full" spacing={3} alignItems="start">
            <HStack w="full" alignItems="start" justifyContent="space-between">
              <H2 flex={1} size="2xl" bold>
                {entry.title}
              </H2>
              {isProjectOwner ? (
                <PostEditMenu display={{ base: 'none', lg: 'undefined' }} entry={entry} />
              ) : (
                <Button
                  variant="solid"
                  colorScheme="primary1"
                  width="160px"
                  display={{ base: 'none', lg: 'undefined' }}
                  //   onClick={}
                >
                  {t('Contribute')}
                </Button>
              )}
            </HStack>

            <Body size="xs" medium light>
              {entry.createdAt && DateTime.fromMillis(toInt(entry.createdAt)).toFormat(' dd LLLL, yyyy')}
            </Body>
          </VStack>

          <Body size="md" bold dark>
            {entry.description}
          </Body>

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
          {entry.content && (
            <Box
              fontSize="16px"
              color="utils.text"
              sx={{
                p: {
                  marginTop: '0px',
                },
              }}
              flex={1}
            >
              <ProjectEntryEditor
                name="content"
                value={entry.content}
                isReadOnly
                noPadding
                placeholder={t('The description of the entry .....')}
              />
            </Box>
          )}
        </VStack>
      </CardLayout>
      <BottomNavBarContainer direction="column">
        {isProjectOwner ? (
          <PostEditMenu w="full" entry={entry} />
        ) : (
          <Button variant="solid" colorScheme="primary1" width="full">
            {t('Contribute')}
          </Button>
        )}
      </BottomNavBarContainer>
    </VStack>
  )
}

export const EntryViewSkeleton = () => {
  return (
    <VStack w="full" paddingBottom="120px">
      <ProjectNavContainer>
        <SkeletonLayout height="40px" width="135px" />
        <SkeletonLayout height="40px" width="100px" />
      </ProjectNavContainer>

      <CardLayout
        w="full"
        direction="row"
        justifyContent="center"
        paddingX={{ base: 3, lg: 6 }}
        backgroundColor="neutral1.1"
        paddingY={{ base: 6, lg: 12 }}
      >
        <VStack maxWidth="538px" spacing={6}>
          <VStack w="full" spacing={3}>
            <HStack w="full" alignItems="start" justifyContent="space-between">
              <SkeletonLayout height="28px" flex={1} />
              <SkeletonLayout height="28px" width="160px" display={{ base: 'none', lg: undefined }} />
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
