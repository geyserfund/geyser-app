import { HStack, VStack } from '@chakra-ui/react'

import { Body2 } from '../../../../components/typography'
import { LinkableAvatar } from '../../../../components/ui'
import { Entry } from '../../../../types'
import { LandingEntryCard } from '../../components'

export const EntryActivityItem = ({ entry }: { entry: Entry }) => {
  const { creator } = entry
  return (
    <VStack w="full">
      <HStack w="full" justifyContent="start">
        <LinkableAvatar
          imageSrc={`${creator.imageUrl}`}
          avatarUsername={creator.username}
          userProfileID={creator.id}
          imageSize={'24px'}
          textColor="brand.neutral600"
        />
        <Body2>published a new entry</Body2>
      </HStack>
      <LandingEntryCard entry={entry} isMobile />
    </VStack>
  )
}
