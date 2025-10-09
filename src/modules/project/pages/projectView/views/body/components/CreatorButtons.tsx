import { Button, IconButton, Link as ChakraLink } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiArrowUpRight, PiBag, PiFlagBannerFold, PiNewspaper } from 'react-icons/pi'
import { Link } from 'react-router'

import { useMobileMode } from '@/utils'

import { getPath, GuideStepByStepUrl } from '../../../../../../../shared/constants'
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
        minWidth={{ base: '90px', lg: '120px' }}
        leftIcon={<PiBag />}
      >
        {isMobile ? t('Product') : t('Sell product')}
      </Button>
      <Button
        size={'lg'}
        onClick={() => onGoalModalOpen()}
        flex={1}
        variant="outline"
        colorScheme="neutral1"
        minWidth={{ base: '90px', lg: '120px' }}
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
        minWidth={{ base: '90px', lg: '120px' }}
        leftIcon={<PiNewspaper />}
      >
        {isMobile ? t('Post') : t('Write post')}
      </Button>

      {isMobile ? (
        <IconButton
          aria-label="guide"
          size={'md'}
          as={ChakraLink}
          href={GuideStepByStepUrl}
          isExternal
          variant="ghost"
          colorScheme="neutral1"
          icon={<PiArrowUpRight />}
        />
      ) : (
        <Button
          size={'md'}
          as={ChakraLink}
          href={GuideStepByStepUrl}
          isExternal
          variant="ghost"
          colorScheme="neutral1"
          paddingX={2}
          rightIcon={<PiArrowUpRight />}
        >
          {t('Guides')}
        </Button>
      )}
    </>
  )
}
