import { WalletConnectionForm } from '@/shared/molecules/forms/WalletConnectionForm.tsx'

import {
  ConnectionOption,
  LightingWalletForm,
  Limits,
} from '../pages/projectCreation/hooks/useWalletForm'

type Props = {
  readOnly?: boolean
  connectionOption: ConnectionOption
  lightningAddress: LightingWalletForm
  setConnectionOption: (connectionOption: ConnectionOption) => void
  limits: Limits
  removeSponsors?: boolean
}

export const ProjectCreationWalletConnectionForm = ({
  readOnly,
  connectionOption,
  lightningAddress,
  setConnectionOption,
  limits,
  removeSponsors,
}: Props) => {
  return (
    <WalletConnectionForm
      readOnly={readOnly}
      connectionOption={connectionOption}
      lightningAddress={lightningAddress}
      setConnectionOption={setConnectionOption}
      limits={limits}
      removeSponsors={removeSponsors}
    />
  )
}
