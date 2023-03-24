export const signMessage = async (secret: string) => {
  if (window.nostr) {
    const sig = await window.nostr.signSchnorr(secret)
    return sig
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
