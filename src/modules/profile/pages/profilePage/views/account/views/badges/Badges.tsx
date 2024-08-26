import { Button, HStack, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PiArrowSquareOut } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { getPath } from '../../../../../../../../shared/constants'
import { useUserBadgesLazyQuery } from '../../../../../../../../types'
import { toInt, useNotification } from '../../../../../../../../utils'
import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '../../../../../../state'
import { BadgesBody, BadgesBodySkeleton } from './BadgesBody'

export const Badges = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { userProfile } = useUserProfileAtom()
  const isEdit = useViewingOwnProfileAtomValue()

  const [getUserBadges, { data: userBadgesData, loading: userBadgeLoading }] = useUserBadgesLazyQuery({
    onError() {
      toast({
        title: 'Error fetching badges',
        description: 'Please refresh the page and try again.',
        status: 'error',
      })
    },
  })

  useEffect(() => {
    if (userProfile.id) {
      getUserBadges({
        variables: { input: { where: { userId: toInt(userProfile.id) } } },
      })
    }
  }, [userProfile.id, getUserBadges])

  const renderBadgesBody = () => {
    if (userBadgeLoading) {
      return <BadgesBodySkeleton />
    }

    return (
      <BadgesBody
        {...{
          userBadges: userBadgesData?.userBadges || [],
          userProfile,
          isEdit,
        }}
      />
    )
  }

  return (
    <>
      <VStack w="full" alignItems={'start'}>
        <HStack w="full" justifyContent={'space-between'}>
          <Body size="xl" medium>
            {t('Badges')}
          </Body>
          <Button
            as={ChakraLink}
            href={getPath('badges')}
            isExternal
            size="sm"
            variant="soft"
            colorScheme="neutral1"
            rightIcon={<PiArrowSquareOut />}
          >
            {t('See all badges')}
          </Button>
        </HStack>
        {renderBadgesBody()}
      </VStack>
    </>
  )
}
