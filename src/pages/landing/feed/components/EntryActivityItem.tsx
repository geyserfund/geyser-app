import { HStack, Link, VStack } from '@chakra-ui/react'

import { Body2 } from '../../../../components/typography'
import { LinkableAvatar } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { EntryForLandingPageFragment } from '../../../../types'
import { LandingEntryCard, TimeAgo } from '../../components'

export const EntryActivityItem = ({
  entry,
  dateTime,
}: {
  entry: EntryForLandingPageFragment
  dateTime?: string
}) => {
  const { creator } = entry
  return (
    <VStack w="full" alignItems="start">
      <HStack w="full" justifyContent="start">
        <LinkableAvatar
          imageSrc={`${creator.imageUrl}`}
          avatarUsername={creator.username}
          userProfileID={creator.id}
          imageSize={'24px'}
          textColor="neutral.600"
        />
        <Body2>published a new entry for</Body2>
        <Body2
          as={Link}
          to={getPath('project', entry.project?.name)}
          semiBold
          _hover={{ textDecoration: 'underline' }}
          isTruncated
          flex={1}
        >
          {entry.project?.title}
        </Body2>
      </HStack>
      <LandingEntryCard entry={entry} isMobile />
      <TimeAgo date={`${dateTime}`} />
    </VStack>
  )
}
