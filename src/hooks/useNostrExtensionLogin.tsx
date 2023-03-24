import { useLazyQuery } from '@apollo/client'

import { AUTH_SERVICE_ENDPOINT } from '../constants'
import { useAuthContext } from '../context'
import { ME } from '../graphql'
import { User } from '../types'
import { sha256, useNotification } from '../utils'
import { getPubkey, signMessage } from '../utils/nostr/nip07'
import { hasNostrAccount } from '../utils/validations/hasNostrAccount'

export const useNostrExtensonLogin = () => {
  const { toast } = useNotification()
  const { login, getAuthToken } = useAuthContext()

  const [queryCurrentUser] = useLazyQuery(ME, {
    onCompleted(data: { me: User }) {
      if (data && data.me) {
        const hasNostr = hasNostrAccount(data.me)

        if (hasNostr) {
          login(data.me)
        }
      }
    },
    fetchPolicy: 'network-only',
  })

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

      const sig = await sha256(await signMessage(k1))

      const sendSignature = await fetch(
        `${AUTH_SERVICE_ENDPOINT}/nostr?pubkey=${pubkey}&k1=${k1}&sig=${sig}`,
        {
          credentials: 'include',
          redirect: 'follow',
        },
      )

      const { user } = await sendSignature.json()

      if (!user) {
        throw new Error('Error creating user')
      }

      return queryCurrentUser()
    } catch (e) {
      toast({
        status: 'error',
        title: 'Something went wrong.',
        description: 'Please try again',
      })
    }
  }

  return { connect }
}
