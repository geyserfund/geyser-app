import { useSetAtom } from 'jotai'

import { useAuthContext } from '@/context/auth.tsx'
import { useAccountKeysQuery } from '@/types/index.ts'

import { userAccountKeysAtom } from '../state/userAccountKeysAtom.ts'

/**
 * Hook to fetch the user's account keys and set them in the atom
 */
export const useUserAccountKeys = () => {
  const { user } = useAuthContext()

  const setUserAccountKeys = useSetAtom(userAccountKeysAtom)

  useAccountKeysQuery({
    skip: !user.id,
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
}
