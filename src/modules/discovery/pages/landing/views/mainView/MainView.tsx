import { useFilterContext } from '@/context/filter.tsx'
import { checkIfRenderFilter } from '@/utils/helpers/filterHelpers.ts'

import { DefaultView } from './defaultView/DefaultView.tsx'
import { PaginatedView } from './paginatedView/PaginatedView.tsx'

export const MainView = () => {
  const { filters } = useFilterContext()

  if (checkIfRenderFilter(filters)) {
    return <PaginatedView />
  }

  return <DefaultView />
}
