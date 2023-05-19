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
  val2: Partial<T>,
  keys?: (keyof Partial<T>)[],
): boolean => {
  const loopVal =
    Object.keys(val1).length >= Object.keys(val2).length ? val1 : val2

  return (keys || (Object.keys(loopVal) as (keyof T)[])).some((key) => {
    if (val1[key] && val2[key] && typeof val1[key] === 'object') {
      return checkDiff(val1[key] as object, val2[key] as object)
    }

    return val1[key] !== val2[key]
  })
}

export const getDiff = <T extends {}>(
  val1: T,
  val2: Partial<T>,
  keys?: Partial<keyof T>[],
): [boolean, Partial<keyof T>[]] => {
  const loopVal =
    Object.keys(val1).length >= Object.keys(val2).length ? val1 : val2

  const diffKeys =
    (keys || (Object.keys(loopVal) as (keyof T)[])).filter((key) => {
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
