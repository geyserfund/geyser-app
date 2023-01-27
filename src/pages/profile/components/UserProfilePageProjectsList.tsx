import { GridItem, SimpleGrid } from '@chakra-ui/react'

import { AlertBox } from '../../../components/ui'
import { Maybe, OwnerOf, User } from '../../../types/generated/graphql'
import { UserProfilePageProjectsListItem } from '../containers'

type Props = {
  profileUser: User
}

export const UserProfilePageProjectsList = ({ profileUser }: Props) => {
  if (profileUser.ownerOf.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no projects."
      />
    )
  }

  return (
    <SimpleGrid columns={4} spacingX={4} spacingY={8}>
      {profileUser.ownerOf.map((ownerOf: Maybe<OwnerOf>) => {
        if (ownerOf && ownerOf.project) {
          return (
            <GridItem
              key={ownerOf.project.id}
              colSpan={{ lg: 1, md: 2, sm: 4, base: 4 }}
              display="flex"
              justifyContent="center"
            >
              <UserProfilePageProjectsListItem projectID={ownerOf.project.id} />
            </GridItem>
          )
        }
      })}
    </SimpleGrid>
  )
}
