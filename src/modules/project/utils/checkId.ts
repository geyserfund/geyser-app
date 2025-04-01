/** Checks if a string contains only numerical values (0-9) */
export const isNumericString = (value?: string): boolean => {
  return value ? /^\d+$/.test(value) : false
}
