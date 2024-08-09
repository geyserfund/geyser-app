export const ws =
  typeof WebSocket !== 'undefined'
    ? WebSocket
    : typeof global !== 'undefined'
    ? global.WebSocket ||
      // @ts-expect-error: Support more browsers
      global.MozWebSocket
    : typeof window !== 'undefined'
    ? window.WebSocket ||
      // @ts-expect-error: Support more browsers
      window.MozWebSocket
    : undefined
