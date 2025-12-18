import { t } from 'i18next'
import { getEventHash, nip19 } from 'nostr-tools'
import { useState } from 'react'

import { useAuthContext } from '@/context/auth.tsx'
import { ExternalAccountType } from '@/modules/auth/type.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
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

const fundingSuccessNostrTemplate =
  'Just zapped {{ContributionAmountSats}} sats into {{ProjectNostrTag}} on Geyser. 🚀 LFG! \nCheck it out! {{ProjectLink}}'

/** Hook for creating and posting Nostr events for funding success */
export const useNostrPostForFundingSuccess = () => {
  const [isPosting, setIsPosting] = useState(false)
  const toast = useNotification()
  const { projectOwner } = useProjectAtom()
  const { user } = useAuthContext()

  const creatorPubKey = projectOwner?.user.externalAccounts.find(
    (account) => account.accountType === ExternalAccountType.nostr,
  )?.externalId

  /** Creates and signs a Kind 1 note for funding success */
  const createPostEvent = async (
    projectName: string,
    projectHex: string,
    contributionAmountSats: number,
  ): Promise<NostrEvent | null> => {
    if (!window.nostr) {
      toast.error({
        title: t('Post failed'),
        description: t('Nostr extension not found. Please install a Nostr browser extension.'),
      })
      return null
    }

    setIsPosting(true)

    try {
      // Get the user's public key
      const pubkey = await window.nostr.getPublicKey()

      // Get project link
      const projectLink = `${window.location.origin}/project/${projectName}${
        user?.heroId ? `?heroId=${user?.heroId}` : ''
      }`

      // Convert hex keys to npub for display in template
      const projectNPubKey = nip19.npubEncode(projectHex)

      // Replace placeholders in the template
      const content = fundingSuccessNostrTemplate
        .replace('{{ContributionAmountSats}}', contributionAmountSats.toString())
        .replace('{{ProjectNostrTag}}', `nostr:${projectNPubKey}`)
        .replace('{{ProjectLink}}', projectLink)

      // Create the unsigned note event
      const unsignedEvent: UnsignedNostrEvent = {
        pubkey,
        created_at: Math.floor(Date.now() / 1000), // eslint-disable-line camelcase
        kind: 1, // Kind 1 for text note
        tags: [
          ['p', VITE_APP_GEYSER_NOSTR_PUBKEY], // Tag Geyser profile
          ['p', projectHex], // Tag project profile
          ...(creatorPubKey ? [['p', creatorPubKey]] : []), // Tag creator if available
          ['client', 'geyser'], // Identify Geyser as the posting client
          ['t', 'geyser'], // Add geyser hashtag
          ['t', 'crowdfunding'], // Add crowdfunding hashtag
          ['t', 'zap'], // Add zap hashtag for funding
        ],
        content,
      }

      // Calculate the event ID hash
      const eventWithId = { ...unsignedEvent, id: getEventHash(unsignedEvent) }

      // Sign the event using the Nostr extension
      const signedEvent = (await window.nostr.signEvent(eventWithId)) as NostrEvent

      return signedEvent
    } catch (error) {
      console.error('Failed to create funding success post:', error)

      toast.error({
        title: t('Post failed'),
        description: t('Failed to sign the post event. Please try again.'),
      })

      return null
    } finally {
      setIsPosting(false)
    }
  }

  return {
    createPostEvent,
    isPosting,
  }
}
