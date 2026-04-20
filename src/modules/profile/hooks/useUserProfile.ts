import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'

import { useNotification } from '@/utils'

import { useAuthContext } from '../../../context'
import { useUserForProfilePageQuery } from '../../../types'
import { defaultUser, userProfileAtom, userProfileLoadingAtom, useViewingOwnProfileAtomValue } from '../state'

/** Builds a stable key for the currently requested profile route target. */
export const getRequestedProfileKey = ({ userId, heroId }: { userId?: string; heroId?: string }) => {
  if (userId) {
    return `id:${userId}`
  }

  if (heroId) {
    return `hero:${heroId}`
  }

  return ''
}

/** Compares current profile atom data against the requested route identity with string-safe IDs. */
export const isMatchingRequestedProfile = ({
  heroId,
  userId,
  userProfile,
}: {
  userProfile?: { id?: string | number; heroId?: string }
  userId?: string
  heroId?: string
}) => {
  if (userId !== undefined && userProfile?.id !== undefined) {
    return String(userProfile.id) === String(userId)
  }

  if (heroId) {
    return userProfile?.heroId === heroId
  }

  return false
}

/** Determines whether a new route target requires resetting profile state and showing loading. */
export const shouldResetProfileState = ({
  shouldFetch,
  previousRequestedProfileKey,
  requestedProfileKey,
  userProfile,
  userId,
  heroId,
}: {
  shouldFetch: boolean
  previousRequestedProfileKey: string | null
  requestedProfileKey: string
  userProfile?: { id?: string | number; heroId?: string }
  userId?: string
  heroId?: string
}) => {
  if (!shouldFetch) {
    return false
  }

  if (previousRequestedProfileKey === requestedProfileKey) {
    return false
  }

  if (isMatchingRequestedProfile({ userProfile, userId, heroId })) {
    return false
  }

  return true
}

/** Loads and maintains profile state for user-id or hero-id route targets. */
export const useUserProfile = ({ userId, heroId }: { userId?: string; heroId?: string }) => {
  const toast = useNotification()

  const isViewingOwnProfile = useViewingOwnProfileAtomValue()
  const [userProfile, setUserProfile] = useAtom(userProfileAtom)

  const [isLoading, setIsLoading] = useAtom(userProfileLoadingAtom)
  const { user: currentAppUser } = useAuthContext()
  const shouldFetch = Boolean(userId || heroId)
  const requestedUserId = userId
  const requestedHeroId = heroId
  const requestedProfileKey = getRequestedProfileKey({ userId: requestedUserId, heroId: requestedHeroId })
  const previousRequestedProfileKeyRef = useRef<string | null>(null)
  const [hasShownError, setHasShownError] = useState(false)

  const whereVariable = userId ? { id: userId } : { heroId }

  useEffect(() => {
    if (!shouldFetch) {
      previousRequestedProfileKeyRef.current = null
      setIsLoading(false)
      return
    }

    const hasRequestChanged = previousRequestedProfileKeyRef.current !== requestedProfileKey

    if (!hasRequestChanged) {
      return
    }

    const shouldReset = shouldResetProfileState({
      shouldFetch,
      previousRequestedProfileKey: previousRequestedProfileKeyRef.current,
      requestedProfileKey,
      userProfile,
      userId: requestedUserId,
      heroId: requestedHeroId,
    })

    previousRequestedProfileKeyRef.current = requestedProfileKey

    if (!shouldReset) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setUserProfile(defaultUser)
  }, [requestedHeroId, requestedProfileKey, requestedUserId, setIsLoading, setUserProfile, shouldFetch, userProfile])

  useEffect(() => {
    setHasShownError(false)
  }, [requestedHeroId, requestedUserId])

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
