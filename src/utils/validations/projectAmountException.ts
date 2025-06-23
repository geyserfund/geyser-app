export const isProjectAnException = (name: string) => {
  return ['bitcoinizepos', 'spiritofsatoshi'].includes(name)
}

export const removeProjectAmountException = (name = '') => {
  return [
    'citadel',
    'dirtycointhecontroversybehindbitcoinmining',
    'allencodeproductionsfilmspackage',
    'forgingacountry',
    'nocontroldocumentary',
    'deathathletic',
    'runwithbitcoin',
    'btcisla',
    'makethefutureofhundredsofchildren',
  ].includes(name)
}
