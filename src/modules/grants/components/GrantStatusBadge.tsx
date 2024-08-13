import { HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ContributionsIcon1 } from '@/components/icons/svg/ContributionsIcon1'
import { TrophyIcon } from '@/components/icons/svg/TrophyIcon'
import { Body } from '@/shared/components/typography'
import { GrantStatusEnum } from '@/types'

export const GrantStatusBadge = ({ status, startDate }: { status: GrantStatusEnum; startDate: number }) => {
  const { t } = useTranslation()

  if (startDate > Date.now()) {
    return (
      <HStack bgColor="warning.9" borderRadius="8px" px={3} py={0.5} spacing={1}>
        <ContributionsIcon1 />
        <Body fontSize="14px" medium>
          {t('Upcoming')}
        </Body>
      </HStack>
    )
  }

  switch (status) {
    case GrantStatusEnum.Closed:
      return (
        <HStack bgColor="neutral1.9" borderRadius="8px" px={3} py={0.5} spacing={1}>
          <TrophyIcon color="neutral1.1" />
          <Body color="neutral1.1" fontSize="14px" medium>
            {t('Awarded')}
          </Body>
        </HStack>
      )
    case GrantStatusEnum.FundingOpen:
      return (
        <HStack bgColor="primary1.9" borderRadius="8px" px={3} py={0.5} spacing={1}>
          <ContributionsIcon1 />
          <Body fontSize="14px" medium>
            Open
          </Body>
        </HStack>
      )

    default:
      return null
  }
}
