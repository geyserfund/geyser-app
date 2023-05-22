import { Buffer } from 'buffer'
import { getEventHash } from 'nostr-tools'
import { useState } from 'react'

import { AUTH_SERVICE_ENDPOINT } from '../constants'
import { useAuthContext } from '../context'
import { useMeLazyQuery } from '../types'
import { useNotification } from '../utils'
import { getPubkey, signEvent } from '../utils/nostr/nip07'

export const useNostrExtensonLogin = () => {
  const { toast } = useNotification()
  const { getAuthToken, login } = useAuthContext()
  const [error, setError] = useState<any>()

  const [queryCurrentUser] = useMeLazyQuery({
    fetchPolicy: 'network-only',
  })

  const connect = async () => {
    try {
      const token = await getAuthToken()

      if (!token) {
        throw new Error('Could not get auth token')
      }

      const pubkey = await getPubkey()

      const getAuthEvent = await fetch(`${AUTH_SERVICE_ENDPOINT}/nostr`, {
        credentials: 'include',
        redirect: 'follow',
      })

      const { event } = await getAuthEvent.json()

      event.pubkey = pubkey
      event.id = getEventHash(event)

      // @TODO: refactor the utils sign event to return entire event
      const signedEvent = await signEvent(event)
      const serialisedEvent = JSON.stringify(signedEvent)

      const nostrAuthToken = encodeURIComponent(
        Buffer.from(serialisedEvent).toString('base64'),
      ).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16))

      const response = await fetch(
        `${AUTH_SERVICE_ENDPOINT}/nostr?token=${nostrAuthToken}`,
        {
          credentials: 'include',
          redirect: 'follow',
        },
      )

      if (response.status >= 200 && response.status < 400) {
        const { data } = await queryCurrentUser()
        if (data && data.me) {
          login(data.me)
        }
      } else {
        const errorResponse = await response.json()
        setError(errorResponse)
        throwErrorToast(errorResponse?.reason)
      }
    } catch (e) {
      console.log('WTF', e)
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
