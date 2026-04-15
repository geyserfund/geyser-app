import { useAtomValue, useSetAtom } from 'jotai'

import { useAuthContext } from '@/context/auth.tsx'
import { useAccountKeysQuery } from '@/types/index.ts'

import { userAccountKeysAtom } from '../state/userAccountKeysAtom.ts'

/**
 * Hook to fetch the user's account keys and set them in the atom
 */
export const useUserAccountKeys = () => {
  const { user } = useAuthContext()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const setUserAccountKeys = useSetAtom(userAccountKeysAtom)
  const shouldFetchUserAccountKeys = Boolean(user.id) && !userAccountKeys

  const { loading } = useAccountKeysQuery({
    skip: !shouldFetchUserAccountKeys,
    variables: {
      where: {
        id: user.id,
      },
    },
    onCompleted(data) {
      if (data.user.accountKeys) {
        setUserAccountKeys(data.user.accountKeys)
      }
    },
  })

  return {
    isLoading: shouldFetchUserAccountKeys && loading,
  }
}
