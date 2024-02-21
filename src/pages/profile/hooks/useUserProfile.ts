import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { useAuthContext } from '../../../context'
import { useUserForProfilePageQuery } from '../../../types'
import { userProfileAtom, useViewingOwnProfileAtomValue } from '../state'

export const useUserProfile = (useId: number) => {
  const isViewingOwnProfile = useViewingOwnProfileAtomValue()
  const [userProfile, setUserProfile] = useAtom(userProfileAtom)
  const { user: currentAppUser } = useAuthContext()

  const { loading, error } = useUserForProfilePageQuery({
    variables: {
      where: {
        id: useId,
      },
    },
    skip: !useId,
    onCompleted(data) {
      if (data.user) {
        setUserProfile(data.user)
      }
    },
  })

  useEffect(() => {
    if (isViewingOwnProfile) {
      setUserProfile((current) => ({
        ...current,
        ...currentAppUser,
      }))
    }
  }, [isViewingOwnProfile, currentAppUser, setUserProfile])

  return { isLoading: loading, error, userProfile }
}
