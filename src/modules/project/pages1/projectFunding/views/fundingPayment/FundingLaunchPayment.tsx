import { useBreakpointValue, VStack } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { launchContributionProjectIdAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { SkeletonLayout } from '@/shared/components/layouts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { derivedDimensions } from '@/shared/constants/index.ts'

import {
  PROJECT_LAUNCH_PAYMENT_PROJECT_NAME,
  ProjectLaunchStrategy,
} from '../../../projectCreation/views/ProjectCreationStrategy.tsx'
import { FundingLayout } from '../../layouts/FundingLayout.tsx'
import { QRCodeSizeMap } from './components/QRCodeComponent.tsx'

export const DONATION_AMOUNT_FOR_LAUNCH: Record<ProjectLaunchStrategy, number> = {
  [ProjectLaunchStrategy.STARTER_LAUNCH]: 2500, // $25 in cents
  [ProjectLaunchStrategy.GROWTH_LAUNCH]: 5000, // $50 in cents
  [ProjectLaunchStrategy.PRO_LAUNCH]: 35000, // $350 in cents
}

export const FundingLaunchPayment = () => {
  const { project, loading } = useProjectAtom()

  const navigate = useNavigate()

  const setLaunchContributionProjectId = useSetAtom(launchContributionProjectIdAtom)

  const location = useLocation()

  const { user } = useAuthContext()

  const { setState, formState } = useFundingFormAtom()

  const qrSize = useBreakpointValue(QRCodeSizeMap)

  const launchProjectId = location?.state?.launchProjectId
  const launchStrategy =
    (location?.state?.launchStrategy as ProjectLaunchStrategy) || ProjectLaunchStrategy.STARTER_LAUNCH

  const handleUpdateReward = useCallback(() => {
    if (loading) {
      return
    }

    if (formState.donationAmountUsdCent === DONATION_AMOUNT_FOR_LAUNCH[launchStrategy]) {
      return
    }

    setState('donationAmountUsdCent', DONATION_AMOUNT_FOR_LAUNCH[launchStrategy])
    setState('email', user.email)
    setState('geyserTipPercent', 0)
    setState(
      'privateComment',
      JSON.stringify({
        paidLaunch: true,
        projectId: launchProjectId,
        launchStrategy,
      }),
    )
    setState('geyserTipPercent', 0)
    setLaunchContributionProjectId(launchProjectId)
  }, [
    loading,
    formState.donationAmountUsdCent,
    setState,
    user.email,
    launchProjectId,
    setLaunchContributionProjectId,
    launchStrategy,
  ])

  useEffect(() => {
    handleUpdateReward()
  }, [handleUpdateReward])

  useEffect(() => {
    if (formState.donationAmountUsdCent === DONATION_AMOUNT_FOR_LAUNCH[launchStrategy]) {
      navigate(getPath('fundingStart', project.name), { replace: true })
    }
  }, [project.name, formState.donationAmountUsdCent, navigate, launchStrategy])

  useEffect(() => {
    if (project.name !== PROJECT_LAUNCH_PAYMENT_PROJECT_NAME) {
      navigate(getPath('projectFunding', project.name), { replace: true })
    }
  }, [project.name, navigate])

  return (
    <FundingLayout
      containerProps={{
        minHeight: derivedDimensions.heightAfterTopNavBar,
      }}
    >
      <CardLayout mobileDense flex={6} w="full" h="full">
        <VStack w="full" spacing={4}>
          <VStack w="full" alignItems="start">
            <SkeletonLayout height="26px" width="120px" />
            <SkeletonLayout height="44px" width="full" />
          </VStack>

          <SkeletonLayout height={qrSize} width={qrSize} />
          <SkeletonLayout height="26px" width="200px" />
          <VStack w="full" spacing={6} pt={4}>
            <SkeletonLayout height="26px" width="230px" />
            <SkeletonLayout height="40px" width="310px" />
          </VStack>
        </VStack>
      </CardLayout>
    </FundingLayout>
  )
}
