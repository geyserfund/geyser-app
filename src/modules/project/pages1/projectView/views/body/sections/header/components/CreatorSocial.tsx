import { Button, HStack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { UserVerifiedBadge } from '@/modules/profile/pages/profilePage/views/account/views/badges/VerifiedBadge.tsx'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar.tsx'
import { ProfileText } from '@/shared/components/display/ProfileText.tsx'
import { getExternalAccountsButtons } from '@/shared/utils/user/getExternalAccountsButtons'

import { getPath } from '../../../../../../../../../shared/constants'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'

export const CreatorSocial = () => {
  const { projectOwner } = useProjectAtom()

  const user = projectOwner?.user

  const accountButtonProps = getExternalAccountsButtons({
    accounts: user?.externalAccounts,
  })

  if (!user) {
    return null
  }

  return (
    <HStack spacing={0.5}>
      <Button
        as={NavLink}
        to={getPath('userProfile', user.id)}
        size="sm"
        variant="soft"
        colorScheme="neutral1"
        leftIcon={<ProfileAvatar guardian={user.guardianType} src={`${user.imageUrl}`} h="16px" w="16px" />}
      >
        <ProfileText name={user.username} guardian={user.guardianType} size="sm" bold dark>
          {user.username}
        </ProfileText>
        <UserVerifiedBadge user={user} fontSize="16px" />
      </Button>

      {accountButtonProps.map(({ icon, props, key }) => {
        if (!icon || !props) {
          return
        }

        return (
          <Button
            key={key}
            aria-label={`user-external-account-link-${key}`}
            size={'sm'}
            variant="soft"
            colorScheme="neutral1"
            p={'0'}
            fontSize="16px"
            {...props}
          >
            {icon}
          </Button>
        )
      })}
    </HStack>
  )
}
