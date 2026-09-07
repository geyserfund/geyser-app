import { HStack, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { isManagedCircularGrantProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { useResetFundingFlow } from '@/modules/project/funding/hooks/useResetFundingFlow.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'

import { useProjectAtom } from '../../hooks/useProjectAtom.ts'
import { useImpactFundFundingBootstrap } from './hooks/useImpactFundFundingBootstrap.ts'
import { useRecurringContributionRenewalBootstrap } from './hooks/useRecurringContributionRenewalBootstrap.ts'

export const ProjectFunding = () => {
  const { project } = useProjectAtom()
  const { isFundingDisabled } = useProjectToolkit(project)
  const resetFundingFlow = useResetFundingFlow()
  useUserAccountKeys()
  const { isRenewalBootstrapLoading } = useRecurringContributionRenewalBootstrap()
  const { isImpactFundFundingBootstrapLoading } = useImpactFundFundingBootstrap()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const managedCircularGrant = isManagedCircularGrantProject(project)
    const hasStripePaymentMethod = Boolean(project.paymentMethods?.fiat?.stripe)
    const hasDirectPaymentDetails = Boolean(
      project.directPaymentDetails?.btcAddress || project.directPaymentDetails?.lightningAddress,
    )
    const isStripeSelectedFromDirectPayment = new URLSearchParams(location.search).get('direct-payment-stripe') === '1'
    const shouldOpenDirectPayment =
      TEMPORARY_BOLTZ_CONTINGENCY_ENABLED &&
      !managedCircularGrant &&
      hasDirectPaymentDetails &&
      !isStripeSelectedFromDirectPayment

    if (
      project.id &&
      (isFundingDisabled() ||
        (TEMPORARY_BOLTZ_CONTINGENCY_ENABLED &&
          !managedCircularGrant &&
          (!hasStripePaymentMethod || shouldOpenDirectPayment)))
    ) {
      const projectPath = getPath('project', project.name)
      navigate(
        TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && !managedCircularGrant && hasDirectPaymentDetails
          ? `${projectPath}?direct-payment=1`
          : projectPath,
      )
    }
  }, [isFundingDisabled, location.search, navigate, project])

  useEffect(() => {
    return () => {
      resetFundingFlow()
    }
  }, [resetFundingFlow])

  if (isRenewalBootstrapLoading || isImpactFundFundingBootstrapLoading) {
    return (
      <HStack w="full" minH="240px" justifyContent="center" alignItems="center">
        <Spinner />
      </HStack>
    )
  }

  if (!project || !project.name) {
    return null
  }

  return (
    <>
      <Outlet />
    </>
  )
}
