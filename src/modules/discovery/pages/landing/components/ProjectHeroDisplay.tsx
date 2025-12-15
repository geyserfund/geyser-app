import { HStack, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { RankMedal } from '@/shared/components/display/RankMedal'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'
import { getPathWithGeyserHero } from '@/shared/constants'
import { FormatCurrencyType } from '@/shared/utils/hooks/useCurrencyFormatter'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { GlobalProjectLeaderboardRow } from '@/types'
import { getShortAmountLabel } from '@/utils'

export const ProjectHeroDisplay = ({ project, index }: { project: GlobalProjectLeaderboardRow; index: number }) => {
  const { formatAmount } = useCurrencyFormatter()
  return (
    <HStack flex={1} overflow={'hidden'} minWidth={'250px'} maxWidth={{ base: 'full', lg: '335px' }}>
      <HStack justifyContent={'start'} minWidth="32px">
        <RankMedal rank={index + 1} boxSize={'32px'} size="20px" />
      </HStack>
      <HStack
        as={Link}
        to={getPathWithGeyserHero('project', project.projectName)}
        flex={1}
        overflow={'hidden'}
        _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
        borderRadius="16px"
        paddingRight={2}
      >
        <ImageWithReload
          borderRadius={'16px'}
          height="64px"
          width="64px"
          src={project.projectThumbnailUrl}
          alt={`${project.projectTitle} project thumbnail image`}
        />
        <VStack w="full" overflow="hidden" flex={1} spacing={0} alignItems="start">
          <Body w="full" bold isTruncated>
            {project.projectTitle}
          </Body>
          <Body size="sm" medium isTruncated>
            {`${formatAmount(project.contributionsTotalUsd, FormatCurrencyType.Usd)} `}
            <Body as="span" light>{`(${getShortAmountLabel(project.contributionsTotal)} sats)`}</Body>
          </Body>
        </VStack>
      </HStack>
    </HStack>
  )
}

export const ProjectHeroDisplaySkeleton = () => {
  return (
    <HStack flex={1} overflow={'hidden'} minWidth={'250px'} maxWidth={{ base: 'full', lg: '335px' }}>
      <HStack justifyContent={'start'} minWidth="32px">
        <SkeletonLayout height="32px" width="32px" />
      </HStack>
      <HStack
        flex={1}
        overflow={'hidden'}
        _hover={{ cursor: 'pointer', backgroundColor: 'neutral1.3' }}
        borderRadius="16px"
        paddingRight={2}
      >
        <SkeletonLayout borderRadius={'16px'} height="64px" width="64px" />
        <VStack w="full" overflow="hidden" flex={1} spacing={1} alignItems="start">
          <SkeletonLayout height="24px" width="150px" />
          <SkeletonLayout height="18px" width="50px" />
        </VStack>
      </HStack>
    </HStack>
  )
}
