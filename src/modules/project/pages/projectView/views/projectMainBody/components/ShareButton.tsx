import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { CampaignContent, useProjectShare } from '../../../hooks/useProjectShare'

export const ShareButton = (props: ButtonProps) => {
  const { project } = useProjectAtom()
  const { t } = useTranslation()

  const { copyProjectLinkToClipboard, copied } = useProjectShare()

  const handleShareClick = () => {
    copyProjectLinkToClipboard({ clickedFrom: CampaignContent.contributionSummary })
  }

  if (!project) {
    return null
  }

  return (
    <Button variant={copied ? 'primary' : 'secondary'} onClick={handleShareClick} {...props}>
      {copied ? t('Project link copied!') : t('Share')}
    </Button>
  )
}
