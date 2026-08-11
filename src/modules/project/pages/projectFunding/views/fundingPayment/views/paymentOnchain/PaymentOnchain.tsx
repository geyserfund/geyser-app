import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { getPath } from '@/shared/constants'

export const PaymentOnchain = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { project } = useFundingFormAtom()
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)

  useEffect(() => {
    if (!project.name) return

    const managedOnChainAddress = fundingPaymentDetails.strikeOnChain?.address || fundingPaymentDetails.strike?.address
    const managedLightningRequest =
      fundingPaymentDetails.strikeLightning?.paymentRequest || fundingPaymentDetails.strike?.paymentRequest

    if (managedLightningRequest && !managedOnChainAddress) {
      navigate(
        { pathname: getPath('fundingPaymentLightning', project.name), search: location.search },
        { replace: true },
      )
      return
    }

    if (!(managedOnChainAddress || fundingPaymentDetails.onChainToRskSwap?.address)) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [
    fundingPaymentDetails.onChainToRskSwap?.address,
    fundingPaymentDetails.strike?.address,
    fundingPaymentDetails.strike?.paymentRequest,
    fundingPaymentDetails.strikeLightning?.paymentRequest,
    fundingPaymentDetails.strikeOnChain?.address,
    location.search,
    project.name,
    navigate,
  ])

  return <Outlet />
}
