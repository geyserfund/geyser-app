import { t } from 'i18next'

import { LaunchPadIllustrationUrl } from '@/shared/constants/platform/url.ts'
import { GradientBanner } from '@/shared/molecules/GradientBanner.tsx'

export const LaunchpadTitle = () => {
  return (
    <GradientBanner
      title={t('Launchpad')}
      subtitle={`${t('Support projects in their first 30 days — help them hit $210 to fully launch!')} 🚀`}
      imageUrl={LaunchPadIllustrationUrl}
    />
  )
}
