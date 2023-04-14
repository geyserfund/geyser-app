import { Project, ProjectReward } from '../types/generated/graphql'

export const defaultProjectReward: ProjectReward = {
  id: 0,
  name: '',
  description: '',
  cost: 0,
  image: '',
  deleted: false,
  stock: 0,
  sold: 0,
  project: {} as Project,
}
