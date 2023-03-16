import { GrantStatusEnum } from '../../types'

export const CONTRIBUTION_ADDRESS = 'grants@geyser.fund'

export const GRANTS_PROJECT_NAME = 'grants'

export const GRANT_STATUS_MAP: Record<GrantStatusEnum, string> = {
  [GrantStatusEnum.ApplicationsOpen]: 'Applications Open',
  [GrantStatusEnum.Closed]: 'Closed',
  [GrantStatusEnum.FundingOpen]: 'Active',
}
