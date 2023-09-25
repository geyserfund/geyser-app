import { HStack } from '@chakra-ui/react'
import { useRef } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { SkeletonLayout } from '../../../../../../components/layouts'
import { getShortAmountLabel, useCustomTheme } from '../../../../../../utils'

export type HistoryDataType = {
  name: string
  dateTime: number
  visitorCount: number
  amount: number
}

export const HistoricalChart = ({
  data,
  loading,
}: {
  data: HistoryDataType[]
  loading?: boolean
}) => {
  const { colors } = useCustomTheme()
  const ref = useRef<HTMLDivElement>(null)
  console.log('checking history data', data)
  return (
    <HStack ref={ref} w="full" spacing="20px" wrap="wrap">
      {loading ? (
        <SkeletonLayout width="full" height="250px" />
      ) : (
        <ComposedChart
          width={ref.current?.clientWidth || 730}
          height={250}
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.social.nostr}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={colors.social.nostr}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorVisitor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.primary[400]}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={colors.primary[400]}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickMargin={10} />
          <YAxis
            yAxisId="visitorCount"
            orientation="right"
            axisLine={false}
            tickMargin={10}
          />
          <YAxis
            width={100}
            yAxisId="amount"
            tickFormatter={(value) => `${getShortAmountLabel(value, true)} `}
            allowDecimals={true}
            axisLine={false}
            tickMargin={10}
            unit={'sats'}
          />
          <CartesianGrid strokeDasharray="6" vertical={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.neutral[100],
              borderRadius: '8px',
            }}
          />
          <Legend verticalAlign="top" height={50} align="left" />
          <Area
            name="contributions"
            type="monotone"
            dataKey="amount"
            stroke={colors.social.nostr}
            yAxisId={'amount'}
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
          <Area
            name="visitors"
            type="monotone"
            dataKey="visitorCount"
            stroke={colors.primary[400]}
            yAxisId={'visitorCount'}
            fillOpacity={1}
            fill="url(#colorVisitor)"
          />
        </ComposedChart>
      )}
    </HStack>
  )
}
