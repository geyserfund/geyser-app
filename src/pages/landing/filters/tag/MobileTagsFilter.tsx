import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { HiOutlineTag } from 'react-icons/hi'

import { Body1 } from '../../../../components/typography'
import { TagsGetResult } from '../../../../types'
import { TagsFilterBody } from './TagsFilterBody'

interface MobileTagsFilterProps extends AccordionItemProps {
  allTags: TagsGetResult[]
  handleTagsClick: (tag: TagsGetResult) => void
}

export const MobileTagsFilter = ({
  allTags,
  handleTagsClick,
  ...rest
}: MobileTagsFilterProps) => {
  return (
    <AccordionItem height="100%">
      <AccordionButton paddingY="15px">
        <HStack width="100%">
          <HiOutlineTag fontSize="20px" color={'neutral.600'} />
          <Body1 fontSize="16px" color={'neutral.800'}>
            Project tags
          </Body1>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        as={VStack}
        overflow="hidden"
        paddingX="0px"
        overflowY="auto"
        maxHeight="400px"
        spacing="10px"
      >
        <TagsFilterBody {...{ allTags, handleTagsClick }} />
      </AccordionPanel>
    </AccordionItem>
  )
}
