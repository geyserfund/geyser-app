import { ImageProps } from '@chakra-ui/react'

import { CrownIcon, MedalIcon, StarIcon, TrophyIcon } from '../../../../../components/icons'

type Props = {
  donationAmountInDollars: number
} & ImageProps

export const Badge = ({ donationAmountInDollars, ...props }: Props) => {
  if (donationAmountInDollars < 10) {
    return null
  }

  const renderBadge = () => {
    if (donationAmountInDollars >= 1000) {
      return <StarIcon {...props} />
    }

    if (donationAmountInDollars >= 100) {
      return <CrownIcon {...props} />
    }

    if (donationAmountInDollars >= 50) {
      return <TrophyIcon {...props} />
    }

    if (donationAmountInDollars >= 10) {
      return <MedalIcon {...props} />
    }

    return null
  }

  return <>{renderBadge()}</>
}
