import { t } from 'i18next'

import { LaunchPadIllustrationUrl } from '@/shared/constants/platform/url.ts'
import { GradientBanner } from '@/shared/molecules/GradientBanner.tsx'

export const LaunchpadTitle = () => {
  return (
    <GradientBanner
      title={t('Launchpad')}
      subtitle={t(
        'These early-stage projects are in countdown mode. To launch, they need 21 followers within 30 days. Help them build momentum — or they might never take off.',
      )}
      imageUrl={LaunchPadIllustrationUrl}
    />
  )
}
