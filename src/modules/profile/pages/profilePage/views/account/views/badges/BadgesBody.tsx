import { Image, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { useUserProfileAtom } from '@/modules/profile/state'
import { userBadgesAtom } from '@/modules/profile/state/badgesAtom.ts'
import { GenericHeroCardUrl } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { toInt, useNotification } from '@/utils'

import { SkeletonLayout } from '../../../../../../../../shared/components/layouts'
import { useUserBadgesQuery } from '../../../../../../../../types'
import { BadgeItem } from './BadgeItem'
import { MediaCarouselForCards } from './MediaCarouselForCards'

export const BadgesBody = () => {
  const { t } = useTranslation()

  const { toast } = useNotification()

  const { userProfile } = useUserProfileAtom()
  const [userBadges, setUserBadges] = useAtom(userBadgesAtom)
  const itemsModal = useModal<{ currentIndex: number }>()

  const { loading: userBadgeLoading } = useUserBadgesQuery({
    skip: !userProfile.id,
    variables: { input: { where: { userId: toInt(userProfile.id) } } },
    onError() {
      toast({
        title: t('Error fetching badges'),
        description: t('Please refresh the page and try again.'),
        status: 'error',
      })
    },
    onCompleted(data) {
      setUserBadges(data.userBadges)
    },
  })

  if (userBadgeLoading) {
    return <BadgesBodySkeleton />
  }

  const totalBadgeLinks = userBadges.map((userBadge) => userBadge.badge.image)
  const handleClick = (badge: (typeof userBadges)[number]) => {
    const currentIndex = userBadges.findIndex((userBadge) => userBadge.id === badge.id) + 1
    itemsModal.onOpen({ currentIndex })
  }

  return (
    <>
      <Wrap w="full" spacingX={2} spacingY={4} justify="start" paddingBottom="20px">
        <WrapItem>
          <VStack
            overflow="hidden"
            w="full"
            onClick={() => itemsModal.onOpen({ currentIndex: 0 })}
            _hover={{ cursor: 'pointer' }}
          >
            <Image width="auto" maxWidth="110px" src={GenericHeroCardUrl} alt={t('Generic hero card image')} />
          </VStack>
        </WrapItem>
        {userBadges.map((userBadge) => (
          <WrapItem key={userBadge.id}>
            <BadgeItem userBadge={userBadge} handleClick={handleClick} />
          </WrapItem>
        ))}
      </Wrap>
      {itemsModal.isOpen && (
        <MediaCarouselForCards
          title={t('Geyser Cards')}
          description={t('Geyser Cards celebrate your achievements across the Bitcoin landscape. ')}
          imageLinkList={totalBadgeLinks}
          size="md"
          bodyProps={{ as: VStack, gap: 4 }}
          {...itemsModal}
        />
      )}
    </>
  )
}

export const BadgesBodySkeleton = () => {
  return (
    <>
      <Wrap spacingY="40px" w="full" paddingX={0} justify="center">
        {[1, 2, 3].map((value) => {
          return (
            <WrapItem key={value} display="flex" flexDirection="column" alignItems="center" paddingTop="20px">
              <SkeletonLayout height="140px" width="109px" />
            </WrapItem>
          )
        })}
      </Wrap>
    </>
  )
}
