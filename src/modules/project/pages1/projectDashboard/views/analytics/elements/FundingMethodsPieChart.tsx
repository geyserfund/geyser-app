import { HStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { FundingTxMethodSum } from '@/types'
import { commaFormatted, useCustomTheme } from '@/utils'

import { useColorByIndex } from '../hooks/useColorByIndex'
import { ActiveShapeComponent } from './ActiveShapeComponent'

export const FundingMethodsPieChart = ({ data, loading }: { data: FundingTxMethodSum[]; loading?: boolean }) => {
  const { colors } = useCustomTheme()
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const getColorByIndex = useColorByIndex()

  const [activeIndex, setActiveIndex] = useState<number>()

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <HStack ref={ref} w="full" spacing="20px" wrap="wrap">
      {loading ? (
        <SkeletonLayout width="full" height="300px" />
      ) : data.length === 0 ? (
        <Body>{t('No data available')}</Body>
      ) : (
        <PieChart width={ref.current?.clientWidth || 350} height={300}>
          <Pie
            data={data}
            dataKey="sum"
            nameKey="method"
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            minAngle={3}
            activeIndex={activeIndex}
            activeShape={ActiveShapeComponent}
            onMouseEnter={onPieEnter}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColorByIndex(index)} min={2} />
            ))}
          </Pie>
          <Legend iconType="circle" />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              backgroundColor: colors.utils.pbg,
              borderColor: colors.neutral1[6],
              borderRadius: '8px',
            }}
            itemStyle={{ color: colors.neutral[900] }}
            formatter={(value: number) => `${commaFormatted(value)} sats`}
          />
        </PieChart>
      )}
    </HStack>
  )
}
