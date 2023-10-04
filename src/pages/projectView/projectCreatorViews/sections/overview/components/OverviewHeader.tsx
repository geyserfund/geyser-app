import { AddIcon, LinkIcon } from '@chakra-ui/icons'
import { Button, HStack, IconButton, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { H2 } from '../../../../../../components/typography'
import { getPath } from '../../../../../../constants'
import { useProjectContext } from '../../../../../../context'
import { useMobileMode } from '../../../../../../utils'

export const OverviewHeader = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { project, onRewardsModalOpen, onMilestonesModalOpen } =
    useProjectContext()

  const renderLinkIcon = () => {
    return (
      <IconButton
        size="sm"
        aria-label="share-icon"
        variant="secondary"
        icon={<LinkIcon />}
      />
    )
  }

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      justifyContent="space-between"
    >
      <HStack w="full" justifyContent={'space-between'}>
        <H2>{t('Weekly overview')}</H2>
        {isMobile && renderLinkIcon()}
      </HStack>
      <HStack spacing="10px" justifyContent={'end'}>
        {!isMobile && renderLinkIcon()}
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
