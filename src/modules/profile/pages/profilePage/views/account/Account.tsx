import { CardLayout } from '@/shared/components/layouts'
import { dimensions } from '@/shared/constants'

import { AccountInfo } from './views/AccountInfo'
import { Badges } from './views/badges'
import { Summary } from './views/Summary'
import { UserBio } from './views/UserBio'

export const Account = () => {
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
      <Summary />
      <Badges />
    </CardLayout>
  )
}
