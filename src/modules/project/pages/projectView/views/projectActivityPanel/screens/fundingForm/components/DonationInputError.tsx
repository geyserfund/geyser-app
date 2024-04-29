import { Caption } from '../../../../../../../../../components/typography'
import { useFundingContext } from '../../../../../../../context'

export const DonationInputError = () => {
  const {
    fundForm: { amountError, amountWarning },
  } = useFundingContext()

  if (amountError)
    return (
      <Caption fontSize="12px" color="secondary.red">
        {amountError}
      </Caption>
    )

  if (amountWarning)
    return (
      <Caption fontSize="12px" color="secondary.neutral.500">
        {amountWarning}
      </Caption>
    )
  return null
}
