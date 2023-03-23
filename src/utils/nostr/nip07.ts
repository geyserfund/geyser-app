/* eslint-disable camelcase */
export const signMessage = async (content: string) => {
  if (window.nostr) {
    const pubkey = await window.nostr.getPublicKey()
    const event = await window.nostr.signEvent({
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content,
      pubkey,
    })

    return event.sig
  }

  throw new Error('No nostr extension available')
}
