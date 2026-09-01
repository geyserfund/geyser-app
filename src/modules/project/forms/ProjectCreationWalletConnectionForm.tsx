import { WalletConnectionForm } from '@/shared/molecules/forms/WalletConnectionForm.tsx'
import { LightingWalletForm, Limits } from '@/shared/types/wallet'

type Props = {
  readOnly?: boolean
  lightningAddress: LightingWalletForm
  limits: Limits
  removeSponsors?: boolean
}

export const ProjectCreationWalletConnectionForm = ({ readOnly, lightningAddress, limits, removeSponsors }: Props) => {
  return (
    <WalletConnectionForm
      readOnly={readOnly}
      lightningAddress={lightningAddress}
      limits={limits}
      removeSponsors={removeSponsors}
    />
  )
}
