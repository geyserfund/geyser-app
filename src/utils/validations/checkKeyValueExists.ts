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
) => {
  let isDiff = false

  if (keys) {
    keys.map((key) => {
      if (val1[key] !== val2[key]) {
        isDiff = true
      }
    })
    return isDiff
  }

  Object.keys(val1)?.map((key1) => {
    if (val1[key1 as keyof T] !== val2[key1 as keyof T]) {
      isDiff = true
    }
  })
  return isDiff
}
