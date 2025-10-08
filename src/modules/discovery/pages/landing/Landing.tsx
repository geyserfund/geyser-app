import { VStack } from '@chakra-ui/react'

import { useFilterContext } from '@/context/filter'
import { useMobileMode } from '@/utils'
import { checkIfRenderFilter } from '@/utils/helpers'

import { FilterComponent } from '../../filters/FilterComponent'
import { DefaultView } from './views/defaultView/DefaultView'
import { TitleBar } from './views/defaultView/sections/TitleBar.tsx'
import { PaginatedView } from './views/paginatedView/PaginatedView'

export const Landing = () => {
  const isMobileMode = useMobileMode()

  const { filters } = useFilterContext()

  const renderView = () => {
    if (checkIfRenderFilter(filters)) {
      return <PaginatedView />
    }

    return <DefaultView />
  }

  return (
    <VStack w="full" spacing={4}>
      <TitleBar />

      {isMobileMode && <FilterComponent />}
      {renderView()}
    </VStack>
  )
}
