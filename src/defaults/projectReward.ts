import { Project, ProjectReward, RewardCurrency } from '../types/generated/graphql'

export const defaultProjectReward: ProjectReward = {
  uuid: '',
  id: 0,
  name: '',
  description: '',
  cost: 0,
  image: '',
  deleted: false,
  stock: 0,
  sold: 0,
  hasShipping: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  project: {} as Project,
  category: '',
  rewardCurrency: RewardCurrency.Usdcent,
  backersCount: 0,
  isAddon: false,
  isHidden: false,
  inDevelopment: true
}
