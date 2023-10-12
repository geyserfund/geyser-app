import { AddIcon } from '@chakra-ui/icons'
import { Button, HStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { H2 } from '../../../../../../components/typography'
import { getPath } from '../../../../../../constants'
import { useProjectContext } from '../../../../../../context'
import { useMobileMode } from '../../../../../../utils'
import { ShareProjectButton } from '../elements'

export const OverviewHeader = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { project, onRewardsModalOpen, onMilestonesModalOpen } =
    useProjectContext()

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <HStack justifyContent={'space-between'} alignItems="start">
        <H2 whiteSpace="nowrap">{t('Weekly overview')}</H2>
        {isMobile && <ShareProjectButton />}
      </HStack>
      <HStack flex={1} spacing="10px" justifyContent={'end'}>
        {!isMobile && <ShareProjectButton />}
        <Button
          as={Link}
          to={getPath('projectEntryCreation', project?.name)}
          size="sm"
          variant="primary"
          leftIcon={<AddIcon />}
        >
          {t('Write entry')}
        </Button>
        <Button
          size="sm"
          variant="primary"
          leftIcon={<AddIcon />}
          onClick={onMilestonesModalOpen}
        >
          {t('Add goal')}
        </Button>
        <Button
          size="sm"
          variant="primary"
          leftIcon={<AddIcon />}
          onClick={() => onRewardsModalOpen()}
        >
          {t('Add reward')}
        </Button>
      </HStack>
    </Stack>
  )
}
