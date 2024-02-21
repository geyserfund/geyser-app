import { MutationHookOptions } from '@apollo/client'
import { useAtom } from 'jotai'
import { useMemo } from 'react'

import { useAuthContext } from '../../../../../context'
import { Exact, UnlinkExternalAccountMutation, useUnlinkExternalAccountMutation } from '../../../../../types'
import { ExternalAccountType } from '../../../../auth'
import { userProfileAtom, useViewingOwnProfileAtomValue } from '../../../state'

const MIN_ACCOUNTS_TO_REMOVE_ACCOUNT = 2

interface AccountUnlinkProps {
  accountId: number
  accountType?: ExternalAccountType
  mutationProps?: MutationHookOptions<UnlinkExternalAccountMutation, Exact<{ id: any }>>
}

export const useAccountUnlink = ({ accountId, accountType, mutationProps }: AccountUnlinkProps) => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom)
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()

  const { user } = useAuthContext()

  const [unlinkAccount, { loading }] = useUnlinkExternalAccountMutation({
    ...mutationProps,
    onCompleted(data) {
      setUserProfile((prev) => ({ ...prev, ...data.unlinkExternalAccount }))
      if (mutationProps?.onCompleted) {
        mutationProps.onCompleted(data)
      }
    },
  })

  const handleAccountUnlink = () => {
    unlinkAccount({ variables: { id: accountId } })
  }

  const isEdit = useMemo(() => {
    // If user is not visiting his own profile
    if (!isViewingOwnProfile) return false

    // If user has less than 2 social accounts, they can't remove any account
    if (userProfile.externalAccounts.length < MIN_ACCOUNTS_TO_REMOVE_ACCOUNT) return false

    // If User is a Creator, they can't remove their last social account ( lightning is not considered social account)
    if (
      user.ownerOf.length > 0 &&
      !userProfile.externalAccounts.find(
        (ea) => ea.accountType !== accountType && ea.accountType !== ExternalAccountType.lightning,
      )
    ) {
      return false
    }

    return true
  }, [isViewingOwnProfile, userProfile.externalAccounts, user.ownerOf, accountType])

  return {
    isLoading: loading,
    isEdit,
    handleAccountUnlink,
  }
}
