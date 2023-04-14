import 'websocket-polyfill'

import { useMutation } from '@apollo/client'
import { getEventHash, Relay, relayInit } from 'nostr-tools'
import { Event } from 'nostr-tools'
import { useEffect, useState } from 'react'

import { VITE_APP_GEYSER_NOSTR_PUBKEY } from '../constants'
import { MUTATION_USER_BADGE_AWARD } from '../graphql/mutations'
import { MutationUserBadgeAwardArgs, UserBadge } from '../types'
import { useNotification } from '../utils'
import { signEvent } from '../utils/nostr/nip07'

const relayUri = 'wss://relay.damus.io'

export type ClaimABadgeProps = {
  userBadgeId: number
  badgeId: string
  badgeAwardId: string
  onFail?: any
  isClaiming?: (claiming: boolean) => void
}

export const useNostrBadges = (pubKey: string) => {
  const { toast } = useNotification()

  const [relay, setRelay] = useState<Relay>()
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(true)
  const [badgeIds, setBadgeIds] = useState<string[]>([])

  const [awardBadge] = useMutation<
    { userBadgeAward: UserBadge },
    MutationUserBadgeAwardArgs
  >(MUTATION_USER_BADGE_AWARD)

  // NOTE: these are for when  we do have to fetch badges data from nostr
  // const [badges, setBadges] = useState<NostrBadges[]>([])

  // const handleFetchBadges = async (badgeIds: string[]) => {
  //   const badgeFilter = {} as Filter

  //   badgeFilter.kinds = [30009]
  //   badgeFilter.authors = [VITE_APP_GEYSER_NOSTR_PUBKEY]
  //   badgeFilter['#d'] = badgeIds

  //   const events = await relay?.list([badgeFilter])

  //   if (events) {
  //     const parsedBadges = parseBadgesFromDefinitionEvent(events)
  //     setBadges(parsedBadges)
  //   }

  //   setLoading(false)
  // }

  useEffect(() => {
    const handleEventsInit = async () => {
      const relayInstance = relayInit(relayUri)
      relayInstance.on('connect', async () => {
        setRelay(relayInstance)
        const event = await relayInstance.get({
          kinds: [30008],
          authors: [pubKey],
        })
        const parsedBadges = event ? parseBadgesFromProfileEvents(event) : []
        setBadgeIds(parsedBadges)

        setLoading(false)
      })
      relayInstance.on('error', () => {
        setLoading(false)
      })
      await relayInstance.connect()
    }

    handleEventsInit()
  }, [pubKey])

  const handleErrorToast = () => {
    toast({
      status: 'error',
      title: 'failed to claim the badge',
      description: 'Please try again later.',
    })
  }

  const claimABadge = async ({
    userBadgeId,
    badgeId,
    badgeAwardId,
    onFail,
    isClaiming,
  }: ClaimABadgeProps) => {
    if (relay) {
      setClaiming(true)
      isClaiming?.(true)

      let badgeAwardEventId = badgeAwardId
      if (!badgeAwardId) {
        try {
          const result = await awardBadge({ variables: { userBadgeId } })
          badgeAwardEventId =
            result.data?.userBadgeAward.badgeAwardEventId || ''
          if (!badgeAwardEventId) {
            handleErrorToast()
            return
          }
        } catch (error) {
          handleErrorToast()
          setClaiming(false)
          isClaiming?.(false)
          return
        }
      }

      const event = await relay.get({
        kinds: [30008],
        authors: [pubKey],
      })

      const eventToPublish = {
        kind: 30008,
        pubkey: pubKey,
        // eslint-disable-next-line camelcase
        created_at: Math.floor(Date.now() / 1000),
        tags: [['d', 'profile_badges']],
        content: '',
      } as any
      const badgeToAdd = [
        ['a', `30009:${VITE_APP_GEYSER_NOSTR_PUBKEY}:${badgeId}`],
        ['e', badgeAwardEventId],
      ]
      if (!event) {
        eventToPublish.tags = [['d', 'profile_badges'], ...badgeToAdd]
      } else {
        eventToPublish.tags = [...event.tags, ...badgeToAdd]
      }

      eventToPublish.id = getEventHash(eventToPublish)
      eventToPublish.sig = await signEvent(eventToPublish) // this is where you sign with private key replaccing pubkey

      const pub = relay.publish(eventToPublish) // this is where you sign with private key replaccing pubkey

      pub.on('ok', () => {
        setClaiming(false)
        isClaiming?.(false)
        setBadgeIds([...badgeIds, badgeId])
        toast({
          status: 'success',
          title: 'Congratulations!',
          description: 'You claimed the Geyser badge on Nostr.',
        })
      })
      pub.on('failed', (reason: any) => {
        setClaiming(false)
        isClaiming?.(false)
        if (onFail) {
          onFail(reason)
        }
      })
    } else {
      handleErrorToast()
    }
  }

  return { badgeIds, claimABadge, loading, claiming }
}

const parseBadgesFromProfileEvents = (event: Event): string[] => {
  const badges: string[] = []

  event.tags.map((tag, index) => {
    if (tag[0] === 'a' && event.tags[index + 1][0] === 'e') {
      const authorPubKey = tag[1].split(':')[1]
      if (authorPubKey === VITE_APP_GEYSER_NOSTR_PUBKEY) {
        const id = tag[1].split(':')[2]
        badges.push(id)
      }
    }
  })
  return badges
}

// NOTE: for parsing badge dat from nostr badge definition event
// const parseBadgesFromDefinitionEvent = (events: Event[]): NostrBadges[] => {
//   const badges = [] as NostrBadges[]

//   events.map((event) => {
//     const badge = {} as NostrBadges
//     event.tags.map((tag) => {
//       if (tag[0] === 'd') {
//         badge.id = tag[1]
//       } else {
//         badge[tag[0] as keyof NostrBadges] = tag[1]
//       }
//     })

//     badges.push(badge)
//   })

//   return badges
// }

export type NostrBadges = {
  id: string
  name: string
  description: string
  image: string
  thumb: string
}
