import { Project, ProjectReward, RewardCurrency } from '../types/generated/graphql'

export const defaultProjectReward: ProjectReward = {
  uuid: '',
  id: 0,
  name: '',
  description: '',
  shortDescription: '',
  cost: 0,
  images: [],
  deleted: false,
  stock: 0,
  sold: 0,
  hasShipping: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  project: {} as Project,
  category: '',
  rewardCurrency: RewardCurrency.Usdcent,
  isAddon: false,
  isHidden: false,
  preOrder: true,
  privateCommentPrompts: [],
}
