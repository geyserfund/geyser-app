import { Badge, Box, Link, Stack, Text } from '@chakra-ui/react'
import { ProjectRewardPanel } from '../../../projectMainBody/components'
import { useTranslation } from 'react-i18next'
import { MobileViews, useProjectContext } from '../../../../../context'
import { PathName } from '../../../../../constants'
import { useNavigate } from 'react-router-dom'
import { ProjectFundersModal, useProjectFundersModal } from './components'
import { InfoScreenFeed } from './InfoScreenFeed'

export const InfoScreenRewards = () => {

  const { t } = useTranslation()
  const { setMobileView, project } = useProjectContext()
  const navigate = useNavigate()

  const handleAllRewardsButtonClick = () => {
    setMobileView(MobileViews.rewards)
    navigate(PathName.projectRewards)
  }

  if(!project) {
    return null;
  }

  const activeProjectRewards = project.rewards.filter(reward => reward.isHidden === false);
  if(activeProjectRewards.length == 0) {
    return <InfoScreenFeed />
  }

  return (
    <Box
      style={{width: '100%'}}
    >
      <Stack direction='row' justify='space-between' alignItems={'center'}>
        <Stack direction='row' alignItems={'center'}>
          <Text fontWeight={500} fontSize={18} color='neutral.900' lineHeight={1}>{t('Rewards')}</Text>
          <Badge>
            {activeProjectRewards.length}
          </Badge>
        </Stack>
        <Text fontWeight={500} onClick={handleAllRewardsButtonClick}><Link fontSize={'16px'} color={'neutral.600'} textDecoration={'none'}>{t('See all rewards')}</Link></Text>
      </Stack>
      {activeProjectRewards.map((reward) => (
        <ProjectRewardPanel key={reward.id} reward={reward} />
      ))}
    </Box>
  )
}