import {
  ImpactFundApplicationFundingModel,
  ImpactFundApplicationStatus,
  ImpactFundDashboardApplicationsSort,
  ProjectFundingStrategy,
} from '@/types'

export const APPLICATIONS_PAGE_SIZE = 25

export const NOT_PROVIDED_PLACEHOLDER = '—'

export const applicationStatusLabels: Record<ImpactFundApplicationStatus, string> = {
  [ImpactFundApplicationStatus.Pending]: 'Pending',
  [ImpactFundApplicationStatus.Accepted]: 'Accepted',
  [ImpactFundApplicationStatus.Rejected]: 'Rejected',
  [ImpactFundApplicationStatus.Canceled]: 'Canceled',
  [ImpactFundApplicationStatus.Funded]: 'Funded',
  [ImpactFundApplicationStatus.Ongoing]: 'Ongoing',
  [ImpactFundApplicationStatus.InReview]: 'In Review',
  [ImpactFundApplicationStatus.InfoRequested]: 'Info Requested',
  [ImpactFundApplicationStatus.UnderEvaluation]: 'Under Evaluation',
  [ImpactFundApplicationStatus.Disbursement]: 'Disbursement',
}

type StatusColorScheme = 'primary1' | 'success' | 'warning' | 'info' | 'error' | 'neutral1'

export const applicationStatusColors: Record<ImpactFundApplicationStatus, StatusColorScheme> = {
  [ImpactFundApplicationStatus.Pending]: 'neutral1',
  [ImpactFundApplicationStatus.InReview]: 'info',
  [ImpactFundApplicationStatus.UnderEvaluation]: 'info',
  [ImpactFundApplicationStatus.InfoRequested]: 'warning',
  [ImpactFundApplicationStatus.Accepted]: 'success',
  [ImpactFundApplicationStatus.Disbursement]: 'primary1',
  [ImpactFundApplicationStatus.Funded]: 'success',
  [ImpactFundApplicationStatus.Ongoing]: 'success',
  [ImpactFundApplicationStatus.Rejected]: 'error',
  [ImpactFundApplicationStatus.Canceled]: 'neutral1',
}

export const fundingModelLabels: Record<ImpactFundApplicationFundingModel, string> = {
  [ImpactFundApplicationFundingModel.DirectGrant]: 'Direct Grant',
  [ImpactFundApplicationFundingModel.Matching]: 'Capped Matching',
  [ImpactFundApplicationFundingModel.AonCofunding]: 'All-or-Nothing Co-Funding',
}

export const fundingModelShortLabels: Record<ImpactFundApplicationFundingModel, string> = {
  [ImpactFundApplicationFundingModel.DirectGrant]: 'Direct',
  [ImpactFundApplicationFundingModel.Matching]: 'Matching',
  [ImpactFundApplicationFundingModel.AonCofunding]: 'AON',
}

export const projectFundingStrategyLabels: Record<ProjectFundingStrategy, string> = {
  [ProjectFundingStrategy.AllOrNothing]: 'All-or-Nothing',
  [ProjectFundingStrategy.TakeItAll]: 'Open Funding',
}

export const sortLabels: Record<ImpactFundDashboardApplicationsSort, string> = {
  [ImpactFundDashboardApplicationsSort.Latest]: 'Newest first',
  [ImpactFundDashboardApplicationsSort.Oldest]: 'Oldest first',
  [ImpactFundDashboardApplicationsSort.AmountAwardedDesc]: 'Highest awarded',
  [ImpactFundDashboardApplicationsSort.AmountAwardedAsc]: 'Lowest awarded',
  [ImpactFundDashboardApplicationsSort.StatusAsc]: 'Status A → Z',
  [ImpactFundDashboardApplicationsSort.StatusDesc]: 'Status Z → A',
}

export const statusOptions = Object.values(ImpactFundApplicationStatus)
export const fundingModelOptions = Object.values(ImpactFundApplicationFundingModel)

/**
 * Statuses that are "open" and need moderator attention. Used by the
 * "Needs review" quick-filter and the "in review" KPI tile.
 */
export const reviewableStatuses: ImpactFundApplicationStatus[] = [
  ImpactFundApplicationStatus.Pending,
  ImpactFundApplicationStatus.InReview,
  ImpactFundApplicationStatus.UnderEvaluation,
  ImpactFundApplicationStatus.InfoRequested,
]

/**
 * Statuses that represent an active disbursement / funded state.
 */
export const fundedStatuses: ImpactFundApplicationStatus[] = [
  ImpactFundApplicationStatus.Accepted,
  ImpactFundApplicationStatus.Disbursement,
  ImpactFundApplicationStatus.Funded,
  ImpactFundApplicationStatus.Ongoing,
]
