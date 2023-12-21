import { Box, Link, Stack, Text } from '@chakra-ui/react'
import { ProjectRewardPanel } from '../../../projectMainBody/components'
import { useTranslation } from 'react-i18next'
import { MobileViews, useProjectContext } from '../../../../../context'
import { PathName } from '../../../../../constants'
import { useNavigate } from 'react-router-dom'

export const InfoScreenRewards = () => {

  const { t } = useTranslation()
  const { setMobileView, project } = useProjectContext()
  const navigate = useNavigate()

  const handleAllRewardsButtonClick = () => {
    setMobileView(MobileViews.rewards)
    navigate(PathName.projectRewards)
  }

  if(!project || !project.rewards || project.rewards.length == 0) {
    return null;
  }

  return (
    <Box
      style={{marginTop: '20px', width: '100%'}}
    >
      <Stack direction='row' justify='space-between'>
        <Stack direction='row'>
          <Text fontWeight={500} fontSize={18} color='neutral.900' lineHeight={1}>{t('Rewards')}</Text>
          <Text
            fontSize='12px'
            backgroundColor='neutral.100'
            padding='0 5px'
            borderRadius='4px'
          >
            <b>{project.rewards.length}</b>
          </Text>
        </Stack>
        <Text fontWeight={500} onClick={handleAllRewardsButtonClick}><Link>{t('See all rewards')}</Link></Text>
      </Stack>
      {project.rewards.map((reward) => (
        <ProjectRewardPanel key={reward.id} reward={reward} showDetails={true} />
      ))}
    </Box>
  )
}