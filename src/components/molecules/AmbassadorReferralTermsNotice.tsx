import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'

/** Terms reminder displayed anywhere a user copies an ambassador/referral link. */
export const AmbassadorReferralTermsNotice = () => (
  <Body size="xs" color="neutral1.9" textAlign="left">
    {t(
      "By sharing this link, you agree to Geyser's referral terms. You must not present projects as investments or promise returns. Failure to comply may result in loss of referral earnings.",
    )}
  </Body>
)
