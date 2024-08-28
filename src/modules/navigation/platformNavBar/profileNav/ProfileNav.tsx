import { useMobileMode } from '@/utils'

import { ProfileNavMenu } from './ProfileNavMenu'
import { ProfileNavSidebar } from './ProfileNavSidebar'

export const ProfileNav = () => {
  const isMobileMode = useMobileMode()

  if (isMobileMode) {
    return <ProfileNavSidebar />
  }

  return <ProfileNavMenu />
}
