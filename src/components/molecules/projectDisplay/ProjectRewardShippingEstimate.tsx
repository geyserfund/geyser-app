import { HStack, StackProps } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { BsStars } from 'react-icons/bs'

import { ProjectReward, ProjectRewardForCreateUpdateFragment } from '../../../types'
import { Caption } from '../../typography'

interface Props extends StackProps {
  reward: ProjectRewardForCreateUpdateFragment | ProjectReward
}

export const ProjectRewardShippingEstimate = ({ reward, ...rest }: Props) => {
  const { t } = useTranslation()

  const getTextToRender = () => {
    if (reward.preOrder === true && !reward.estimatedAvailabilityDate) {
      return <>{t('Pre-order now')}</>
    }

    if (reward.preOrder === false && !reward.estimatedDeliveryInWeeks) {
      return (
        <>
          <BsStars fontSize={'14px'} style={{ marginRight: '5px' }} />
          {t('Reward is ready for delivery')}
        </>
      )
    }

    if (reward.preOrder === true && reward.estimatedAvailabilityDate) {
      const dateOfDelivery = DateTime.fromMillis(reward.estimatedAvailabilityDate).toFormat('LLL, yyyy')

      return (
        <>
          {t('Pre-order now')} &#8226; {t('Available on')}: {dateOfDelivery}
        </>
      )
    }

    if (reward.preOrder === false && reward.estimatedDeliveryInWeeks) {
      return (
        <>
          <BsStars fontSize={'14px'} style={{ marginRight: '5px' }} />
          {t('Delivery in')}: {reward.estimatedDeliveryInWeeks} {t('weeks')}
        </>
      )
    }
  }

  return (
    <HStack p="5px 10px" backgroundColor="neutral.100" borderRadius={4} {...rest}>
      <Caption color="neutral.700" xBold display="inline-flex">
        {getTextToRender()}
      </Caption>
    </HStack>
  )
}
