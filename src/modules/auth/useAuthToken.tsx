import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

import { getAuthEndPoint } from '../../config/domain'

const AUTH_TOKEN_EXPIRATION_MINUTES = 5

const canLoginAtom = atom(false)

const refreshLoginAtom = atom(DateTime.now())

const refreshLoginTriggerAtom = atom(null, (get, set) => {
  set(canLoginAtom, false)
  set(refreshLoginAtom, DateTime.now().minus({ minutes: AUTH_TOKEN_EXPIRATION_MINUTES + 1 }))
})

export const useCanLogin = () => useAtomValue(canLoginAtom)

/* useAuthToken: Used inside a social login to get the latest auth-token */
export const useAuthToken = (isOpen?: boolean) => {
  const [canLogin, setCanLogin] = useAtom(canLoginAtom)

  const [refreshLogin, setRefreshLogin] = useAtom(refreshLoginAtom)

  const authServiceEndpoint = getAuthEndPoint()

  const refreshAuthToken = useSetAtom(refreshLoginTriggerAtom)

  useEffect(() => {
    if (isOpen) {
      refreshAuthToken()
    }
  }, [isOpen, refreshAuthToken])

  useEffect(() => {
    const initalizeLogin = async () => {
      if (!authServiceEndpoint || !setCanLogin || canLogin) return

      const diff = refreshLogin.diffNow().as('minutes')

      if (Math.abs(diff) < AUTH_TOKEN_EXPIRATION_MINUTES) {
        return
      }

      setRefreshLogin(DateTime.now())

      try {
        const response = await fetch(`${authServiceEndpoint}/auth-token`, {
          credentials: 'include',
          redirect: 'follow',
        })

        if (response.status >= 200 && response.status < 400) {
          setCanLogin(true)
        } else {
          setCanLogin(false)
        }
      } catch (err) {
        setCanLogin(false)
      }
    }

    initalizeLogin()
  }, [authServiceEndpoint, setCanLogin, canLogin, refreshLogin, setRefreshLogin])
}
