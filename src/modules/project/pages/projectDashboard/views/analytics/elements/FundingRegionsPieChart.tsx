import { HStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { ProjectViewBaseStats } from '@/types'
import { commaFormatted, useCustomTheme } from '@/utils'

import { useColorByIndex } from '../hooks/useColorByIndex'
import { ActiveShapeComponent } from './ActiveShapeComponent'

export const FundingRegionsPieChart = ({ data, loading }: { data: ProjectViewBaseStats[]; loading?: boolean }) => {
  const { colors } = useCustomTheme()
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

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
            dataKey="viewCount"
            nameKey="value"
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
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getColorByIndex(index)} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            formatter={(value: string) => <span style={{ color: colors.neutral1[11] }}>{value}</span>}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              backgroundColor: colors.utils.pbg,
              borderColor: colors.neutral1[6],
              borderRadius: '8px',
            }}
            labelStyle={{ color: colors.neutral1[11] }}
            itemStyle={{ color: colors.utils.text }}
            formatter={(value: number) => `${commaFormatted(value)} sats`}
          />
        </PieChart>
      )}
    </HStack>
  )
}
