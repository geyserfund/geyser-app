import { Buffer } from 'buffer'
import { getEventHash } from 'nostr-tools'
import { useState } from 'react'

import { AUTH_SERVICE_ENDPOINT } from '../constants'
import { useAuthContext } from '../context'
import { useNotification } from '../utils'
import { getPubkey, signEvent } from '../utils/nostr/nip07'

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

      const getAuthEvent = await fetch(`${AUTH_SERVICE_ENDPOINT}/nostr`, {
        credentials: 'include',
        redirect: 'follow',
      })

      const { event } = await getAuthEvent.json()

      event.pubkey = pubkey
      event.id = getEventHash(event)

      // TODO: refactor the utils sign event to return entire event
      const signedEvent = await signEvent(event)
      const serialisedEvent = JSON.stringify(signedEvent)

      const nostrAuthToken = Buffer.from(
        encodeURIComponent(serialisedEvent).replace(
          /%([0-9A-F]{2})/g,
          (_, p1) => String.fromCharCode('0x' + p1),
        ),
      )
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')

      const response = await fetch(
        `${AUTH_SERVICE_ENDPOINT}/nostr?token=${nostrAuthToken}`,
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
