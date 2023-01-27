export const isTorV3Address = (address: string) => {
  const regex = /^([a-z3-7]){55}d\.onion$/g
  const match = address.match(regex)

  return Array.isArray(match)
}
