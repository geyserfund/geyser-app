import { CrownIcon, MedalIcon, StarIcon, TrophyIcon } from '../../../../../../components/icons'

type Props = {
  donationAmountInDollars: number
}

export const Badge = ({ donationAmountInDollars }: Props) => {
  if (donationAmountInDollars < 10) {
    return null
  }

  const renderBadge = () => {
    if (donationAmountInDollars >= 1000) {
      return <StarIcon />
    }

    if (donationAmountInDollars >= 100) {
      return <CrownIcon />
    }

    if (donationAmountInDollars >= 50) {
      return <TrophyIcon />
    }

    if (donationAmountInDollars >= 10) {
      return <MedalIcon />
    }

    return null
  }

  return <>{renderBadge()}</>
}
