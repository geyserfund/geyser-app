import { HStack, VStack } from '@chakra-ui/react'

import { Body2 } from '../../../../components/typography'
import { Entry } from '../../../../types'
import { AvatarElement } from '../../../projectView/projectMainBody/components'
import { LandingEntryCard } from '../../components'

export const EntryActivityItem = ({ entry }: { entry: Entry }) => {
  return (
    <VStack w="full">
      <HStack w="full" justifyContent="start">
        <AvatarElement rounded="full" user={entry.creator} />
        <Body2>published a new entry</Body2>
      </HStack>
      <LandingEntryCard entry={entry} isMobile />
    </VStack>
  )
}
