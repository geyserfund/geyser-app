import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { ProfileSettingsMenuMobile } from './navigation'

export const ProfileSettingsMain = () => {
  const isMobile = useMobileMode()

  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isMobile && user?.id) {
      navigate(getPath('userProfileSettingsGeneral', user?.id))
    }
  }, [isMobile, navigate, user])

  if (isMobile) {
    return <ProfileSettingsMenuMobile />
  }

  return null
}
