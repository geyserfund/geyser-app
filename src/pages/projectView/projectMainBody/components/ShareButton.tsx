import { Button, ButtonProps } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../../context'

export const ShareButton = (props: ButtonProps) => {
  const { project } = useProjectContext()
  const { t } = useTranslation()

  const [copied, setCopied] = useState(false)

  const handleShareClick = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/project/${project?.name}`,
    )
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  if (!project) {
    return null
  }

  return (
    <Button
      variant={copied ? 'primary' : 'secondary'}
      onClick={handleShareClick}
      {...props}
    >
      {copied ? t('Project link copied!') : t('Share')}
    </Button>
  )
}
