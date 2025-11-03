import { WalletConnectionForm } from '@/shared/molecules/forms/WalletConnectionForm.tsx'
import { WalletResourceType } from '@/types'

import {
  ConnectionOption,
  LightingWalletForm,
  Limits,
  NodeWalletForm,
  NWCWalletForm,
  WalletForm,
} from '../pages/projectCreation/hooks/useWalletForm'

type Props = {
  readOnly?: boolean
  connectionOption: ConnectionOption
  lightningAddress: LightingWalletForm
  node: NodeWalletForm
  nwc: NWCWalletForm
  setConnectionOption: (connectionOption: ConnectionOption) => void
  fee: WalletForm['fee']
  limits: Limits
  removeSponsors?: boolean
}

export const ProjectCreationWalletConnectionForm = ({
  readOnly,
  connectionOption,
  lightningAddress,
  node,
  nwc,
  setConnectionOption,
  fee,
  limits,
  removeSponsors,
}: Props) => {
  return (
    <WalletConnectionForm
      readOnly={readOnly}
      connectionOption={connectionOption}
      lightningAddress={lightningAddress}
      node={node}
      nwc={nwc}
      setConnectionOption={setConnectionOption}
      fee={fee}
      limits={limits}
      resourceType={WalletResourceType.Project}
      removeSponsors={removeSponsors}
    />
  )
}
