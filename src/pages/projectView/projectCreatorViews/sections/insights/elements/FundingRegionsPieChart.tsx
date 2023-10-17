import { HStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

import { SkeletonLayout } from '../../../../../../components/layouts'
import { Body1 } from '../../../../../../components/typography'
import { ProjectViewBaseStats } from '../../../../../../types'
import { useCustomTheme } from '../../../../../../utils'
import { getColorByIndex } from '../helpers'
import { ActiveShapeComponent } from './ActiveShapeComponent'

export const FundingRegionsPieChart = ({
  data,
  loading,
}: {
  data: ProjectViewBaseStats[]
  loading?: boolean
}) => {
  const { colors } = useCustomTheme()
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const [activeIndex, setActiveIndex] = useState<number>()

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <HStack ref={ref} w="full" spacing="20px" wrap="wrap">
      {loading ? (
        <SkeletonLayout width="full" height="300px" />
      ) : data.length === 0 ? (
        <Body1>{t('No data available')}</Body1>
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
            paddingAngle={5}
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
          <Legend iconType="circle" />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              backgroundColor: colors.neutral[0],
              borderColor: colors.neutral[200],
              borderRadius: '8px',
            }}
            itemStyle={{ color: colors.neutral[900] }}
          />
        </PieChart>
      )}
    </HStack>
  )
}
