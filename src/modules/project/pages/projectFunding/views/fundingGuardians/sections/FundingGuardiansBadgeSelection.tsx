import { Button, HStack, Icon, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'
import { PiCheckBold } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { useGuardianProjectRewards } from '@/modules/guardians/hooks/useGuardianProjectRewards.tsx'
import { guardianRewardsAtom } from '@/modules/guardians/state/guardianRewards.ts'
import { guardianRewardsMap, GuardianRewardType } from '@/modules/guardians/utils/constants.ts'
import { GemArray } from '@/modules/profile/pages/profilePage/views/account/views/badges/GemArray.tsx'
import { UserVerifiedBadge } from '@/modules/profile/pages/profilePage/views/account/views/badges/VerifiedBadge.tsx'
import { userBadgesAtom } from '@/modules/profile/state/badgesAtom.ts'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { guardianBadgeUniqueName, guardianJewels, guardianText } from '@/shared/constants/assets/guardianAssets.tsx'
import { GuardianType, useGuardianUsersGetQuery, useUserBadgesQuery } from '@/types'
import { toInt, useMobileMode, useNotification } from '@/utils'

export const FundingGuardiansBadgeSelection = () => {
  const { user, isLoggedIn } = useAuthContext()
  const [userBadges, setUserBadges] = useAtom(userBadgesAtom)
  const guardianRewards = useAtomValue(guardianRewardsAtom)
  const { formState, setState } = useFundingFormAtom()
  const selectedBadges = formState.guardianBadges || []
  const setSelectedBadges = (badges: GuardianType[]) => {
    setState('guardianBadges', badges)
  }

  const toast = useNotification()

  /** Load guardian project rewards */
  useGuardianProjectRewards()

  /** Load user badges if logged in */
  useUserBadgesQuery({
    skip: !isLoggedIn || !user.id,
    variables: { input: { where: { userId: toInt(user.id) } } },
    onError() {
      toast.error({
        title: t('Error fetching badges'),
        description: t('Please refresh the page and try again.'),
      })
    },
    onCompleted(data) {
      setUserBadges(data.userBadges)
    },
  })

  /** Get badge rewards with pricing */
  const badgeRewards = guardianRewards.filter((reward) =>
    guardianRewardsMap.some((map) => map.rewardUUID === reward.uuid && map.type === GuardianRewardType.Badge),
  )

  /** Check which guardian badges user already has */
  const userGuardianBadges = userBadges
    .map((badge) => {
      const guardianType = Object.entries(guardianBadgeUniqueName).find(
        ([type, uniqueName]) => badge.badge.uniqueName === uniqueName,
      )?.[0] as GuardianType | undefined
      return guardianType
    })
    .filter(Boolean) as GuardianType[]

  /** Format sats amount */
  const formatSatsWithCommas = (amount: number) => {
    return amount.toLocaleString()
  }

  return (
    <CardLayout mobileDense width="100%" position="relative">
      <VStack w="full" alignItems="flex-start" spacing={6}>
        {/* Header Section */}
        <VStack w="full" alignItems="flex-start" spacing={0}>
          <H1 size={{ base: 'xl', lg: '2xl' }} bold>
            {t('Become a Guardian. Help us fuel Bitcoin adoption.')}
          </H1>
          <Body size="sm" light>
            {t(
              'Every Guardian badge you collect powers Geyser to enable Bitcoin adoption. Show it proudly on your profile.',
            )}
          </Body>
        </VStack>

        {/* User Profile Section */}
        {isLoggedIn && <UserProfileSection user={user} selectedBadges={selectedBadges} />}

        {/* Guardian Users Display */}
        <GuardianUsersDisplay />

        {/* Badge Selection */}
        <BadgeSelectionSection
          badgeRewards={badgeRewards}
          userGuardianBadges={userGuardianBadges}
          selectedBadges={selectedBadges}
          onSelectBadge={setSelectedBadges}
          formatSatsWithCommas={formatSatsWithCommas}
        />
      </VStack>
    </CardLayout>
  )
}

/** User profile section with verified badge and gem array */
const UserProfileSection = ({ user, selectedBadges }: { user: any; selectedBadges: GuardianType[] }) => {
  const isMobile = useMobileMode()
  return (
    <HStack w="full" justifyContent="center">
      <CardLayout
        padding="12px 8px"
        borderRadius="18px"
        flexDirection="row"
        spacing={6}
        alignItems="center"
        shadow="xl"
      >
        <HStack>
          <ProfileAvatar
            src={user.imageUrl}
            h={{ base: '32px', lg: '40px' }}
            w={{ base: '32px', lg: '40px' }}
            guardian={user.guardianType}
            wrapperProps={{ padding: '4px' }}
          />
          <Body size={{ base: 'lg', lg: 'xl' }} bold>
            {user.username}
          </Body>
          <UserVerifiedBadge user={user} fontSize="lg" />
        </HStack>

        <HStack spacing={2} alignItems="center">
          <GemArray
            size={isMobile ? 'lg' : 'xl'}
            name={user.username}
            disablePopover
            selectedGuardianTypes={selectedBadges}
          />
        </HStack>
      </CardLayout>
    </HStack>
  )
}

/** Display guardian users (5 random from all types) */
const GuardianUsersDisplay = () => {
  const isMobile = useMobileMode()

  const [totalGuardianCount, setTotalGuardianCount] = useState<number>(0)
  const [displayUsers, setDisplayUsers] = useState<any[]>([])

  /** Fetch Warrior users */
  useGuardianUsersGetQuery({
    variables: {
      input: {
        where: {
          guardianType: GuardianType.Warrior,
        },
      },
    },
    onCompleted(data) {
      const users = data?.guardianUsersGet?.guardianUsers[0]?.users || []
      const soldCount = data?.guardianUsersGet?.guardianUsers[0]?.soldCount || 0

      setDisplayUsers((prev) => {
        const combined = [...prev, ...users]
        // Remove duplicates based on userId
        const uniqueUsers = combined.filter(
          (user, index, self) => index === self.findIndex((u) => u.userId === user.userId),
        )

        // Get 5 random users for display
        const shuffled = [...uniqueUsers].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, isMobile ? 3 : 5)
      })

      setTotalGuardianCount((prev) => prev + soldCount)
    },
  })

  /** Fetch Knight users */
  useGuardianUsersGetQuery({
    variables: {
      input: {
        where: {
          guardianType: GuardianType.Knight,
        },
      },
    },
    onCompleted(data) {
      const users = data?.guardianUsersGet?.guardianUsers[0]?.users || []
      const soldCount = data?.guardianUsersGet?.guardianUsers[0]?.soldCount || 0

      setDisplayUsers((prev) => {
        const combined = [...prev, ...users]
        // Remove duplicates based on userId
        const uniqueUsers = combined.filter(
          (user, index, self) => index === self.findIndex((u) => u.userId === user.userId),
        )

        // Get 5 random users for display
        const shuffled = [...uniqueUsers].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 5)
      })

      setTotalGuardianCount((prev) => prev + soldCount)
    },
  })

  /** Fetch King users */
  useGuardianUsersGetQuery({
    variables: {
      input: {
        where: {
          guardianType: GuardianType.King,
        },
      },
    },
    onCompleted(data) {
      const users = data?.guardianUsersGet?.guardianUsers[0]?.users || []
      const soldCount = data?.guardianUsersGet?.guardianUsers[0]?.soldCount || 0

      setDisplayUsers((prev) => {
        const combined = [...prev, ...users]
        // Remove duplicates based on userId
        const uniqueUsers = combined.filter(
          (user, index, self) => index === self.findIndex((u) => u.userId === user.userId),
        )

        // Get 5 random users for display
        const shuffled = [...uniqueUsers].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 5)
      })

      setTotalGuardianCount((prev) => prev + soldCount)
    },
  })

  /** Fetch Legend users */
  useGuardianUsersGetQuery({
    variables: {
      input: {
        where: {
          guardianType: GuardianType.Legend,
        },
      },
    },
    onCompleted(data) {
      const users = data?.guardianUsersGet?.guardianUsers[0]?.users || []
      const soldCount = data?.guardianUsersGet?.guardianUsers[0]?.soldCount || 0

      setDisplayUsers((prev) => {
        const combined = [...prev, ...users]
        // Remove duplicates based on userId
        const uniqueUsers = combined.filter(
          (user, index, self) => index === self.findIndex((u) => u.userId === user.userId),
        )

        // Get 5 random users for display
        const shuffled = [...uniqueUsers].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 5)
      })

      setTotalGuardianCount((prev) => prev + soldCount)
    },
  })

  if (displayUsers.length === 0) return null

  return (
    <HStack w="full" alignItems="center" spacing={3} justifyContent="center">
      <HStack spacing={0} justifyContent="center">
        {displayUsers.map((user) => (
          <ProfileAvatar
            key={user.userId}
            src={user.imageUrl}
            h="32px"
            w="32px"
            guardian={user.guardianType as GuardianType}
            wrapperProps={{ padding: '2px' }}
          />
        ))}
      </HStack>

      <Body medium>
        {totalGuardianCount} {t('Guardians and counting')}
      </Body>
    </HStack>
  )
}

