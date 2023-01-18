export const isSecp256k1Compressed = (pubkey: string) => {
  const regex = /^([a-z0-9]){66}$/g;
  const match = pubkey.match(regex);

  return Array.isArray(match);
};
