import { useMobileMode } from '../../../utils'
import { ProfileNavPopOver } from './ProfileNavPopOver'
import { ProfileNavSidebar } from './ProfileNavSidebar'

export const ProfileNav = () => {
  const isMobileMode = useMobileMode()

  if (isMobileMode) {
    return <ProfileNavSidebar />
  }

  return <ProfileNavPopOver />
}
