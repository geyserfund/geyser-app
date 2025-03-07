import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { getPath } from '@/shared/constants'

export const PaymentOnchain = () => {
  const navigate = useNavigate()

  const { project } = useFundingFormAtom()
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)

  useEffect(() => {
    if (!fundingPaymentDetails.onChainSwap?.address || !project.name) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [fundingPaymentDetails.onChainSwap?.address, project.name, navigate])

  return <Outlet />
}
