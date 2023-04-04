const LinkedToAnotherAccountReason =
  'is already linked to another Geyser account'

export const isAccountDuplicateError = (error: any) => {
  if (error && error.reason) {
    return `${error.reason}`.includes(LinkedToAnotherAccountReason)
  }

  return false
}
