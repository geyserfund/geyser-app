import { t } from 'i18next'

import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

const creatorText = t(
  'Without your account password you will not be able to claim the funds of your crowdfunding campaign. Store this password in a safe, permanent place like a password manager. Geyser cannot recover this password for you.',
)

const contributorText = t(
  'Without your account password you will not be able to refund your contribution. Store this password in a safe, permanent place like a password manager. Geyser cannot recover this password for you.',
)

export const FeedBackText = ({ isCreator }: { isCreator?: boolean }) => {
  return <Feedback variant={FeedBackVariant.WARNING} text={isCreator ? creatorText : contributorText} />
}
