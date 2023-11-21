import { atom, useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'

import { getAuthEndPoint } from '../../config/domain'

const canLoginAtom = atom(false)

export const useCanLogin = () => useAtomValue(canLoginAtom)

export const useAuthToken = () => {
  const [canLogin, setCanLogin] = useAtom(canLoginAtom)

  const authServiceEndpoint = getAuthEndPoint()

  useEffect(() => {
    const initalizeLogin = async () => {
      if (!authServiceEndpoint || !setCanLogin || canLogin) return

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
  }, [authServiceEndpoint, setCanLogin, canLogin])
}
