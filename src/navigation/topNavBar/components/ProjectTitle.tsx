import { Text, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavContext } from '../../../context'

export const ProjectTitle = () => {
  const { navData } = useNavContext()
  const { t } = useTranslation()

  const [copied, setCopied] = useState(false)

  const handleTitleClick = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}${navData.projectPath}`,
    )
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Tooltip
      isOpen={copied}
      label={t('Project link copied!')}
      closeOnClick={false}
    >
      <Text
        variant="h3"
        noOfLines={1}
        size="sm"
        textAlign="center"
        onClick={handleTitleClick}
        flexGrow={1}
        _hover={{ cursor: 'pointer' }}
      >
        {navData.projectTitle}
      </Text>
    </Tooltip>
  )
}
