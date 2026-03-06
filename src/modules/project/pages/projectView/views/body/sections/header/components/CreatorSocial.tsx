import { Badge, Box, Button, HStack, Icon, Image, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiSealCheckFill } from 'react-icons/pi'
import { NavLink } from 'react-router'

import { ExternalAccountType } from '@/modules/auth'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar.tsx'
import { H2 } from '@/shared/components/typography'
import { guardianJewels, guardianText } from '@/shared/constants/assets/guardianAssets.tsx'
import { getExternalAccountsButtons } from '@/shared/utils/user/getExternalAccountsButtons'
import { ProjectPageCreatorFragment } from '@/types'

import { getPath } from '../../../../../../../../../shared/constants'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'

export const CreatorSocial = () => {
  const { projectOwner } = useProjectAtom()

  const user = projectOwner?.user
  const profilePath = user ? getPath('userProfile', user.id) : ''
  const secondaryBorderColor = useColorModeValue('neutral1.5', 'neutral1.7')

  const accountButtonProps = getExternalAccountsButtons({
    accounts: user?.externalAccounts,
  })

  if (!user) {
    return null
  }

  return (
    <HStack w="full" alignItems="center" spacing={3} minW={0}>
      <Box
        as={NavLink}
        to={profilePath}
        aria-label={t('View {{username}} profile', { username: user.username })}
        flexShrink={0}
      >
        <ProfileAvatar
          guardian={user.guardianType}
          src={`${user.imageUrl}`}
          h={{ base: '34px', lg: '36px' }}
          w={{ base: '34px', lg: '36px' }}
          wrapperProps={{
            border: '1px solid',
            borderColor: secondaryBorderColor,
            boxShadow: 'sm',
          }}
        />
      </Box>

      <HStack alignItems="center" spacing={2} minW={0} flex={1}>
        <H2
          as={NavLink}
          to={profilePath}
          dark
          lineHeight="1"
          fontSize={{ base: 'md', lg: 'lg' }}
          whiteSpace="nowrap"
          _hover={{ textDecoration: 'none', opacity: 0.85 }}
        >
          {user.username}
        </H2>
        <CreatorGuardianBadge user={user} />
        {accountButtonProps.map(({ icon, props, key }) =>
          !icon || !props ? null : <CreatorSocialLink key={key} accountKey={key} icon={icon} props={props} />,
        )}
      </HStack>

      <CreatorIdentityBadges user={user} />
    </HStack>
  )
}

const CreatorIdentityBadges = ({ user }: { user: ProjectPageCreatorFragment }) => {
  const verifiedCreatorBg = useColorModeValue('primary1.3', 'primary1.4')
  const verifiedCreatorColor = useColorModeValue('primary1.10', 'primary1.11')

  return (
    <HStack spacing={2} flexShrink={0}>
      {isVerifiedCreator(user) && (
        <Badge
          display="inline-flex"
          alignItems="center"
          gap={1.5}
          size="md"
          borderRadius="full"
          backgroundColor={verifiedCreatorBg}
          color={verifiedCreatorColor}
          paddingX={2.5}
          paddingY={1}
          textTransform="none"
        >
          <Icon as={PiSealCheckFill} boxSize={4} />
          {t('Verified Creator')}
        </Badge>
      )}
    </HStack>
  )
}

const CreatorGuardianBadge = ({ user }: { user: ProjectPageCreatorFragment }) => {
  const guardianJewel = user.guardianType ? guardianJewels[user.guardianType] : undefined
  const guardianLabel = user.guardianType ? guardianText[user.guardianType] : undefined

  if (!guardianJewel || !guardianLabel) {
    return null
  }

  return (
    <Tooltip
      label={t('{{username}} is a {{guardian}} Guardian', {
        username: user.username,
        guardian: guardianLabel,
      })}
    >
      <Image src={guardianJewel} alt={`${guardianLabel} guardian badge`} boxSize="24px" />
    </Tooltip>
  )
}

const CreatorSocialLink = ({
  accountKey,
  icon,
  props,
}: {
  accountKey: string
  icon: React.ReactNode
  props: {
    as: any
    isExternal: boolean
    href: string
  }
}) => {
  const accountLabel = getAccountLabel(accountKey)

  return (
    <Tooltip label={t('Open {{account}} profile', { account: accountLabel })}>
      <Button
        aria-label={t('Open {{account}} profile', { account: accountLabel })}
        size="sm"
        variant="soft"
        colorScheme="neutral1"
        minW="8"
        paddingX="0"
        {...props}
      >
        {icon}
      </Button>
    </Tooltip>
  )
}

const isVerifiedCreator = (user: ProjectPageCreatorFragment) =>
  Boolean(
    user.complianceDetails?.verifiedDetails?.email?.verified &&
      user.complianceDetails?.verifiedDetails?.phoneNumber?.verified &&
      user.complianceDetails?.verifiedDetails?.identity?.verified,
  )

const getAccountLabel = (key: string) => {
  switch (key) {
    case ExternalAccountType.twitter:
      return t('X')
    case ExternalAccountType.nostr:
      return t('Nostr')
    case ExternalAccountType.github:
      return t('GitHub')
    case ExternalAccountType.facebook:
      return t('Facebook')
    case ExternalAccountType.google:
      return t('Google')
    case ExternalAccountType.lightning:
      return t('Lightning')
    default:
      return t('social')
  }
}
