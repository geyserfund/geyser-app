import { LinkIcon } from '@chakra-ui/icons'
import { Box, HStack, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuthContext, useNavContext } from '../../../context'
import { CampaignContent, getCampaignUrlSuffix } from '../../../modules/project/pages/projectView/hooks/useProjectShare'
import { copyTextToClipboard } from '../../../utils'

export const ProjectTitle = () => {
  const { navData } = useNavContext()
  const { isLoggedIn, user } = useAuthContext()
  const { t } = useTranslation()

  const [copied, setCopied] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleTitleClick = () => {
    const campaignSuffix = getCampaignUrlSuffix({
      isLoggedIn,
      creator: user ? navData.projectOwnerIDs.includes(user.id) : false,
      projectName: navData.projectName,
      clickedFrom: CampaignContent.projectTitle,
    })
    const projectShareUrl = `${window.location.origin}${navData.projectPath}${campaignSuffix}`

    copyTextToClipboard(projectShareUrl)

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
