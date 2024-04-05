import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiLinkBold } from 'react-icons/pi'
import { RiTwitterXLine } from 'react-icons/ri'

import { CardLayout } from '../../../../components/layouts'
import { Body2, H3 } from '../../../../components/typography'
import { MegaphoneUrl } from '../../../../constants'
import { useAuthContext, useProjectContext } from '../../../../context'
import { standardPadding } from '../../../../styles'
import { ProjectStatus } from '../../../../types'
import { hasTwitterAccount } from '../../../../utils'

const SHARE_PROJECT_CLOSED_STORAGE_KEY = 'shareProjectClosed'

export const ShareProject = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectContext()

  const { user } = useAuthContext()

  const isTwitterAccount = hasTwitterAccount(user)

  console.log('isTwitterAccount', isTwitterAccount)

  const [shareClosed, setShareClosed] = useState(localStorage.getItem(SHARE_PROJECT_CLOSED_STORAGE_KEY) === 'true')

  const [copied, setCopied] = useState(false)

  if (!project || !isProjectOwner || project.status !== ProjectStatus.Active) return null

  const handleShareClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/project/${project?.name}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleCloseClick = () => {
    setShareClosed(true)
    localStorage.setItem(SHARE_PROJECT_CLOSED_STORAGE_KEY, 'true')
  }

  if (shareClosed) return null

  return (
    <CardLayout
      w="full"
      padding={standardPadding}
      direction="row"
      backgroundColor="primary.50"
      mx={{ base: '10px', lg: '0px' }}
      spacing={{ base: '0px', lg: '10px' }}
      position="relative"
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        aria-label="close-share-project"
        size="sm"
        variant="ghost"
        icon={<CloseIcon />}
        onClick={handleCloseClick}
      />

      <Box height="100px" maxHeight="200px">
        <Image h="100%" src={MegaphoneUrl} aria-label="share-project-megaphone" objectFit="contain" />
      </Box>
      <VStack w="full" alignItems={'start'}>
        <H3>{t('Share your project')}</H3>
        <Body2>{t('Sharing on social media helps you reach more people and get closer to achieving your goals')}</Body2>
        <HStack w="full" alignItems="start">
          {isTwitterAccount && (
            <Button
              w="full"
              backgroundColor="neutral.1000"
              color="neutral.0"
              leftIcon={<RiTwitterXLine />}
              _hover={{ backgroundColor: 'neutral.300', color: 'neutral.1000' }}
            >
              {t('Post')}
            </Button>
          )}
          <Button
            variant={copied ? 'secondary' : 'primary'}
            leftIcon={<PiLinkBold />}
            w="full"
            onClick={handleShareClick}
          >
            {copied ? t('Project link copied!') : t('Copy project link')}
          </Button>
        </HStack>
      </VStack>
    </CardLayout>
  )
}
