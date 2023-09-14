import { HStack, Checkbox } from '@chakra-ui/react'

import { useContributionSummary } from '../../../hooks/useContributionSummary'
import { H3 } from '../../../../../components/typography'

export const ShowContributionSummary = () => {
  const { isShown, toggle } = useContributionSummary()
  return (
    <HStack>
      <Checkbox isChecked={isShown} onChange={() => toggle()} />
      <H3>Show contribution summary</H3>
    </HStack>
  )
}
