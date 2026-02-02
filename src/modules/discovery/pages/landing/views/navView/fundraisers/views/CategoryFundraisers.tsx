import { ProjectFundingStrategy } from '@/types/index.ts'

import { PaginatedView } from '../../../mainView/paginatedView/PaginatedView.tsx'

export const CategoryFundraisers = () => {
  return <PaginatedView noTitle fundingStrategy={ProjectFundingStrategy.TakeItAll} />
}
