import { Link, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'
import { ProjectMatchingFragment } from '@/types'

import { normalizeProjectMatchingUrl } from '../utils/projectMatching'

type ProjectMatchingTooltipContentProps = {
  matching: ProjectMatchingFragment
  committedAmountLabel: string
}

export const ProjectMatchingTooltipContent = ({
  matching,
  committedAmountLabel,
}: ProjectMatchingTooltipContentProps) => {
  const sponsorUrl = normalizeProjectMatchingUrl(matching.sponsorUrl)

  return (
    <VStack alignItems="start" spacing={4}>
      <Body size="sm" light whiteSpace="normal">
        Contributions on this project are being matched by{' '}
        {sponsorUrl ? (
          <Link href={sponsorUrl} isExternal textDecoration="underline">
            {matching.sponsorName}
          </Link>
        ) : (
          <Body as="span" size="sm" light textDecoration="underline">
            {matching.sponsorName}
          </Body>
        )}
        .
      </Body>
      <Body size="sm" light whiteSpace="normal">
        The sponsor has committed to double every contribution up to a total of {committedAmountLabel}.
      </Body>
    </VStack>
  )
}
