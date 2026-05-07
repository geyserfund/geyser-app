import { HStack, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiSealCheckFill, PiSealQuestionFill } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'

import { DashboardTooltip as Tooltip } from './DashboardTooltip'

type IdentityVerifiedBadgeProps = {
  isVerified: boolean
  showLabel?: boolean
}

export function IdentityVerifiedBadge({ isVerified, showLabel = false }: IdentityVerifiedBadgeProps) {
  const label = isVerified ? t('Identity verified') : t('Identity not verified')
  const color = isVerified ? 'success.9' : 'neutral1.9'
  const IconComponent = isVerified ? PiSealCheckFill : PiSealQuestionFill

  return (
    <Tooltip content={label}>
      <HStack as="span" spacing={1} display="inline-flex" alignItems="center" verticalAlign="middle">
        <Icon as={IconComponent} color={color} boxSize="14px" aria-label={label} />
        {showLabel ? (
          <Body size="xs" color="neutral1.9">
            {label}
          </Body>
        ) : null}
      </HStack>
    </Tooltip>
  )
}
