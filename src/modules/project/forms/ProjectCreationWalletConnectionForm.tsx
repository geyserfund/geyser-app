import { WalletConnectionForm } from '@/shared/molecules/forms/WalletConnectionForm.tsx'

import {
  ConnectionOption,
  LightingWalletForm,
  Limits,
  NWCWalletForm,
} from '../pages/projectCreation/hooks/useWalletForm'

type Props = {
  readOnly?: boolean
  connectionOption: ConnectionOption
  lightningAddress: LightingWalletForm
  nwc: NWCWalletForm
  setConnectionOption: (connectionOption: ConnectionOption) => void
  limits: Limits
  removeSponsors?: boolean
}

export const ProjectCreationWalletConnectionForm = ({
  readOnly,
  connectionOption,
  lightningAddress,
  nwc,
  setConnectionOption,
  limits,
  removeSponsors,
}: Props) => {
  return (
    <WalletConnectionForm
      readOnly={readOnly}
      connectionOption={connectionOption}
      lightningAddress={lightningAddress}
      nwc={nwc}
      setConnectionOption={setConnectionOption}
      limits={limits}
      removeSponsors={removeSponsors}
    />
  )
}