/** Badge selection buttons */
const BadgeSelectionSection = ({
  badgeRewards,
  userGuardianBadges,
  selectedBadges,
  onSelectBadge,
  formatSatsWithCommas,
}: {
  badgeRewards: any[]
  userGuardianBadges: GuardianType[]
  selectedBadges: GuardianType[]
  onSelectBadge: (badges: GuardianType[]) => void
  formatSatsWithCommas: (amount: number) => string
}) => {
  const hoverBorderColor = useColorModeValue('neutral1.6', 'neutral1.8')
  const selectedBorderColor = useColorModeValue('primary1.9', 'primary1.9')

  const orderedGuardianTypes = [GuardianType.Warrior, GuardianType.Knight, GuardianType.King, GuardianType.Legend]

  return (
    <VStack w="full" alignItems="flex-start" spacing={4} paddingTop={4}>
      <HStack spacing={4} justify="flex-start" flexWrap="wrap">
        {orderedGuardianTypes.map((guardianType) => {
          const rewardMap = guardianRewardsMap.find(
            (map) => map.guardian === guardianType && map.type === GuardianRewardType.Badge,
          )
          const reward = badgeRewards.find((r) => r.uuid === rewardMap?.rewardUUID)
          const hasThisBadge = userGuardianBadges.includes(guardianType)
          const isSelected = selectedBadges.includes(guardianType)

          if (!reward || !rewardMap) return null

          return (
            <BadgeSelectionButton
              key={guardianType}
              guardianType={guardianType}
              image={guardianJewels[guardianType]}
              price={reward.cost}
              hasThisBadge={hasThisBadge}
              isSelected={isSelected}
              onSelect={() => {
                if (hasThisBadge) return
                if (isSelected) {
                  // Remove from selection
                  onSelectBadge(selectedBadges.filter((badge) => badge !== guardianType))
                } else {
                  // Add to selection
                  onSelectBadge([...selectedBadges, guardianType])
                }
              }}
              formatSatsWithCommas={formatSatsWithCommas}
              hoverBorderColor={hoverBorderColor}
              selectedBorderColor={selectedBorderColor}
            />
          )
        })}
      </HStack>
    </VStack>
  )
}

