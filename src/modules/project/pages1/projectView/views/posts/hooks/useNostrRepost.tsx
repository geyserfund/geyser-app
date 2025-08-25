import { t } from 'i18next'
import { useState } from 'react'

import { VITE_APP_GEYSER_NOSTR_PUBKEY } from '@/shared/constants'
import { useNotification } from '@/utils/tools/Notification.tsx'

export interface NostrEvent {
  id: string
  pubkey: string
  created_at: number
  kind: number
  tags: string[][]
  content: string
  sig: string
}

export interface UnsignedNostrEvent {
  pubkey: string
  created_at: number
  kind: number
  tags: string[][]
  content: string
  [key: string]: unknown
}

export interface NostrRepostOptions {
  /** Additional content to include with the repost */
  content?: string
  /** Original article author's nostr pubkey */
  projectNostrPubkey?: string
}

export const useNostrRepost = () => {
  const [isReposting, setIsReposting] = useState(false)
  const toast = useNotification()

  /** Creates and signs a repost event for a NIP-23 article using only the event ID */
  const createRepost = async (nostrEventId: string, options: NostrRepostOptions = {}): Promise<NostrEvent | null> => {
    if (!window.nostr) {
      toast.error({
        title: t('Repost failed'),
        description: t('Nostr extension not found. Please install a Nostr browser extension.'),
      })
      return null
    }

    setIsReposting(true)

    try {
      // Get the user's public key
      const pubkey = await window.nostr.getPublicKey()

      // Create the unsigned repost event
      const unsignedEvent: UnsignedNostrEvent = {
        pubkey,
        created_at: Math.floor(Date.now() / 1000),
        kind: 6, // Repost event kind
        tags: [
          ['e', nostrEventId], // Reference to the original event
          ['k', '30023'], // Kind of original event (NIP-23 article)
          ['client', 'geyser'], // Identify Geyser as the reposting client
          ['p', VITE_APP_GEYSER_NOSTR_PUBKEY], // Mention Geyser platform for association
          ...(options.projectNostrPubkey ? [['p', options.projectNostrPubkey]] : []), // Reference original author if available
        ],
        content: options.content || '', // Optional additional content
      }

      console.log('checking unsigned event', unsignedEvent)

      // Sign the event using the Nostr extension
      const signedEvent = (await window.nostr.signEvent(unsignedEvent)) as NostrEvent

      toast.success({
        title: t('Repost successful'),
        description: t('Article has been reposted successfully'),
      })

      return signedEvent
    } catch (error) {
      console.error('Failed to create repost:', error)

      toast.error({
        title: t('Repost failed'),
        description: t('Failed to sign the repost event. Please try again.'),
      })

      return null
    } finally {
      setIsReposting(false)
    }
  }

  return {
    createRepost,
    isReposting,
  }
}
