export const signMessage = async (secret: string) => {
  if (window.nostr) {
    try {
      const sig = await window.nostr.signSchnorr(secret)
      return sig
    } catch (error) {}
  }

  throw new Error('No nostr extension available')
}

export const getPubkey = async () => {
  if (window.nostr) {
    const pubkey = await window.nostr.getPublicKey()
    return pubkey
  }

  throw new Error('No nostr extension available')
}

export const signEvent = async (event: {
  [x: string]: unknown
  content: string
}) => {
  if (window.nostr) {
    try {
      const { sig } = await window.nostr.signEvent(event)
      return sig
    } catch (error) {}
  }

  throw new Error('No nostr extension available')
}
