export {}

declare global {
  interface Window {
    nostr: {
      getPublicKey(): Promise<string>
      signEvent(p: {
        [x: string]: unknown
        content: string
      }): Promise<{ sig: string }>
      signSchnorr(s: string): Promise<string>
    }
  }
}
