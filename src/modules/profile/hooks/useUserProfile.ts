import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

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
  const [hasShownError, setHasShownError] = useState(false)

  const whereVariable = userId ? { id: requestedUserId } : { heroId }

  useEffect(() => {
    const isSameProfile =
      (requestedUserId !== undefined && userProfile?.id === requestedUserId) ||
      (Boolean(heroId) && userProfile?.heroId === heroId)

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
  }, [heroId, requestedUserId, setIsLoading, setUserProfile, shouldFetch, userProfile?.heroId, userProfile?.id])

  useEffect(() => {
    setHasShownError(false)
  }, [heroId, requestedUserId])

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
    if (!error || hasShownError) return

    setHasShownError(true)
    setIsLoading(false)
    toast.error({
      title: t('Error fetching user profile'),
      description: t('Please refresh the page and try again.'),
    })
  }, [error, hasShownError, setIsLoading, toast])

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
