import { HStack, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { FaGift } from 'react-icons/fa'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

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

  console.log('checking max and min rewards', data, rewardList)

  return (
    <VStack ref={ref} w="full" spacing="20px" wrap="wrap">
      {loading ? (
        <SkeletonLayout width="full" height="250px" />
      ) : (
        <>
          <HStack w="full" flexWrap="wrap">
            {rewardList.map((reward, index) => {
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
            data={data}
            margin={
              isMobile
                ? { top: 0, right: 0, left: 0, bottom: 0 }
                : { top: 10, right: 10, left: 10, bottom: 10 }
            }
            barGap={0}
            barSize={10}
          >
            <CartesianGrid strokeDasharray="4" vertical={false} />
            <XAxis dataKey="name" tick={<TickComponent dy={10} />} />
            <YAxis
              width={isMobile ? 40 : 60}
              tick={<TickComponent />}
              domain={[0, 'dataMax']}
            />
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
                const rewardName = rewardList.find(
                  (reward) => reward.rewardId === Number(rewardId),
                )?.rewardName
                if (!rewardName) return [value, name]

                return [value, rewardName]
              }}
            />
            {rewardList.map((reward, index) => (
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
