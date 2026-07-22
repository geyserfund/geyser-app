import { useImpactFundApplicationsQuery, useImpactFundQuery } from '@/types'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { getEligibleImpactFund } from '../../impactFundEligibility.ts'

export const useImpactFundEligibility = () => {
  const { project } = useProjectAtom()

  const eligibleImpactFund = getEligibleImpactFund({
    region: project?.location?.region,
    subCategory: project?.subCategory,
  })

  const { data: fundData } = useImpactFundQuery({
    skip: !eligibleImpactFund,
    variables: { input: { where: { name: eligibleImpactFund?.name ?? '' } } },
  })

  const fundId = fundData?.impactFund?.id
  const applicationsQueryOptions =
    fundId && project.id
      ? { variables: { input: { impactFundId: fundId, projectId: project.id } } }
      : { skip: true as const }

  const { data: applicationsData } = useImpactFundApplicationsQuery(applicationsQueryOptions)

  const hasExistingApplication = (applicationsData?.impactFundApplications?.totalCount ?? 0) > 0

  return {
    eligibleImpactFund: hasExistingApplication ? null : eligibleImpactFund,
  }
}
