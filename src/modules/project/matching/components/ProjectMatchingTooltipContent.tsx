import { Link, VStack } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { t } from 'i18next'

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
        <Trans
          i18nKey="Contributions on this project are being matched by <sponsor>{{sponsorName}}</sponsor>."
          values={{ sponsorName: matching.sponsorName }}
          components={{
            sponsor: sponsorUrl ? (
              <Link href={sponsorUrl} isExternal textDecoration="underline" />
            ) : (
              <Body as="span" size="sm" light textDecoration="underline" />
            ),
          }}
        />
      </Body>
      <Body size="sm" light whiteSpace="normal">
        {t('The sponsor has committed to doubling every contribution up to a total of {{committedAmountLabel}}.', {
          committedAmountLabel,
        })}
      </Body>
    </VStack>
  )
}
