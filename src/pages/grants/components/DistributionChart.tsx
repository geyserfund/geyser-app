import { Box, BoxProps, Text } from '@chakra-ui/react'

import { H3 } from '../../../components/typography'
import { colors } from '../../../styles'
import { Project } from '../../../types'
import { SectionCard } from './SectionCard'

const CHART_BAR_COLORS = [
  colors.primary900,
  colors.primary700,
  colors.primary500,
  colors.primary400,
  colors.primary100,
]

interface Props {
  // @TODO: remove percentage prop once grants pass this info
  projects: Array<Project & { percentage: number }>
}

export const DistributionChart = ({ projects }: Props) => {
  const maxPercentage = Math.max(
    ...projects.map((project) => project.percentage),
  )
  return (
    <SectionCard p={5}>
      <H3>Grant distribution status</H3>
      <Box py={2}>
        {projects
          .sort((a, b) => {
            return a.percentage < b.percentage ? 1 : -1
          })
          .map((project, i) => (
            <Item
              key={project.id}
              bg={CHART_BAR_COLORS[i]}
              title={project.title}
              percentage={project.percentage}
              width={Math.trunc((project.percentage * 100) / maxPercentage)}
            />
          ))}
      </Box>
    </SectionCard>
  )
}

const Item = ({
  bg,
  title,
  width,
  percentage,
}: {
  bg: string
  title: string
  width: number
  percentage: number
}) => {
  return (
    <Box pt={1} alignItems="center" justifyContent="start" display="flex">
      <Box pr={3} maxWidth="186px" width="50%">
        <Text isTruncated={true} whiteSpace="nowrap" fontWeight={500}>
          {title}
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="start"
        flexGrow={1}
      >
        <ChartBar bg={bg} width={`${width}%`}>
          {percentage}%
        </ChartBar>
      </Box>
    </Box>
  )
}

const ChartBar = ({
  width,
  bg,
  children,
}: Pick<BoxProps, 'width' | 'bg' | 'children'>) => (
  <Box width={width}>
    <Box display="flex" flexGrow={1} alignItems="center">
      <Box
        width="90%"
        height="16px"
        bg={bg}
        borderTopRightRadius="8px"
        borderBottomRightRadius="8px"
      >
        &nbsp;
      </Box>
      <Text ml={2} fontSize="18px" fontWeight={700} overflowWrap="normal">
        {children}
      </Text>
    </Box>
  </Box>
)
