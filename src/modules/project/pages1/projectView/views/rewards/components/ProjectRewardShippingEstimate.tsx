import { Badge, HStack, Icon } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PiInfo, PiPackage } from 'react-icons/pi'

import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { ProjectRewardFragment } from '@/types/index.ts'

interface Props {
  reward: ProjectRewardFragment
}

export const ProjectRewardShippingEstimate = ({ reward }: Props) => {
  const { t } = useTranslation()

  const country = useAtomValue(countriesAtom)

  const badgeRender = useMemo(() => {
    const list = []

    if (reward.preOrder === true) {
      if (reward.estimatedAvailabilityDate) {
        const dateOfDelivery = DateTime.fromMillis(reward.estimatedAvailabilityDate).toFormat('LLL, yyyy')

        list.push({
          text: `${t('Expected')}: ${dateOfDelivery}`,
          colorScheme: 'orange',
        })
      } else {
        list.push({
          text: t('Preorder'),
          colorScheme: 'orange',
        })
      }
    } else if (reward.estimatedDeliveryInWeeks) {
      list.push({
        text: `${t('Delivery in')} ${reward.estimatedDeliveryInWeeks} ${t('weeks')}`,
        colorScheme: 'info',
      })
    }

    if (reward.hasShipping) {
      if (reward.shippingConfig?.globalShipping) {
        list.push({
          icon: PiPackage,
          text: t('Ships worldwide'),
          colorScheme: 'gray',
        })
      } else if (reward.shippingConfig?.shippingRates?.length && reward.shippingConfig?.shippingRates?.length > 1) {
        list.push({
          text: t('Ships to select regions'),
          icon: PiPackage,
          info: `Ships only to: ${reward.shippingConfig?.shippingRates
            ?.map((rate) => country.find((c) => c.code === rate.country)?.name)
            .filter((val) => val)
            .join(', ')}`,
          colorScheme: 'gray',
        })
      }
    }

    return list
  }, [reward, t])

  if (badgeRender.length === 0) {
    return null
  }

  return (
    <HStack w="full" flexWrap={'wrap'}>
      {badgeRender.map((badge) => (
        <Badge as={HStack} spacing={1} key={badge.text} colorScheme={badge.colorScheme} variant={'surface'} size="sm">
          {badge.icon && <Icon as={badge.icon} fontSize="14px" />}
          <Body>{badge.text}</Body>

          {badge.info && (
            <TooltipPopover text={badge.info}>
              <HStack alignItems={'center'} as="span">
                <Icon as={PiInfo} fontSize="14px" />
              </HStack>
            </TooltipPopover>
          )}
        </Badge>
      ))}
    </HStack>
  )
}
