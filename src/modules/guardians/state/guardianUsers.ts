import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomFamily } from 'jotai/utils'

import { GuardianType, GuardianUser } from '@/types/index.ts'

export const guardianUsersAtomFamily = atomFamily(
  ({ value }: { guardian: GuardianType; value?: GuardianUser[] }) => atom(value || []),
  (a, b) => a.guardian === b.guardian,
)

export const guardiansSoldCountAtomFamily = atomFamily(
  ({ value }: { guardian: GuardianType; value?: number }) => atom(value || 0),
  (a, b) => a.guardian === b.guardian,
)

export const useGuardianUsersAtomValue = (guardian: GuardianType) => {
  return useAtomValue(guardianUsersAtomFamily({ guardian }))
}

export const useGuardianUsersSetAtom = (guardian: GuardianType) => {
  return useSetAtom(guardianUsersAtomFamily({ guardian }))
}

export const useGuardiansSoldCountSetAtom = (guardian: GuardianType) => {
  return useSetAtom(guardiansSoldCountAtomFamily({ guardian }))
}

export const guardiansTotalSoldCountAtom = atom((get) => {
  const legendSoldCount = get(guardiansSoldCountAtomFamily({ guardian: GuardianType.Legend }))
  const knightSoldCount = get(guardiansSoldCountAtomFamily({ guardian: GuardianType.Knight }))
  const warriorSoldCount = get(guardiansSoldCountAtomFamily({ guardian: GuardianType.Warrior }))
  const kingSoldCount = get(guardiansSoldCountAtomFamily({ guardian: GuardianType.King }))
  return legendSoldCount + knightSoldCount + warriorSoldCount + kingSoldCount
})

export const guardianUsersCountAtom = atom((get) => {
  const legendUsers = get(guardianUsersAtomFamily({ guardian: GuardianType.Legend }))
  const knightUsers = get(guardianUsersAtomFamily({ guardian: GuardianType.Knight }))
  const warriorUsers = get(guardianUsersAtomFamily({ guardian: GuardianType.Warrior }))
  const kingUsers = get(guardianUsersAtomFamily({ guardian: GuardianType.King }))
  return legendUsers.length + knightUsers.length + warriorUsers.length + kingUsers.length
})
