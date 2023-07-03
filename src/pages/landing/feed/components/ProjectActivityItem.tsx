import { HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../components/typography'
import { LinkableAvatar } from '../../../../components/ui'
import { ProjectForLandingPageFragment } from '../../../../types'
import { LandingProjectCard, TimeAgo } from '../../components'

export const ProjectActivityItem = ({
  project,
  dateTime,
}: {
  project: ProjectForLandingPageFragment
  dateTime?: string
}) => {
  const { t } = useTranslation()
  const owner = project.owners[0]?.user

  return (
    <VStack w="full" alignItems="start">
      <HStack w="full" justifyContent="start">
        {owner ? (
          <LinkableAvatar
            imageSrc={owner.imageUrl || ''}
            avatarUsername={owner.username}
            userProfileID={owner.id}
            imageSize={'24px'}
            textColor="neutral.600"
          />
        ) : null}
        <Body2>{t('launched a new Project')}</Body2>
      </HStack>
      <LandingProjectCard project={project} isMobile />
      <TimeAgo date={dateTime || ''} />
    </VStack>
  )
}
