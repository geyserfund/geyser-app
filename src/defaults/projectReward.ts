import { Project, ProjectReward } from '../types/generated/graphql'
let estimatedDeliveryDate = new Date();
estimatedDeliveryDate.setMonth(estimatedDeliveryDate.getMonth() + 6);

export const defaultProjectReward: ProjectReward = {
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
  estimatedDeliveryDate: '',
  maxClaimable: 0,
  published: false
}
