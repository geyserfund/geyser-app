import { useState } from 'react'

import { AUTH_SERVICE_ENDPOINT } from '../constants'
import { useAuthContext } from '../context'
import { sha256, useNotification } from '../utils'
import { getPubkey, signMessage } from '../utils/nostr/nip07'

export const useNostrExtensonLogin = () => {
  const { toast } = useNotification()
  const { getAuthToken, queryCurrentUser } = useAuthContext()
  const [error, setError] = useState<any>()

  const connect = async () => {
    try {
      const token = await getAuthToken()

      if (!token) {
        throw new Error('Could not get auth token')
      }

      const pubkey = await getPubkey()

      const getSecret = await fetch(
        `${AUTH_SERVICE_ENDPOINT}/nostr?pubkey=${pubkey}`,
        {
          credentials: 'include',
          redirect: 'follow',
        },
      )

      const { k1 } = await getSecret.json()
      const hashedK1 = await sha256(k1)
      const sig = await signMessage(hashedK1)

      const response = await fetch(
        `${AUTH_SERVICE_ENDPOINT}/nostr?pubkey=${pubkey}&k1=${k1}&sig=${sig}`,
        {
          credentials: 'include',
          redirect: 'follow',
        },
      )

      if (response.status >= 200 && response.status < 400) {
        queryCurrentUser()
      } else {
        const errorResponse = await response.json()
        setError(errorResponse)
        throwErrorToast(errorResponse?.reason)
      }
    } catch (e) {
      setError(e)
      throwErrorToast()
    }
  }

  const throwErrorToast = (description?: string) => {
    toast({
      status: 'error',
      title: 'Something went wrong.',
      description: description || 'Please try again',
    })
  }

  const clearError = () => {
    setError(undefined)
  }

  return { connect, error, clearError }
}
