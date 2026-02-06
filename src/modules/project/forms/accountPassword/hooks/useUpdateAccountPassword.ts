import { useSetAtom } from 'jotai'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { UserAccountKeysFragment, useUserAccountKeysUpdateMutation } from '@/types/index.ts'

import { encryptMnemonic, encryptSeed, generateKeysFromSeedHex, generateSeedDataForUser } from '../keyGenerationHelper.ts'

export const useUpdateAccountPassword = (onComplete?: (_: UserAccountKeysFragment) => void) => {
  const [userAccountKeysUpdate, { loading: isUserAccountKeysCreateLoading }] = useUserAccountKeysUpdateMutation()

  const setUserAccountKeys = useSetAtom(userAccountKeysAtom)
  const setUserAccountKeyPair = useSetAtom(userAccountKeyPairAtom)

  const onSubmit = async (data: { password: string; repeatPassword: string }) => {
    const { seedHex, mnemonic } = generateSeedDataForUser()

    const { privateKey, publicKey, address, derivationPath } = generateKeysFromSeedHex(seedHex)

    const encryptedSeed = await encryptSeed(seedHex, data.password, mnemonic)
    const encryptedMnemonic = await encryptMnemonic(mnemonic, data.password)

    if (!address && !privateKey && !publicKey && !derivationPath) {
      return
    }

    userAccountKeysUpdate({
      variables: {
        input: {
          encryptedSeed,
          encryptedMnemonic,
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
