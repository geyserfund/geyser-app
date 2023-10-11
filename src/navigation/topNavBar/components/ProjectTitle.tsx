import { Box, Button, HStack, Text, Tooltip } from '@chakra-ui/react'
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

  if (!navData.projectTitle) return <Box flexGrow={1} />

  return (
    <Tooltip
      isOpen={copied}
      label={t('Project link copied!')}
      closeOnClick={false}
    >
      <HStack flexGrow={1} overflow={'hidden'} w="full" justifyContent="center">
        <Button
          variant="ghost"
          backgroundColor="neutral.100"
          px={2}
          size="sm"
          overflow={'hidden'}
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
        </Button>
      </HStack>
    </Tooltip>
  )
}
