import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiLinkBold } from 'react-icons/pi'
import { RiTwitterXLine } from 'react-icons/ri'

import { Body2, H3 } from '../../../../../../../components/typography'
import { useAuthContext } from '../../../../../../../context'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { MegaphoneUrl } from '../../../../../../../shared/constants'
import { standardPadding } from '../../../../../../../styles'
import { ProjectStatus } from '../../../../../../../types'
import { hasTwitterAccount } from '../../../../../../../utils'
import { useProjectContext } from '../../../../../context'
import { CampaignContent, useProjectShare } from '../../../hooks/useProjectShare'
import { shareOnTwitter } from '../utils'

const SHARE_PROJECT_CLOSED_STORAGE_KEY = 'shareProjectClosed'

const tweetKeys = [
  'Check out my project in geyser: {{projectLink}}',
  "We're on a mission to change the game and we need your help. Dive into our project on @geyserfund and let's make a difference. Are you in? {{projectLink}}",
  "Dream with us! We're launching something incredible on @geyserfund and you're invited to be part of the journey. Join us! {{projectLink}}",
  "Big news! We've just launched our latest project on @geyserfund and we need YOUR help to make it a reality. Ready to make a difference? {{projectLink}}",
  "Join us in bringing our dream project to life on @geyserfund. Let's change things together! {{projectLink}}",
  "Breaking news: We're shaking things up with our new project on @geyserfund! Check it out: {{projectLink}} #BreakingNews",
  "We're transforming our dreams into reality with this project on @geyserfund. Your support matters: {{projectLink}}",
  'Making a difference, one step at a time. Join our mission on @geyserfund and help us leave a lasting impact. Your support makes all the difference: {{projectLink}} #MakeADifference',
]

export const ShareProject = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectContext()
  const { user } = useAuthContext()
  const { copyProjectLinkToClipboard, copied } = useProjectShare()

  const isTwitterAccount = hasTwitterAccount(user)

  const [shareClosed, setShareClosed] = useState(localStorage.getItem(SHARE_PROJECT_CLOSED_STORAGE_KEY) === 'true')

  if (!project || !isProjectOwner || project.status !== ProjectStatus.Active) return null

  const handleCloseClick = () => {
    setShareClosed(true)
    localStorage.setItem(SHARE_PROJECT_CLOSED_STORAGE_KEY, 'true')
  }

  const handleTwitterShareClick = () => {
    return shareOnTwitter(tweetKeys, project?.name, t)
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
            <a href={handleTwitterShareClick()} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
              <Button
                as="div"
                w="full"
                backgroundColor="neutral.1000"
                color="neutral.0"
                leftIcon={<RiTwitterXLine />}
                _hover={{ backgroundColor: 'neutral.300', color: 'neutral.1000' }}
              >
                {t('Post')}
              </Button>
            </a>
          )}
          <Button
            variant={copied ? 'secondary' : 'primary'}
            leftIcon={<PiLinkBold />}
            w="full"
            onClick={() => copyProjectLinkToClipboard({ clickedFrom: CampaignContent.creatorCta })}
          >
            {copied ? t('Project link copied!') : t('Copy project link')}
          </Button>
        </HStack>
      </VStack>
    </CardLayout>
  )
}
