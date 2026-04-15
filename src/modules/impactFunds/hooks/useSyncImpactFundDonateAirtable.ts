import { useEffect, useRef } from 'react'

import { patchImpactFundDonationContributionUuid } from '@/api/airtable.ts'

import {
  clearImpactFundDonateSessionPref,
  readImpactFundDonateSessionPref,
} from '../utils/impactFundDonatePreferences.ts'

type UseSyncImpactFundDonateAirtableParams = {
  projectName: string
  contributionUuid: string
}

/** After a successful project funding, attaches the contribution uuid to the Impact Fund donate-preference Airtable row (if any). */
export function useSyncImpactFundDonateAirtable({
  projectName,
  contributionUuid,
}: UseSyncImpactFundDonateAirtableParams): void {
  const didSync = useRef(false)

  useEffect(() => {
    if (didSync.current || !contributionUuid || projectName.length === 0) {
      return
    }

    const pref = readImpactFundDonateSessionPref()
    if (!pref || pref.donateProjectName !== projectName) {
      return
    }

    didSync.current = true

    patchImpactFundDonationContributionUuid({
      recordId: pref.airtableRecordId,
      contributionUuid,
    })
      .then(() => {
        clearImpactFundDonateSessionPref()
      })
      .catch(() => {
        didSync.current = false
      })
  }, [contributionUuid, projectName])
}
