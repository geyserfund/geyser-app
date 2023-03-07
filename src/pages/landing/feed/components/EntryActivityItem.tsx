import { HStack, Link, VStack } from '@chakra-ui/react'

import { Body2 } from '../../../../components/typography'
import { LinkableAvatar } from '../../../../components/ui'
import { getPath } from '../../../../constants'
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
    </VStack>
  )
}
