import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'

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
  const shouldFetch = Boolean(userId || heroId)
  const requestedUserId = userId ? toInt(userId) : undefined
  const isSameProfile =
    (requestedUserId !== undefined && userProfile?.id === requestedUserId) || (heroId && userProfile?.heroId === heroId)
  const hasShownError = useRef(false)

  const whereVariable = userId ? { id: requestedUserId } : { heroId }

  useEffect(() => {
    if (!shouldFetch) {
      setIsLoading(false)
      return
    }

    if (isSameProfile) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setUserProfile(defaultUser)
  }, [heroId, isSameProfile, setIsLoading, setUserProfile, shouldFetch, userId])

  const { data, error, loading } = useUserForProfilePageQuery({
    variables: {
      where: whereVariable,
    },
    skip: !shouldFetch,
  })

  useEffect(() => {
    if (!shouldFetch) {
      setIsLoading(false)
      return
    }

    if (data?.user) {
      setUserProfile(data.user)
    }

    if (!loading) {
      setIsLoading(false)
    }
  }, [data, loading, setIsLoading, setUserProfile, shouldFetch])

  useEffect(() => {
    if (!error || hasShownError.current) return

    hasShownError.current = true
    setIsLoading(false)
    toast.error({
      title: 'Error fetching user profile',
      description: 'Please refresh the page and try again.',
    })
  }, [error, setIsLoading, toast])

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
