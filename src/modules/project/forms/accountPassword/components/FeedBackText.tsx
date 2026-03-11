import { t } from 'i18next'

import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

const creatorText = t(
  'Without your account password you will not be able to claim the funds of your crowdfunding campaign. Store this password in a safe, permanent place like a password manager. Geyser cannot recover this password for you.',
)

const contributorText = t(
  'This password is known only by you and is required in case of refunds. Remember to store this password somewhere safe, as Geyser does not store it.',
)

export const FeedBackText = ({ isCreator }: { isCreator?: boolean }) => {
  return <Feedback variant={FeedBackVariant.WARNING} text={isCreator ? creatorText : contributorText} />
}
