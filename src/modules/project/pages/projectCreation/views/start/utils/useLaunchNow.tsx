import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { AuthModal } from '@/components/molecules/AuthModal.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { ExternalAccountType } from '@/modules/auth/type.ts'
import { getPath } from '@/shared/constants/index.ts'

const SocialAccountType = [
  ExternalAccountType.twitter,
  ExternalAccountType.nostr,
  ExternalAccountType.facebook,
  ExternalAccountType.instagram,
  ExternalAccountType.github,
]

export const useLaunchNow = () => {
  const { isLoggedIn, user } = useAuthContext()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  const hasSocialLogin = user.externalAccounts.some((account) =>
    SocialAccountType.includes(account.accountType as ExternalAccountType),
  )

  const renderModal = () => {
    return (
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={() => {
          navigate(getPath('launchProjectDetails'))
        }}
        title={t('Sign in to Geyser')}
        description={t(
          'To create a project you first need to connect a social account to your profile using one of the following methods:',
        )}
        noEmailPopup={true}
        showLightning={false}
        showGoogle={false}
      />
    )
  }

  const handleLauchNowClick = () => {
    if (isLoggedIn && hasSocialLogin) {
      navigate(getPath('launchProjectDetails'))
    } else {
      setIsOpen(true)
    }
  }

  return {
    renderModal,
    handleLauchNowClick,
  }
}
