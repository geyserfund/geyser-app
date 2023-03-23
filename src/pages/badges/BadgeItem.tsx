import { HStack, Image, Text, VStack } from '@chakra-ui/react'

import { User } from '../../types'
import {
  AvatarCircle,
  AvatarElement,
} from '../projectView/projectMainBody/components'

interface BadgeItemProps {
  image: string
  title: string
  description: string
  winners: User[]
}

const BadgeItem = ({ image, title, description, winners }: BadgeItemProps) => {
  const topWinners = winners.slice(0, 7)

  const hasLeftoverWinners = winners.length > topWinners.length

  if (hasLeftoverWinners) {
    topWinners.pop()
  }

  return (
    <VStack justify="center" maxWidth="272px">
      <Image alt="badge" src={image} />
      <Text variant="h3">{title}</Text>
      <Text>{description}</Text>
      <HStack>
        {topWinners.map((user) => (
          <AvatarElement
            key={user.id}
            width="28px"
            height="28px"
            wrapperProps={{
              display: 'inline-block',
              marginLeft: '-5px',
              marginTop: 2,
            }}
            avatarOnly
            borderRadius="50%"
            user={user}
          />
        ))}
        {hasLeftoverWinners && (
          <AvatarCircle>+{winners.length - topWinners.length}</AvatarCircle>
        )}
      </HStack>
    </VStack>
  )
}

export default BadgeItem
