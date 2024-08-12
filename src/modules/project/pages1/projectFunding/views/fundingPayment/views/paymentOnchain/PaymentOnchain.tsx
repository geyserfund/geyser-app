import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useFundingTxAtom } from '@/modules/project/funding/state'
import { getPath } from '@/shared/constants'

export const PaymentOnchain = () => {
  const navigate = useNavigate()

  const { project } = useFundingFormAtom()
  const { fundingTx } = useFundingTxAtom()

  useEffect(() => {
    if (fundingTx.address && project.name) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [fundingTx.address, project.name, navigate])

  return <Outlet />
}
