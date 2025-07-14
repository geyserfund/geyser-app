import { t } from 'i18next'

import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const FeedBackText = () => {
  return (
    <Feedback
      variant={FeedBackVariant.WARNING}
      text={t(
        'Without your account password you will not be able to claim the funds of your crowdfunding campaign. Store this password in a safe, permanent place like a password manager. Geyser cannot recover this password for you.',
      )}
    />
  )
}
