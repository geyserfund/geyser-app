export type CheckKeyValueExistsType = 'any' | 'all'

export const checkKeyValueExists = (
  val: any,
  keys: string[],
  type: 'any' | 'all' = 'all',
) => {
  if (type === 'all') {
    let isValid = true
    keys.map((key) => {
      if (!val[key]) {
        isValid = false
      }
    })
    return isValid
  }

  let isValid = false
  keys.map((key) => {
    if (val[key]) {
      isValid = true
    }
  })
  return isValid
}

export const checkDiff = <T extends {}>(
  val1: T,
  val2: T,
  keys?: (keyof T)[],
): boolean => {
  return (keys || (Object.keys(val1) as (keyof T)[])).some((key) => {
    if (val1[key] && val2[key] && typeof val1[key] === 'object') {
      return checkDiff(val1[key] as object, val2[key] as object)
    }

    return val1[key] !== val2[key]
  })
}

export const getDiff = <T extends {}>(
  val1: T,
  val2: T,
  keys?: Partial<keyof T>[],
): [boolean, Partial<keyof T>[]] => {
  const diffKeys =
    (keys || (Object.keys(val1) as (keyof T)[])).filter((key) => {
      if (val1[key] && val2[key] && typeof val1[key] === 'object') {
        return checkDiff(val1[key] as object, val2[key] as object)
      }

      return val1[key] !== val2[key]
    }) || []

  if (diffKeys.length === 0) {
    return [false, []]
  }

  return [true, diffKeys]
}
