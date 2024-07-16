import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiBag, PiFlagBannerFold, PiNewspaper } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../../../../constants'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { ProjectStatus } from '../../../../../../../types'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { useGoalsModal } from '../../../hooks'

export const CreatorTools = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectAtom()

  const { onGoalModalOpen } = useGoalsModal()

  if (!isProjectOwner || project.status !== ProjectStatus.Active) return null

  return (
    <CardLayout display={{ base: 'none', lg: 'flex' }} w="full" direction="row" backgroundColor="neutral.1" spacing={4}>
      <Button
        size="lg"
        as={Link}
        to={getPath('projectCreateReward', project?.name)}
        flex={1}
        variant="outline"
        colorScheme="neutral1"
        leftIcon={<PiBag />}
      >
        {t('Sell reward')}
      </Button>
      <Button
        size="lg"
        onClick={() => onGoalModalOpen()}
        flex={1}
        variant="outline"
        colorScheme="neutral1"
        leftIcon={<PiFlagBannerFold />}
      >
        {t('Create goal')}
      </Button>
      <Button
        size="lg"
        as={Link}
        to={getPath('projectEntryCreation', project?.name)}
        flex={1}
        variant="solid"
        colorScheme="primary1"
        leftIcon={<PiNewspaper />}
      >
        {t('Write post')}
      </Button>
    </CardLayout>
  )
}
