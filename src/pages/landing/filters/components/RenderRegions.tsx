import { useEffect, useState } from 'react'

import { ProjectRegionsGetResult } from '../../../../types'
import { FilterListItem } from './FilterListButton'

export const RenderRegions = ({
  max,
  regions,
  region,
  handleClick,
}: {
  max?: number
  regions: ProjectRegionsGetResult[]
  region?: string
  handleClick: (_: string) => void
}) => {
  const [regionsToRender, setRegionsToRender] = useState<
    ProjectRegionsGetResult[]
  >([])

  useEffect(() => {
    if (regions.length > 0) {
      const usedRegions = regions.filter((reg) => reg.count > 0)

      if (max) {
        const selectedRegions = regions.filter((reg) => reg.region === region)

        let toBeRenderedRegions = usedRegions.slice(0, max)

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
      } else {
        setRegionsToRender(usedRegions)
      }
    }
  }, [regions, region, max])

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
