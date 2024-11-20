import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiGear } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useUserProfileAtom, useViewingOwnProfileAtomValue } from '@/modules/profile/state'
import { CardLayout } from '@/shared/components/layouts'
import { dimensions, getPath } from '@/shared/constants'

import { AccountInfo } from './views/AccountInfo'
import { Badges } from './views/badges'
import { Summary } from './views/Summary'
import { UserBio } from './views/UserBio'

export const Account = () => {
  const { userProfile } = useUserProfileAtom()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()
  return (
    <CardLayout
      mobileDense
      height="100%"
      overflowY={'auto'}
      w="full"
      maxWidth={{ base: 'unset', lg: dimensions.profile.sideNav.width }}
      spacing={6}
    >
      <AccountInfo />
      <UserBio />
      {isViewingOwnProfile && userProfile && (
        <Button
          as={Link}
          to={getPath('userProfileSettings', userProfile.id)}
          width="100%"
          minHeight="40px"
          variant="soft"
          colorScheme="neutral1"
          leftIcon={<PiGear />}
        >
          {t('Profile settings')}
        </Button>
      )}
      <Summary />
      <Badges />
    </CardLayout>
  )
}
