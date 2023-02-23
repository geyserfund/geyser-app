import { useEffect, useState } from 'react'

import { ProjectRegionsGetResult } from '../../../../types'
import { FilterListItem } from './FilterListButton'

const MAX_REGION_INDEX_VIEW = 4

export const RenderRegions = ({
  regions,
  region,
  handleClick,
}: {
  regions: ProjectRegionsGetResult[]
  region: string
  handleClick: (_: string) => void
}) => {
  const [regionsToRender, setRegionsToRender] = useState<
    ProjectRegionsGetResult[]
  >([])

  useEffect(() => {
    if (regions.length > 0) {
      const selectedRegions = regions.filter((reg) => reg.region === region)

      let toBeRenderedRegions = regions.slice(0, MAX_REGION_INDEX_VIEW)

      selectedRegions.map((selectedRegion) => {
        if (
          !toBeRenderedRegions.some(
            (toBeRenderedRegion) =>
              toBeRenderedRegion.region === selectedRegion.region,
          )
        ) {
          toBeRenderedRegions = [selectedRegion, ...toBeRenderedRegions]
        }
      })
      setRegionsToRender(toBeRenderedRegions)
    }
  }, [regions, region])

  return (
    <>
      {regionsToRender.map((reg) => {
        const isActive = reg.region === region
        return (
          <FilterListItem
            key={reg.region}
            isActive={isActive}
            label={reg.region}
            value={reg.region}
            count={reg.count}
            handleClick={handleClick}
          />
        )
      })}
    </>
  )
}
