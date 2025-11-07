import { Badge, BadgeProps, HStack, Icon, Image } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { PiArrowFatLineRightFill } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { ProfileText } from '@/shared/components/display/ProfileText.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook.tsx'
import {
  ContributionForLandingPageFragment,
  GetContributionsOrderByInput,
  GetContributionsWhereInput,
  LandingPageFeaturedContributionsGetQueryVariables,
  OrderByOptions,
  useLandingPageFeaturedContributionsGetQuery,
} from '@/types/index.ts'
import { commaFormatted } from '@/utils/index.ts'

const ITEM_LIMIT = 10
const MINIMUM_CONTRIBUTION_AMOUNT = 50000 // 100K sats

/** Helper function to get color scheme based on contribution age */
const getContributionColorScheme = (amount: number): string => {
  if (amount >= 100000) {
    return 'orange'
  }

  return 'blue'
}

export const FeaturedContributions = () => {
  const [contributions, setContributions] = useState<ContributionForLandingPageFragment[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const where = {
    amountGreaterOrEqual: MINIMUM_CONTRIBUTION_AMOUNT,
  } as GetContributionsWhereInput

  const orderBy = {
    createdAt: OrderByOptions.Desc,
  } as GetContributionsOrderByInput

  const variables = {
    input: {
      orderBy,
      pagination: {
        take: ITEM_LIMIT,
      },
      where,
    },
  } as LandingPageFeaturedContributionsGetQueryVariables

  const { fetchMore } = useLandingPageFeaturedContributionsGetQuery({
    variables,
    onCompleted(data) {
      handleDataUpdate(data.contributionsGet?.contributions || [])
    },
    onError(error) {
      console.log('useLandingPageFeaturedContributionsGetQuery error', error)
    },
  })

  const { handleDataUpdate } = usePaginationAtomHook<ContributionForLandingPageFragment>({
    fetchMore,
    queryName: ['contributionsGet', 'contributions'],
    setData: setContributions,
    itemLimit: ITEM_LIMIT,
    variables: {},
    where,
    orderBy,
  })

  /** Auto-scroll effect with looping */
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer || contributions.length === 0) return

    const scrollSpeed = 1 // pixels per frame
    const scrollInterval = 30 // milliseconds

    const autoScroll = setInterval(() => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        // Reset to start when reaching the end
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += scrollSpeed
      }
    }, scrollInterval)

    return () => clearInterval(autoScroll)
  }, [contributions])

  return (
    <HStack
      ref={scrollContainerRef}
      w="full"
      overflowX="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      spacing={6}
    >
      {contributions.map((contribution) => (
        <ContributionCard key={contribution.id} contribution={contribution} />
      ))}
    </HStack>
  )
}

export const ContributionCard = ({
  contribution,
  textMaxWidth = '200px',
  size = 'md',
  ...rest
}: {
  contribution: ContributionForLandingPageFragment
  textMaxWidth?: string
  size?: 'md' | 'lg'
} & BadgeProps) => {
  const { user } = contribution.funder

  const navigate = useNavigate()

  const project = contribution.sourceResource?.__typename === 'Project' ? contribution.sourceResource : null
  const colorScheme = getContributionColorScheme(contribution.amount)

  if (!project) {
    return null
  }

  return (
    <Badge
      as={HStack}
      colorScheme={'neutral1'}
      variant="surface"
      size={size === 'lg' ? 'xl' : 'md'}
      onClick={() => navigate(getPath('project', project.name))}
      _hover={{
        cursor: 'pointer',
      }}
      height="28px"
      alignItems="center"
      paddingLeft={2}
      {...rest}
    >
      {colorScheme === 'orange' && (
        <Image
          height="20px"
          width="auto"
          marginBottom={'6px'}
          marginLeft="8px"
          src="https://storage.googleapis.com/geyser-projects-media/app/launch/Fire.gif"
        />
      )}

      <Body size="sm" dark bold>
        {commaFormatted(contribution.amount)} sats
      </Body>
      <HStack>
        <ProfileText guardian={user?.guardianType} maxWidth={textMaxWidth} isTruncated textTransform="none">
          {user?.username || t('anon')}
        </ProfileText>
      </HStack>

      <Icon as={PiArrowFatLineRightFill} />
      <HStack paddingRight={2}>
        <Body size="sm" dark isTruncated maxWidth={textMaxWidth} bold>
          {project.title}
        </Body>
      </HStack>
    </Badge>
  )
}
