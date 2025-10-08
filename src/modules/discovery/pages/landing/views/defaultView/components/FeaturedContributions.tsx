import { Badge, HStack, Icon, Image } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { PiArrowFatLineRightFill } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar.tsx'
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
  useProjectThumbnailImageQuery,
} from '@/types/index.ts'
import { commaFormatted } from '@/utils/index.ts'

const ITEM_LIMIT = 10
const MINIMUM_CONTRIBUTION_AMOUNT = 100000 // 100K sats

/** Helper function to get color scheme based on contribution age */
const getContributionColorScheme = (createdAt: number): string => {
  const now = Date.now()
  const contributionTime = createdAt
  const timeDiffInMs = now - contributionTime
  const oneMinuteInMs = 60 * 1000
  const oneHourInMs = 60 * 60 * 1000

  if (timeDiffInMs <= oneMinuteInMs) {
    return 'error'
  }

  if (timeDiffInMs <= oneHourInMs) {
    return 'warning'
  }

  return 'primary1'
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
}: {
  contribution: ContributionForLandingPageFragment
  textMaxWidth?: string
}) => {
  const { user } = contribution.funder

  const navigate = useNavigate()
  const { data, loading } = useProjectThumbnailImageQuery({
    variables: {
      where: {
        id: contribution.projectId,
      },
    },
    onError(error) {
      console.log('error', error)
    },
  })

  const project = data?.projectGet
  const colorScheme = getContributionColorScheme(contribution.createdAt)

  if (loading || !project) {
    return null
  }

  return (
    <Badge
      as={HStack}
      colorScheme={colorScheme}
      variant="surface"
      size="lg"
      onClick={() => navigate(getPath('project', project.name))}
      _hover={{
        cursor: 'pointer',
      }}
    >
      <Body size="sm" light>
        {commaFormatted(contribution.amount)} sats
      </Body>
      <HStack>
        <ProfileAvatar
          src={user?.imageUrl || ''}
          guardian={user?.guardianType}
          height="18px"
          width="18px"
          wrapperProps={{
            padding: '1px',
            height: '20px',
            width: '20px',
          }}
        />
        <ProfileText guardian={user?.guardianType} maxWidth={textMaxWidth} isTruncated>
          {user?.username || t('Anonymous')}
        </ProfileText>
      </HStack>
      <Icon as={PiArrowFatLineRightFill} />
      <HStack>
        <Image src={project?.thumbnailImage || ''} height="18px" width="18px" borderRadius="4px" objectFit="cover" />
        <Body size="sm" light isTruncated maxWidth={textMaxWidth}>
          {project.title}
        </Body>
      </HStack>
    </Badge>
  )
}
