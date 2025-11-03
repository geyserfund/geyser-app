import { useSetAtom } from 'jotai'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { UserAccountKeysFragment, useUserAccountKeysUpdateMutation } from '@/types/index.ts'

import { encryptSeed, generateKeysFromSeedHex, generateSeedHexForUser } from '../keyGenerationHelper.ts'

export const useUpdateAccountPassword = (onComplete?: (_: UserAccountKeysFragment) => void) => {
  const [userAccountKeysUpdate, { loading: isUserAccountKeysCreateLoading }] = useUserAccountKeysUpdateMutation()

  const setUserAccountKeys = useSetAtom(userAccountKeysAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)

  const onSubmit = async (data: { password: string; repeatPassword: string }) => {
    const seedHex = generateSeedHexForUser()

    const { privateKey, publicKey, address, derivationPath } = generateKeysFromSeedHex(seedHex)

    const encryptedSeed = await encryptSeed(seedHex, data.password)

    if (!address && !privateKey && !publicKey && !derivationPath) {
      return
    }

    userAccountKeysUpdate({
      variables: {
        input: {
          encryptedSeed,
          rskKeyPair: {
            address: address || '',
            derivationPath,
            publicKey,
          },
        },
      },
      onCompleted(data) {
        onComplete?.(data.userAccountKeysUpdate)
        setUserAccountKeys(data.userAccountKeysUpdate)
        setUserAccountKeyPair({ privateKey, publicKey })
      },
    })
  }

  return {
    onSubmit,
    isSubmitting: isUserAccountKeysCreateLoading,
  }
}
