import { Link } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { useAuthContext } from '@/context'
import { Body } from '@/shared/components/typography'
import { GeyserAboutUrl, GeyserBannerLogoUrl } from '@/shared/constants'
import { GradientBanner } from '@/shared/molecules/GradientBanner.tsx'

const welcomeCardDismissedAtom = atomWithStorage('welcomeCardDismissedAtom', false)

export const WelcomeCard = () => {
  const { isLoggedIn } = useAuthContext()

  const [isWelcomeCardDismissed, setIsWelcomeCardDismissed] = useAtom(welcomeCardDismissedAtom)

  if (isLoggedIn || isWelcomeCardDismissed) return null

  return (
    <GradientBanner
      title={t('Where grassroots Bitcoin projects come to life.')}
      subtitle={t(
        'Geyser rallies the Bitcoin community to fund ideas, products, and causes that drive real-world adoption from the ground up.',
      )}
      imageUrl={GeyserBannerLogoUrl}
      onClose={() => setIsWelcomeCardDismissed(true)}
      endContent={
        <Body as={Link} href={GeyserAboutUrl} underline>
          {t('Learn more')}.
        </Body>
      }
    />
  )
}