/** Individual badge selection button */
const BadgeSelectionButton = ({
  guardianType,
  image,
  price,
  hasThisBadge,
  isSelected,
  onSelect,
  formatSatsWithCommas,
  hoverBorderColor,
  selectedBorderColor,
}: {
  guardianType: GuardianType
  image?: string
  price: number
  hasThisBadge: boolean
  isSelected: boolean
  onSelect: () => void
  formatSatsWithCommas: (amount: number) => string
  hoverBorderColor: string
  selectedBorderColor: string
}) => {
  const guardian = guardianText[guardianType]

  return (
    <Button
      variant="outline"
      size="lg"
      h={{ base: '138px', lg: '178px' }}
      width={{ base: '130px', lg: '150px' }}
      minWidth="120px"
      flex={1}
      as={VStack}
      flexDirection="column"
      justifyContent="flex-start"
      gap={0}
      p={3}
      opacity={hasThisBadge ? 0.6 : 1}
      cursor={hasThisBadge ? 'not-allowed' : 'pointer'}
      borderColor={isSelected ? selectedBorderColor : 'neutral1.4'}
      borderWidth={isSelected ? '2px' : '1px'}
      _hover={
        hasThisBadge
          ? {}
          : {
              borderColor: isSelected ? selectedBorderColor : hoverBorderColor,
            }
      }
      onClick={onSelect}
      disabled={hasThisBadge}
    >
      <Image
        src={image}
        alt={`${guardian} badge`}
        boxSize={{ base: '40px', lg: '80px' }}
        filter={hasThisBadge ? 'grayscale(100%)' : 'none'}
      />
      <Body bold dark size={{ base: 'sm', lg: 'md' }}>
        {guardian} Badge
      </Body>
      <VStack spacing={0}>
        <Body size="sm" bold>
          ${Math.round(price / 100)}
        </Body>
        {hasThisBadge ? (
          <HStack spacing={1} alignItems="center">
            <Icon as={PiCheckBold} fontSize="sm" />
            <Body size="sm" dark bold>
              {t('Collected')}
            </Body>
          </HStack>
        ) : isSelected ? (
          <HStack spacing={1} alignItems="center">
            <Icon as={PiCheckBold} color="primary1.9" fontSize="sm" />
            <Body size="sm" color="primary1.10" bold>
              {t('Selected')}
            </Body>
          </HStack>
        ) : (
          <Body size="sm" color="primary1.10" medium>
            {t('')}
          </Body>
        )}
      </VStack>
    </Button>
  )
}
