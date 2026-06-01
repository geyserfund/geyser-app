export const getMempoolSpaceUrl = (txId: string) => {
  return `https://mempool.space/tx/${txId}`
}

export const getRootstockBlockscoutUrl = (txId: string) => {
  return `https://rootstock.blockscout.com/tx/${txId}`
}
