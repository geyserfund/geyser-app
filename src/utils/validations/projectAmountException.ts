export const isProjectAnException = (name: string) => {
  return ['bitcoinizepos', 'spiritofsatoshi'].includes(name)
}

export const removeProjectAmountException = (name = '') => {
  return ['citadel'].includes(name)
}
