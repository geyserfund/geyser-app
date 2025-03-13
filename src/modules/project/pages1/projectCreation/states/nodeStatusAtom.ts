import { atom } from 'jotai'

import { authUserAtom } from '@/modules/auth/state/authAtom.ts'

/** Atom to know if the user wants to enable fiat contributions */
export const fiatContributionAtom = atom<boolean>(true)

/** Atom to know if the user can go to launch the project */
export const isReadyForLaunchAtom = atom<boolean>(false)

/** Atom to know if the user needs to go to the  email verification page */
export const goToEmailVerificationAtom = atom<boolean>(false)

/** Atom to know if the user needs to go to the identity verification page */
export const goToIdentityVerificationAtom = atom<boolean>(false)

/** Atom to store the navigation state in project creation flow, final stage */
export const whereToGoNextAtom = atom(null, (get, set) => {
  const user = get(authUserAtom)
  const isIdentityVerified = user.complianceDetails.verifiedDetails.identity?.verified
  const goToEmailVerification = get(goToEmailVerificationAtom)
  const fiatContributionEnabled = get(fiatContributionAtom)

  if (!user.isEmailVerified && !goToEmailVerification) {
    set(goToEmailVerificationAtom, true)
  } else if (fiatContributionEnabled && !isIdentityVerified) {
    set(goToIdentityVerificationAtom, true)
    set(goToEmailVerificationAtom, false)
  } else {
    set(isReadyForLaunchAtom, true)
    set(goToEmailVerificationAtom, false)
    set(goToIdentityVerificationAtom, false)
  }
})
