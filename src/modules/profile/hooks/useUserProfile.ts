import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { toInt, useNotification } from '@/utils'

import { useAuthContext } from '../../../context'
import { useUserForProfilePageQuery } from '../../../types'
import { defaultUser, userProfileAtom, userProfileLoadingAtom, useViewingOwnProfileAtomValue } from '../state'

export const useUserProfile = ({ userId, heroId }: { userId?: string; heroId?: string }) => {
  const toast = useNotification()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()
  const [userProfile, setUserProfile] = useAtom(userProfileAtom)

  const [isLoading, setIsLoading] = useAtom(userProfileLoadingAtom)
  const { user: currentAppUser } = useAuthContext()

  const whereVariable = userId ? { id: toInt(userId) } : { heroId }

  useEffect(() => {
    setIsLoading(true)
    setUserProfile(defaultUser)
  }, [userId, heroId, setIsLoading, setUserProfile])

  const { error } = useUserForProfilePageQuery({
    variables: {
      where: whereVariable,
    },
    skip: !userId && !heroId,
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
