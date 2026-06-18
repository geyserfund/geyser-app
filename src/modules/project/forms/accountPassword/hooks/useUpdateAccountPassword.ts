import { useApolloClient } from '@apollo/client'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'

import { userAccountKeyPairAtom, userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { QUERY_USER_ACCOUNT_PASSWORD_FUNDS_SUMMARY } from '@/modules/project/graphql/queries/user.ts'
import { UserAccountKeysFragment, useUserAccountKeysUpdateMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import {
  encryptMnemonic,
  encryptSeed,
  generateKeysFromSeedHex,
  generateProjectKeysFromSeedHex,
  generateSeedDataForUser,
} from '../keyGenerationHelper.ts'

type AccountPasswordProjectImpact = {
  id: string | number | bigint
  title?: string
  derivationPath?: string | null
}

export const useUpdateAccountPassword = (onComplete?: (_: UserAccountKeysFragment) => void) => {
  const client = useApolloClient()
  const toast = useNotification()
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

    try {
      const { data: fundsSummaryData } = await client.query({
        query: QUERY_USER_ACCOUNT_PASSWORD_FUNDS_SUMMARY,
        fetchPolicy: 'network-only',
      })
      const fundsSummary = fundsSummaryData?.userAccountPasswordFundsSummary
      const rotationProjects = uniqueProjects([
        ...(fundsSummary?.affectedTiaProjects ?? []),
        ...(fundsSummary?.legacyTiaProjects ?? []),
      ])
      const projectRskEoas = rotationProjects.map((project) => {
        const projectKeys = generateProjectKeysFromSeedHex(seedHex, project.id, project.derivationPath)

        return {
          projectId: project.id,
          rskEoa: projectKeys.address,
          rskPublicKey: projectKeys.publicKey,
          derivationPath: projectKeys.derivationPath,
        }
      })

      const result = await userAccountKeysUpdate({
        variables: {
          input: {
            encryptedSeed,
            encryptedMnemonic,
            rskKeyPair: {
              address: address || '',
              derivationPath,
              publicKey,
            },
            projectRskEoas,
          },
        },
      })

      const updatedAccountKeys = result.data?.userAccountKeysUpdate
      if (!updatedAccountKeys) {
        throw new Error(t('Account password reset did not return updated account keys.'))
      }

      onComplete?.(updatedAccountKeys)
      setUserAccountKeys(updatedAccountKeys)
      setUserAccountKeyPair({ privateKey, publicKey })
    } catch (error) {
      toast.error({
        title: t('Account password reset failed'),
        description: getErrorMessage(error),
      })
      throw error
    }
  }

  return {
    onSubmit,
    isSubmitting: isUserAccountKeysCreateLoading,
  }
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message
  return t('Please try again.')
}

const uniqueProjects = (projects: AccountPasswordProjectImpact[]) => {
  const projectById = new Map<string, AccountPasswordProjectImpact>()
  projects.forEach((project) => {
    projectById.set(project.id.toString(), project)
  })

  return Array.from(projectById.values())
}
