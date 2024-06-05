import { LinkIcon } from '@chakra-ui/icons'
import { Box, HStack, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavContext } from '../../../context'

export const ProjectTitle = () => {
  const { navData } = useNavContext()
  const { t } = useTranslation()

  const [copied, setCopied] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleTitleClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}${navData.projectPath}`)
    setCopied(true)
    onOpen()
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 2000)
  }

  if (!navData.projectTitle) return <Box flexGrow={1} />

  return (
    <Tooltip isOpen={isOpen} label={copied ? t('Project link copied!') : t('Copy project link')} closeOnClick={false}>
      <HStack
        flexGrow={1}
        overflow={'hidden'}
        w="full"
        justifyContent="center"
        borderRadius="8px"
        onMouseOver={onOpen}
        onMouseOut={onClose}
      >
        <Text
          variant="h3"
          noOfLines={1}
          size="sm"
          textAlign="center"
          onClick={handleTitleClick}
          _hover={{ cursor: 'pointer' }}
        >
          {navData.projectTitle}
        </Text>
        <LinkIcon fontSize="12px" />
      </HStack>
    </Tooltip>
  )
}
