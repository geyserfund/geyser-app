import { HStack } from '@chakra-ui/react'
import { useRef } from 'react'
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
import { useCustomTheme } from '../../../../../../utils'

export type RewardSoldDataType = {
  dateTime: any
  rewardId: any
  rewardName: string
  sum: number
}

export type RewardSoldGraphType = {
  name: string
  rewards: RewardSoldDataType[]
}

export const RewardSoldChart = ({
  data,
  loading,
}: {
  data: RewardSoldGraphType[]
  loading?: boolean
}) => {
  const { colors } = useCustomTheme()
  const ref = useRef<HTMLDivElement>(null)
  return (
    <HStack ref={ref} w="full" spacing="20px" wrap="wrap">
      {loading ? (
        <SkeletonLayout width="full" height="250px" />
      ) : (
        <BarChart
          width={ref.current?.clientWidth || 730}
          height={250}
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      )}
    </HStack>
  )
}
