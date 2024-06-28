import { Badge } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ProjectReward, ProjectRewardForCreateUpdateFragment } from '../../../../../../../../../types'

interface Props {
  reward: ProjectRewardForCreateUpdateFragment | ProjectReward
}

export const ProjectRewardShippingEstimate = ({ reward }: Props) => {
  const { t } = useTranslation()

  const badgeRender = useMemo(() => {
    if (reward.preOrder === true) {
      if (reward.estimatedAvailabilityDate) {
        const dateOfDelivery = DateTime.fromMillis(reward.estimatedAvailabilityDate).toFormat('LLL, yyyy')

        return {
          text: `${t('Available on')} ${dateOfDelivery}`,
          colorScheme: 'orange',
        }
      }

      return {
        text: t('Preorder'),
        colorScheme: 'orange',
      }
    }

    if (reward.preOrder === false) {
      if (reward.estimatedDeliveryInWeeks) {
        return {
          text: `${t('Delivery in')} ${reward.estimatedDeliveryInWeeks} ${t('weeks')}`,
          colorScheme: 'info',
        }
      }

      return {
        text: t('Ready for delivery'),
        colorScheme: 'green',
      }
    }
  }, [reward, t])

  if (!badgeRender) {
    return null
  }

  return (
    <Badge variant="surface" colorScheme={badgeRender.colorScheme} size="sm" textTransform={'capitalize'}>
      {badgeRender.text}
    </Badge>
  )
}
