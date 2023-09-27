import { Select } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

import { InsightsOptions } from '../components'
import { useSelectionAtom } from '../insightsAtom'

export const InsightsOptionsSelect = () => {
  const [selectedOption, setSelectedOption] = useSelectionAtom()

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.currentTarget.value as InsightsOptions)
  }

  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleSelect}
      maxWidth="150px"
    >
      <option value={InsightsOptions.lastWeek}>
        {InsightsOptions.lastWeek}
      </option>
      <option value={InsightsOptions.lastMonth}>
        {InsightsOptions.lastMonth}
      </option>
      <option value={InsightsOptions.lastYear}>
        {InsightsOptions.lastYear}
      </option>
    </Select>
  )
}
