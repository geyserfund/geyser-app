import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { FilterState } from '../../../hooks/state'

interface FilterByStatusProps extends CardLayoutProps, FilterState {}

export const FilterByStatus = ({
  filters,
  updateFilter,
  ...rest
}: FilterByStatusProps) => {
  return (
    <CardLayout
      width="100%"
      direction="column"
      padding="15px"
      spacing="10px"
      {...rest}
    ></CardLayout>
  )
}
