export const extractValuesFromError = (str: string) => {
  const lockedMatch = str.match(/locked\s+(\d+)/)
  const expectedMatch = str.match(/expected\s+(\d+)/)

  let lockedValue = 0
  let expectedValue = 0

  if (lockedMatch && lockedMatch[1] && expectedMatch && expectedMatch[1]) {
    lockedValue = lockedMatch && lockedMatch[1] ? parseInt(lockedMatch[1], 10) : 0
    expectedValue = expectedMatch && expectedMatch[1] ? parseInt(expectedMatch[1], 10) : 0
  }

  return {
    locked: lockedValue,
    expected: expectedValue,
  }
}
