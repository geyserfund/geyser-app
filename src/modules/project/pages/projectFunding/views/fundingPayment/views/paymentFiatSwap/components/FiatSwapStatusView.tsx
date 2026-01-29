import { FiatSwapStatus } from '../atom/fiatSwapStatusAtom.ts'

type FiatSwapStatusViewProps = {
  status: FiatSwapStatus
  renderInitial: () => JSX.Element | null
  renderPending: () => JSX.Element | null
  renderProcessing: () => JSX.Element | null
  renderFailed: () => JSX.Element | null
}

/** FiatSwapStatusView: renders the correct fiat swap view for the current status */
export const FiatSwapStatusView = ({
  status,
  renderInitial,
  renderPending,
  renderProcessing,
  renderFailed,
}: FiatSwapStatusViewProps): JSX.Element | null => {
  if (status === FiatSwapStatus.initial) {
    return renderInitial()
  }

  if (status === FiatSwapStatus.pending) {
    return renderPending()
  }

  if (status === FiatSwapStatus.processing) {
    return renderProcessing()
  }

  if (status === FiatSwapStatus.failed) {
    return renderFailed()
  }

  return null
}
