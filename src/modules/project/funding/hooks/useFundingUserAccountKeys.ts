import { useSetAtom } from 'jotai'

import { useAuthContext } from '@/context/auth.tsx'
import { useAccountKeysQuery } from '@/types/index.ts'

import { fundingUserAccountKeysAtom } from '../state/fundingUserAccountKeys.ts'

/**
 * Hook to fetch the user's account keys and set them in the atom
 */
export const useFundingUserAccountKeys = () => {
  const { user } = useAuthContext()

  const setFundingUserAccountKeys = useSetAtom(fundingUserAccountKeysAtom)

  useAccountKeysQuery({
    skip: !user.id,
    variables: {
      where: {
        id: user.id,
      },
    },
    onCompleted(data) {
      if (data.user.accountKeys) {
        setFundingUserAccountKeys(data.user.accountKeys)
      }
    },
  })
}
