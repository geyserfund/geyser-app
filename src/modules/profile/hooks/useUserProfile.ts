import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { toInt, useNotification } from '@/utils'

import { useAuthContext } from '../../../context'
import { useUserForProfilePageQuery } from '../../../types'
import { userProfileAtom, userProfileLoadingAtom, useViewingOwnProfileAtomValue } from '../state'

export const useUserProfile = (userId?: string) => {
  const toast = useNotification()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()
  const [userProfile, setUserProfile] = useAtom(userProfileAtom)
  const [isLoading, setIsLoading] = useAtom(userProfileLoadingAtom)
  const { user: currentAppUser } = useAuthContext()

  const { error } = useUserForProfilePageQuery({
    variables: {
      where: {
        id: toInt(userId),
      },
    },
    skip: !userId,
    onCompleted(data) {
      if (data.user) {
        setUserProfile(data.user)
        setIsLoading(false)
      }
    },
    onError() {
      setIsLoading(false)
      toast.error({
        title: 'Error fetching user profile',
        description: 'Please refresh the page and try again.',
      })
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

  return { isLoading, error, userProfile }
}
