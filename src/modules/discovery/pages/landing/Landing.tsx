import { useFilterContext } from '@/context/filter'
import { checkIfRenderFilter } from '@/utils/helpers'

import { DefaultView } from './views/defaultView/DefaultView'
import { PaginatedView } from './views/paginatedView/PaginatedView'

export const Landing = () => {
  const { filters } = useFilterContext()

  if (checkIfRenderFilter(filters)) {
    return <PaginatedView />
  }

  return <DefaultView />
}
