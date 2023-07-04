import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { User } from '../../types'
import {
  AvatarCircle,
  AvatarElement,
} from '../projectView/projectMainBody/components'

interface BadgeItemProps {
  image: string
  name: string
  description: string
  winners?: User[]
}

const BadgeItem = ({ image, name, description, winners }: BadgeItemProps) => {
  const { t } = useTranslation()
  const topWinners = winners ? winners.slice(0, 7) : []

  const hasLeftoverWinners = winners ? winners.length > topWinners.length : 0

  if (hasLeftoverWinners) {
    topWinners.pop()
  }

  return (
    <VStack justify="center" maxWidth="272px">
      <Image alt="badge" objectFit="contain" src={image} width="190px" />
      <Text variant="h3">{name}</Text>
      <Text>{t(description)}</Text>
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
        {winners && hasLeftoverWinners && (
          <AvatarCircle>+{winners.length - topWinners.length}</AvatarCircle>
        )}
      </HStack>
    </VStack>
  )
}

export default BadgeItem
