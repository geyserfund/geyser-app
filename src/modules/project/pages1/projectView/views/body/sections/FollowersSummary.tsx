import { CircularProgress, HStack, SkeletonCircle, SkeletonText, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { userFollowsProjectAtom } from '@/modules/project/state/projectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography/Body.tsx'

import { FOLLOWERS_NEEDED, PrelaunchFollowButton } from '../components/PrelaunchFollowButton.tsx'

export const FollowersSummary = (props: StackProps) => {
  const { project } = useProjectAtom()
  const { followersCount } = project
  const followersNeeded = FOLLOWERS_NEEDED - (followersCount ?? 0)
  const enoughFollowers = followersNeeded <= 0
  const userFollowsProject = useAtomValue(userFollowsProjectAtom)

  return (
    <CardLayout w="100%" p={6} spacing={6} minHeight="fit-content" flexShrink={0} {...props}>
      <HStack width="100%" spacing={4}>
        <CircularProgress
          capIsRound
          value={followersCount ?? 0}
          min={0}
          max={21}
          size="96px"
          thickness="10px"
          color={'primary1.9'}
          trackColor="neutral1.3"
        />
        <VStack flex="1" spacing={0} width="100%" px={2} alignItems={'start'}>
          <Body size="2xl" bold dark>
            {followersCount ?? 0}{' '}
            <Body as="span" size="md" light medium>
              {t('followers')}
            </Body>
          </Body>

          <Body size="2xl" dark bold display="inline">
            {enoughFollowers ? (
              t(`Ready to launch!`)
            ) : (
              <>
                {`${followersNeeded}`}{' '}
                <Body as="span" size="md" light>
                  {t(`more to launch`)}
                </Body>
              </>
            )}
          </Body>
        </VStack>
      </HStack>

      <Body size="xs">
        {t('The project needs to reach 21 followers to begin receiving contributions.')}{' '}
        {userFollowsProject ? t('Share on social media to help launch it!') : t('Show your interest by following it!')}
      </Body>

      <VStack w="full" spacing={2}>
        <PrelaunchFollowButton w="full" />
      </VStack>
    </CardLayout>
  )
}

export const FollowersSummarySkeleton = (props: StackProps) => {
  return (
    <VStack w="100%" {...props}>
      <HStack w="100%" padding={3} justifyContent="start">
        <SkeletonCircle height="116px" width="116px" />
        <VStack flex="1" spacing={'20px'} width="100%" px={2}>
          <SkeletonLayout height="40px" width="180px" />
          <SkeletonText noOfLines={2} w="100%" />
        </VStack>
      </HStack>

      <VStack w="full" spacing="10px" pb={3} px={3}>
        <SkeletonLayout height="40px" width="100%" />
        <SkeletonLayout height="40px" width="100%" />
      </VStack>
    </VStack>
  )
}
