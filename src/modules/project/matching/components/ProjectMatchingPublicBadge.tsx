import { Box, HStack, Icon, useColorModeValue } from '@chakra-ui/react'
import { PiInfoBold } from 'react-icons/pi'

import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { Body } from '@/shared/components/typography'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { ProjectMatchingFragment } from '@/types'

import { ProjectMatchingBadge } from './ProjectMatchingBadge'
import { ProjectMatchingTooltipContent } from './ProjectMatchingTooltipContent'
import { getProjectMatchingBadgeLabel } from '../utils/projectMatching'

type ProjectMatchingPublicBadgeProps = {
  matching: ProjectMatchingFragment
  showTooltip?: boolean
  variant?: 'default' | 'prominent' | 'discovery' | 'summaryBanner' | 'mobileBottomBanner'
}

export const ProjectMatchingPublicBadge = ({
  matching,
  showTooltip = false,
  variant = 'default',
}: ProjectMatchingPublicBadgeProps) => {
  const { formatAmount } = useCurrencyFormatter()
  const summaryBannerBg = useColorModeValue('primary1.3', 'primary1.4')
  const summaryBannerColor = useColorModeValue('primary1.12', 'primary1.12')
  const discoveryBadgeBg = useColorModeValue('primary1.3', 'primary1.4')
  const discoveryBadgeColor = useColorModeValue('primary1.12', 'primary1.12')

  const badge =
    variant === 'prominent' ? (
      <HStack
        bg="amber.3"
        color="amber.11"
        borderRadius="full"
        px={5}
        py={2}
        spacing={0.5}
        alignItems="center"
      >
        <Body size="md" bold color="amber.11" lineHeight="1">
          <ProjectMatchingBadge
            matchingType={matching.matchingType}
            bg="transparent"
            color="inherit"
            p={0}
            fontSize="inherit"
            fontWeight="inherit"
          />
        </Body>
        {showTooltip && <Icon as={PiInfoBold} boxSize={4} color="amber.11" flexShrink={0} ml={-0.5} />}
      </HStack>
    ) : variant === 'summaryBanner' ? (
      <HStack
        w="full"
        bg={summaryBannerBg}
        color={summaryBannerColor}
        borderTopRadius="8px"
        borderBottomRadius="0"
        px={4}
        py={2}
        spacing={0.5}
        justifyContent="center"
        alignItems="center"
      >
        <Body size="md" bold color="inherit" lineHeight="1">
          <ProjectMatchingBadge
            matchingType={matching.matchingType}
            bg="transparent"
            color="inherit"
            p={0}
            minH="unset"
            lineHeight="1"
            fontSize="inherit"
            fontWeight="inherit"
          />
        </Body>
        {showTooltip && <Icon as={PiInfoBold} boxSize={3.5} color="inherit" flexShrink={0} ml={-0.5} />}
      </HStack>
    ) : variant === 'mobileBottomBanner' ? (
      <HStack
        w="calc(100% + 24px)"
        marginX="-12px"
        bg={summaryBannerBg}
        color={summaryBannerColor}
        borderRadius="0"
        px={3}
        py={1}
        spacing={0.5}
        justifyContent="center"
        alignItems="center"
      >
        <Body size="sm" bold color="inherit" lineHeight="1">
          <ProjectMatchingBadge
            matchingType={matching.matchingType}
            bg="transparent"
            color="inherit"
            p={0}
            minH="unset"
            lineHeight="1"
            fontSize="inherit"
            fontWeight="inherit"
          />
        </Body>
        {showTooltip && <Icon as={PiInfoBold} boxSize={3} color="inherit" flexShrink={0} ml={-0.5} />}
      </HStack>
    ) : variant === 'discovery' ? (
      <HStack
        bg={discoveryBadgeBg}
        color={discoveryBadgeColor}
        borderRadius="md"
        px={2}
        py={1}
        spacing={1}
        boxShadow="sm"
        alignItems="center"
        flexShrink={0}
        maxW="100%"
      >
        <Body size="xs" fontWeight="semibold" color="inherit" isTruncated>
          {getProjectMatchingBadgeLabel(matching.matchingType)}
        </Body>
      </HStack>
    ) : (
      <ProjectMatchingBadge matchingType={matching.matchingType} />
    )

  if (!showTooltip) {
    return badge
  }

  return (
    <TooltipPopover
      content={
        <ProjectMatchingTooltipContent
          matching={matching}
          committedAmountLabel={formatAmount(matching.maxCapAmount, matching.referenceCurrency)}
        />
      }
    >
      {variant === 'summaryBanner' ? <Box w="full">{badge}</Box> : badge}
    </TooltipPopover>
  )
}
