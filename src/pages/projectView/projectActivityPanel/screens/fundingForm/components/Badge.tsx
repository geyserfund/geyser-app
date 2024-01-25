import {
    CrownIcon,
    MedalIcon,
    StarIcon,
    TrophyIcon,
  } from '../../../../../../components/icons'

type Props = {
  donationAmountInDollars: number
}

export const Badge = ({ donationAmountInDollars }: Props) => {

  if(donationAmountInDollars < 10) {
    return null;
  }

  const renderBadge= () => {
    if(donationAmountInDollars >= 1000) {
        return <StarIcon />
    }
    else if(donationAmountInDollars >= 100) {
        return <CrownIcon />
    }
    else if(donationAmountInDollars >= 50) {
        return <TrophyIcon />
    }
    else if(donationAmountInDollars >= 10) {
        return <MedalIcon />
    }
    return null;
  }

  
  return (
    <>
        {renderBadge()}
    </>
  )
}
