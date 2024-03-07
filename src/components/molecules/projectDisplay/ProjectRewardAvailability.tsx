import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ProjectRewardForCreateUpdateFragment } from '../../../types'

type Props = {
  reward: ProjectRewardForCreateUpdateFragment
  isColored?: boolean
}

export const ProjectRewardAvailability = ({ reward, isColored }: Props) => {
  const { t } = useTranslation()

  if (!reward.maxClaimable) {
    return null
  }

  const numberOfRewardsAvailable = reward.maxClaimable - reward.sold

  if (numberOfRewardsAvailable <= 0) {
    return (
      <>
        <Box as={'span'} color={'neutral.600'} fontWeight={700}>
          {t('Sold Out')}
        </Box>{' '}
        <Box as={'span'} style={{ fontSize: '10px', position: 'relative', top: '-2px' }}>
          &#8226;
        </Box>{' '}
      </>
    )
  }

  return (
    <>
      <Box as={'span'} color={isColored ? 'secondary.orange' : 'neutral.900'}>
        {numberOfRewardsAvailable + ` ${t('remaining')}`}
      </Box>{' '}
      <Box as={'span'} style={{ fontSize: '10px', position: 'relative', top: '-2px' }}>
        &#8226;
      </Box>{' '}
    </>
  )
}
