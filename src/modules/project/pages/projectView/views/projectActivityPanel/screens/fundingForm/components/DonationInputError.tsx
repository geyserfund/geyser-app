import { Caption } from '../../../../../../../../../components/typography'
import { useFundingContext } from '../../../../../../../context'

export const DonationInputError = () => {
  const {
    fundForm: { amountError, amountWarning },
  } = useFundingContext()

  if (amountError) return <Caption color="secondary.red">{amountError}</Caption>

  if (amountWarning) return <Caption color="secondary.neutral.500">{amountWarning}</Caption>
  return null
}
