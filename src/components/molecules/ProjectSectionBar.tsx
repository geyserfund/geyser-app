import { Badge, HStack, VStack } from '@chakra-ui/react'

import { H3 } from '../typography'

interface IProjectSectionBar {
  name: string
  number?: string | number
  rightSection?: React.ReactNode
}

export const ProjectSectionBar = ({
  name,
  number,
  rightSection,
}: IProjectSectionBar) => (
  <VStack
    width="100%"
    alignItems="flex-start"
    borderBottom="2px solid"
    borderColor="brand.neutral300"
  >
    <HStack width="100%" marginBottom="3px" justifyContent="space-between">
      <HStack>
        <H3 color="brand.neutral800">{name}</H3>
        {number && (
          <Badge borderRadius="4px" paddingX="2" fontSize={'15px'}>
            {number}
          </Badge>
        )}
      </HStack>
      {rightSection}
    </HStack>
  </VStack>
)
