import { Box, HStack, StackProps } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ContributionsIcon1 } from '@/components/icons/svg/ContributionsIcon1'
import { TrophyIcon } from '@/components/icons/svg/TrophyIcon'
import { Body } from '@/shared/components/typography'
import { GrantStatusEnum } from '@/types'

interface GrantStatusBadgeProps extends StackProps {
  icon: React.ReactNode
  bgColor: string
  label: string
  textColor?: string
}

export const GrantStatusBadge: React.FC<GrantStatusBadgeProps> = ({
  icon,
  bgColor,
  label,
  textColor,
  ...stackProps
}) => {
  return (
    <HStack
      bgColor={bgColor}
      borderRadius="8px"
      px={{ base: 0.5, lg: 3 }}
      py={0.5}
      spacing={{ base: 0.5, lg: 1 }}
      width={{ base: '79px', lg: '112px' }}
      justifyContent="center"
      {...stackProps}
    >
      <Box fontSize={{ base: '14px', lg: '18px' }}>{icon}</Box>
      <Body fontSize={{ base: '12px', lg: '14px' }} color={textColor} medium>
        {label}
      </Body>
    </HStack>
  )
}

export const GrantStatus = ({ status, startDate }: { status: GrantStatusEnum; startDate: number }) => {
  const { t } = useTranslation()

  if (startDate > Date.now()) {
    return <GrantStatusBadge icon={<ContributionsIcon1 />} bgColor="warning.9" label={t('Upcoming')} />
  }

  switch (status) {
    case GrantStatusEnum.Closed:
      return (
        <GrantStatusBadge
          icon={<TrophyIcon viewBox="0 1 18 18" color="white" />}
          bgColor="neutral1.9"
          textColor={'neutral1.1'}
          label={t('Awarded')}
        />
      )
    case GrantStatusEnum.FundingOpen:
      return <GrantStatusBadge icon={<ContributionsIcon1 />} bgColor="primary1.9" label={t('Open')} />
    default:
      return null
  }
}
