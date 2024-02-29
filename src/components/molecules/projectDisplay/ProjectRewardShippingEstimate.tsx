import { useTranslation } from 'react-i18next'
import { ProjectReward, ProjectRewardForCreateUpdateFragment } from '../../../types'

type Props = {
  reward: ProjectRewardForCreateUpdateFragment | ProjectReward
}

export const ProjectRewardShippingEstimate = ({ reward }: Props) => {
  const { t } = useTranslation()

  const dateOfDelivery = new Date(reward.estimatedAvailabilityDate).toLocaleString('en-us',{month:'short', year:'numeric'});

  if (reward.preOrder === true && !reward.estimatedAvailabilityDate) {
    return <>{t('Pre-order')}</>
  }

  if (reward.preOrder === false && !reward.estimatedDeliveryInWeeks) {
    // Add icon
    return <>{t('Reward is Ready')}</>
  }

  if(reward.preOrder === true && reward.estimatedAvailabilityDate) {
    return <>{t('Pre-order by')}: {dateOfDelivery}</>
  }

  if(reward.preOrder === false && reward.estimatedDeliveryInWeeks) {
    return <>{t('Delivery in')}: {reward.estimatedDeliveryInWeeks} {t('weeks')}</>
  }

  return <></>
}
