import { StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'
import { ProjectLeaderboardPeriod, useProjectLeaderboardAmbassadorsGetQuery } from '@/types'

import { NoAmbassadors } from '../../../body/sections/leaderboardSummary/components/NoAmbassadors'
import { AmbassadorItem, AmbassadorItemSkeleton } from './components/AmbassadorItem'

export const MAXIMUM_LEADERBOARD_ITEMS = 100

type AmabassadorListProps = {
  period: ProjectLeaderboardPeriod
  dateTime: DateTime
} & StackProps

export const AmabassadorList = ({ period, dateTime, ...props }: AmabassadorListProps) => {
  const { project } = useProjectAtom()

  const { data, loading } = useProjectLeaderboardAmbassadorsGetQuery({
    skip: !project.id,
    variables: {
      input: {
        period,
        projectId: project.id,
        top: MAXIMUM_LEADERBOARD_ITEMS,
      },
    },
  })

  const ambassadors = data?.projectLeaderboardAmbassadorsGet

  const id = 'ambassador-scroll-container'
  const firstElementId = 'first-element-id'

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(id)
      element?.scrollTo(0, 0)
      window.scrollTo(0, 0)
    }, 50)
  }, [period])

  if (loading) {
    return <AmabassadorListSkeleton />
  }

  if (!ambassadors || ambassadors?.length === 0) {
    return <NoAmbassadors />
  }

  return (
    <VStack w="full" h="full" id={id} overflowY={{ base: undefined, lg: 'auto' }} {...props}>
      <Body size="sm" light w={'full'} textAlign={'left'} paddingX={{ base: 0, lg: 6 }}>
        {t('Individuals who spread the word about Geyser projects by sharing.')}
      </Body>
      {ambassadors.map((ambassador, index) => {
        return (
          <AmbassadorItem
            id={index === 0 ? firstElementId : undefined}
            key={ambassador.user?.id}
            ambassador={ambassador}
            rank={index + 1}
            paddingX={{ base: 0, lg: 6 }}
          />
        )
      })}
    </VStack>
  )
}

const AmabassadorListSkeleton = () => {
  return (
    <VStack w="full" h="full" overflowY={{ base: undefined, lg: 'auto' }}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return <AmbassadorItemSkeleton key={item} />
      })}
    </VStack>
  )
}
