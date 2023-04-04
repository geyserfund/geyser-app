import { LightningAddressConnectionDetails, User } from '../../types'

export const getLightningAddressFromUser = (user?: User) => {
  const connectionDetails = (
    user?.wallet?.connectionDetails.__typename ===
    'LightningAddressConnectionDetails'
      ? user.wallet?.connectionDetails
      : {}
  ) as LightningAddressConnectionDetails
  return connectionDetails.lightningAddress || ''
}
