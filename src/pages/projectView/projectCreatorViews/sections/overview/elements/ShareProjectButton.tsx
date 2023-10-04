import { LinkIcon } from '@chakra-ui/icons'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../../../../context'
import { useNotification } from '../../../../../../utils'

export const ShareProjectButton = () => {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const { toast } = useNotification()

  const handleCopyLink = async () => {
    try {
      navigator.clipboard.writeText(
        `${window.location.origin}/project/${project?.name}`,
      )
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    } catch {
      toast({
        title: 'failed to copy link',
        status: 'error',
      })
    }
  }

  return (
    <Tooltip
      label={copied ? t('Copied to clipboard!') : t('Copy project link')}
    >
      <IconButton
        size="sm"
        aria-label="share-icon"
        variant={copied ? 'primary' : 'secondary'}
        icon={<LinkIcon />}
        onClick={handleCopyLink}
      />
    </Tooltip>
  )
}
