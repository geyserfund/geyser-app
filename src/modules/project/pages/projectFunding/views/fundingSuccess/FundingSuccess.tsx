import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { getPath } from '@/shared/constants'
import { ContributionStatus } from '@/types/index.ts'

import { FundingSuccessUI } from './views/FundingSuccessUI.tsx'

const StatusForSuccess = [ContributionStatus.Confirmed, ContributionStatus.Pledged]

export const FundingSuccess = () => {
  const { project } = useFundingFormAtom()

  const fundingContribution = useAtomValue(fundingContributionAtom)

  const navigate = useNavigate()

  useEffect(() => {
    if (!StatusForSuccess.includes(fundingContribution.status)) {
      navigate(getPath('projectFunding', project.name))
    }
  }, [fundingContribution, navigate, project.name])

  return <FundingSuccessUI isPending={false} />
}
