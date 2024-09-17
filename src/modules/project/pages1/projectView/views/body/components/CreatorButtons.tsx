import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiBag, PiFlagBannerFold, PiNewspaper } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useMobileMode } from '@/utils'

import { getPath } from '../../../../../../../shared/constants'
import { ProjectStatus } from '../../../../../../../types'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { useGoalsModal } from '../../../hooks'

export const CreatorButtons = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectAtom()
  const isMobile = useMobileMode()

  const { onGoalModalOpen } = useGoalsModal()

  if (!isProjectOwner || (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status)))
    return null

  return (
    <>
      <Button
        size={'lg'}
        as={Link}
        to={getPath('projectRewardCreate', project?.name)}
        flex={1}
        variant="outline"
        colorScheme="neutral1"
        leftIcon={<PiBag />}
      >
        {isMobile ? t('Reward') : t('Sell reward')}
      </Button>
      <Button
        size={'lg'}
        onClick={() => onGoalModalOpen()}
        flex={1}
        variant="outline"
        colorScheme="neutral1"
        leftIcon={<PiFlagBannerFold />}
      >
        {isMobile ? t('Goal') : t('Create goal')}
      </Button>
      <Button
        size={'lg'}
        as={Link}
        to={getPath('projectPostCreate', project?.name)}
        flex={1}
        variant="solid"
        colorScheme="primary1"
        leftIcon={<PiNewspaper />}
      >
        {isMobile ? t('Post') : t('Write post')}
      </Button>
    </>
  )
}
