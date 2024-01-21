import { Button, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H2 } from '../../../../../../../components/typography'
import { standardPadding } from '../../../../../../../styles'
import { RewardStatus, RewardTable } from './RewardTable'

type Reward = {
  id: number
  name: string
  quantity: number
}

type Funder = {
  name: string
  imageUrl: string
}

export type Item = {
  id: number
  status: RewardStatus
  email: string
  reference: string
  amount: number
  funder: Funder
  paidAt: number
  rewards: Reward[]
}

const rewards: Item[] = [
  {
    id: 1,
    status: RewardStatus.todo,
    email: 'johndoe@gmail.com',
    reference: '12345678',
    amount: 1000,
    funder: {
      name: 'John Doe',
      imageUrl: 'https://bit.ly/dan-abramov',
    },
    paidAt: 123123123123123,
    rewards: [
      {
        id: 1,
        name: 'Reward 1',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Reward 2',
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    status: RewardStatus.shipped,
    email: 'janedoe@gmail.com',
    reference: '87654321',
    amount: 2000,
    funder: {
      name: 'Jane Doe',
      imageUrl: 'https://bit.ly/jane-doe',
    },
    paidAt: 123123123123123,
    rewards: [
      {
        id: 3,
        name: 'Reward 3',
        quantity: 2,
      },
      {
        id: 4,
        name: 'Reward 4',
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    status: RewardStatus.delivered,
    email: 'robertdoe@gmail.com',
    reference: '24681357',
    amount: 3000,
    funder: {
      name: 'Robert Doe',
      imageUrl: 'https://bit.ly/robert-doe',
    },
    paidAt: 123123123123123,
    rewards: [
      {
        id: 5,
        name: 'Reward 5',
        quantity: 3,
      },
      {
        id: 6,
        name: 'Reward 6',
        quantity: 2,
      },
    ],
  },
  {
    id: 4,
    status: RewardStatus.todo,
    email: 'emilydoe@gmail.com',
    reference: '13579246',
    amount: 4000,
    funder: {
      name: 'Emily Doe',
      imageUrl: 'https://bit.ly/emily-doe',
    },
    paidAt: 123123123123123,
    rewards: [
      {
        id: 7,
        name: 'Reward 7',
        quantity: 4,
      },
      {
        id: 8,
        name: 'Reward 8',
        quantity: 2,
      },
    ],
  },
  {
    id: 5,
    status: RewardStatus.shipped,
    email: 'oliverdoe@gmail.com',
    reference: '86420953',
    amount: 5000,
    funder: {
      name: 'Oliver Doe',
      imageUrl: 'https://bit.ly/oliver-doe',
    },
    paidAt: 123123123123123,
    rewards: [
      {
        id: 9,
        name: 'Reward 9',
        quantity: 5,
      },
      {
        id: 10,
        name: 'Reward 10',
        quantity: 3,
      },
    ],
  },
  {
    id: 6,
    status: RewardStatus.delivered,
    email: 'sophiadoe@gmail.com',
    reference: '97531086',
    amount: 6000,
    funder: {
      name: 'Sophia Doe',
      imageUrl: 'https://bit.ly/sophia-doe',
    },
    paidAt: 123123123123123,
    rewards: [
      {
        id: 11,
        name: 'Reward 11',
        quantity: 6,
      },
      {
        id: 12,
        name: 'Reward 12',
        quantity: 4,
      },
    ],
  },
  {
    id: 7,
    status: RewardStatus.todo,
    email: 'lucasdoe@gmail.com',
    reference: '79024613',
    amount: 7000,
    funder: {
      name: 'Lucas Doe',
      imageUrl: 'https://bit.ly/lucas-doe',
    },
    paidAt: 123123123123123,
    rewards: [
      {
        id: 13,
        name: 'Reward 13',
        quantity: 7,
      },
      {
        id: 14,
        name: 'Reward 14',
        quantity: 5,
      },
    ],
  },
  {
    id: 8,
    status: RewardStatus.shipped,
    email: 'miadoe@gmail.com',
    reference: '68209351',
    amount: 8000,
    funder: {
      name: 'Mia Doe',
      imageUrl: 'https://bit.ly/mia-doe',
    },
    paidAt: 123123123123123,
    rewards: [
      {
        id: 15,
        name: 'Reward 15',
        quantity: 8,
      },
      {
        id: 16,
        name: 'Reward 16',
        quantity: 6,
      },
    ],
  },
]

export const RewardStatusLabel = {
  [RewardStatus.todo]: 'To do',
  [RewardStatus.shipped]: 'Shipped',
  [RewardStatus.delivered]: 'Delivered',
}

export const RewardByStatus = ({ status }: { status: RewardStatus }) => {
  const { t } = useTranslation()

  const currentItems = rewards.filter((item) => item.status === status)

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px">
      <HStack w="full" px={standardPadding}>
        <H2>{t(RewardStatusLabel[status])}</H2>
      </HStack>
      <RewardTable data={currentItems} />
      <HStack w="full" px={standardPadding}>
        <Button width="100%" variant="secondary">
          {t('Show more')}...
        </Button>
      </HStack>
    </VStack>
  )
}
