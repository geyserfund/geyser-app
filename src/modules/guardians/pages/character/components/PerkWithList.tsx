import { ListItem } from '@chakra-ui/react'
import { UnorderedList, VStack } from '@chakra-ui/react'

import { H2 } from '@/shared/components/typography'

export const PerkWithList = ({ title, items }: { title: string; items?: string[] }) => {
  if (!items?.length) return null

  return (
    <VStack w="full" alignItems="flex-start">
      <H2 size={{ base: '32px', lg: '32px' }} dark bold>
        {title}
      </H2>
      <UnorderedList fontSize={{ base: 'md', lg: '2xl' }}>
        {items.map((item) => {
          return <ListItem key={item}>{item}</ListItem>
        })}
      </UnorderedList>
    </VStack>
  )
}
