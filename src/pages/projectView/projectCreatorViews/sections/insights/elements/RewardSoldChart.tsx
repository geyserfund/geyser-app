import { HStack, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { FaGift } from 'react-icons/fa'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { SkeletonLayout } from '../../../../../../components/layouts'
import { Body2 } from '../../../../../../components/typography'
import { useCustomTheme, useMobileMode } from '../../../../../../utils'
import { getColorByIndex } from '../helpers'
import { TickComponent } from './ChartElements'

export type RewardSoldDataType = {
  dateTime: any
  rewardId: any
  rewardName: string
  sum: number
}

export type RewardSoldGraphType = {
  name: string
  rewards: { [key: string]: RewardSoldDataType }
}

export type RewardListType = {
  rewardId: number
  rewardName: string
}

const ssdata = [
  {
    name: 'Fri (22/09)',
    rewards: {
      '93': {
        dateTime: 1695427200000,
        sum: 1,
        rewardId: '93',
        rewardName: 'Insane Keychain',
      },
      '94': {
        dateTime: 1695527200000,
        sum: 2,
        rewardId: '94',
        rewardName: 'Insane Keychain2',
      },
      '95': {
        dateTime: 1695627200000,
        sum: 3,
        rewardId: '95',
        rewardName: 'Insane Keychain3',
      },
    },
  },
  {
    name: 'Sat (23/09)',
    rewards: {
      '93': {
        dateTime: 1695427200000,
        sum: 5,
        rewardId: '93',
        rewardName: 'Insane Keychain',
      },
      '94': {
        dateTime: 1695527200000,
        sum: 25,
        rewardId: '94',
        rewardName: 'Insane Keychain2',
      },
      '95': {
        dateTime: 1695627200000,
        sum: 78,
        rewardId: '95',
        rewardName: 'Insane Keychain3',
      },
      '96': {
        dateTime: 1695727200000,
        sum: 45,
        rewardId: '96',
        rewardName: 'Insane Keychain4',
      },
      '97': {
        dateTime: 1695827200000,
        sum: 78,
        rewardId: '97',
        rewardName: 'Insane Keychain5',
      },
    },
  },
  {
    name: 'Sun (24/09)',
    rewards: {
      '96': {
        dateTime: 1695627200000,
        sum: 89,
        rewardId: '96',
        rewardName: 'Insane Keychain4',
      },
      '97': {
        dateTime: 1695727200000,
        sum: 45,
        rewardId: '97',
        rewardName: 'Insane Keychain5',
      },
    },
  },
]

const ssrewardList = [
  {
    rewardId: 93,
    rewardName: 'Insane Keychain',
  },
  {
    rewardId: 94,
    rewardName: 'Insane Keychain2',
  },
  {
    rewardId: 95,
    rewardName: 'Insane Keychain3',
  },
  {
    rewardId: 96,
    rewardName: 'Insane Keychain4',
  },
  {
    rewardId: 97,
    rewardName: 'Insane Keychain5',
  },
]

export const RewardSoldChart = ({
  data,
  loading,
  rewardList,
}: {
  data: RewardSoldGraphType[]
  loading?: boolean
  rewardList: RewardListType[]
}) => {
  const { colors } = useCustomTheme()
  const isMobile = useMobileMode()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <VStack ref={ref} w="full" spacing="20px" wrap="wrap">
      {loading ? (
        <SkeletonLayout width="full" height="250px" />
      ) : (
        <>
          <HStack w="full" flexWrap="wrap">
            {ssrewardList.map((reward, index) => {
              const color = getColorByIndex(index)
              return (
                <HStack key={reward.rewardId}>
                  <FaGift color={color} />
                  <Body2 color={color}>{reward.rewardName}</Body2>
                </HStack>
              )
            })}
          </HStack>
          <BarChart
            width={ref.current?.clientWidth || 730}
            height={250}
            data={ssdata}
            margin={
              isMobile
                ? { top: 0, right: 0, left: 0, bottom: 0 }
                : { top: 10, right: 10, left: 10, bottom: 10 }
            }
            barGap={0}
            barSize={10}
          >
            <CartesianGrid strokeDasharray="4" vertical={false} />
            <XAxis
              dataKey="name"
              style={{
                borderTop: '1px solid',
                borderTopColor: colors.neutral[300],
              }}
              stroke={colors.neutral[300]}
              strokeDasharray="none"
              tick={<TickComponent dy={10} fill={colors.neutral[300]} />}
            />
            <YAxis width={isMobile ? 40 : 60} tick={<TickComponent />} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: colors.neutral[0],
                borderColor: colors.neutral[200],
                borderRadius: '8px',
              }}
              formatter={(value, name, props) => {
                const rewardId = name.toString().split('.')[1]
                if (!rewardId) return [value, name]
                const rewardName = ssrewardList.find(
                  (reward) => reward.rewardId === Number(rewardId),
                )?.rewardName
                if (!rewardName) return [value, name]

                return [value, rewardName]
              }}
            />
            {ssrewardList.map((reward, index) => (
              <Bar
                radius={[4, 4, 0, 0]}
                key={reward.rewardId}
                dataKey={`rewards.${reward.rewardId}.sum`}
                stackId={reward.rewardId}
                fill={getColorByIndex(index)}
              />
            ))}
          </BarChart>
        </>
      )}
    </VStack>
  )
}
