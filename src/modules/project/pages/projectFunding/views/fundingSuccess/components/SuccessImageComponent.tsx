import { Avatar, HStack, Image, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { useAuthContext } from '@/context'
import { fundingInputAfterRequestAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body, H3 } from '@/shared/components/typography'
import {
  ContributionSuccessIllustrationPendingUrl,
  ContributionSuccessIllustrationUrl,
} from '@/shared/constants/index.ts'

import { BecomeAnAmbassador } from './BecomeAmbassador.tsx'
import { ContributionStatusSection } from './ContributionStatusSection.tsx'
import { SubscribeToGeyser } from './SubscribeToGeyser.tsx'

export const SuccessImageComponent = ({ isPending }: { isPending: boolean }) => {
  return (
    <VStack w="full" alignItems="start" spacing={12}>
      <SuccessfulContributionBanner isPending={isPending} />
      <SubscribeToGeyser />
      <BecomeAnAmbassador />
    </VStack>
  )
}

const SuccessfulContributionBanner = ({ isPending }: { isPending: boolean }) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const { user: loggedInUser } = useAuthContext()

  const fundingInputAfterRequest = useAtomValue(fundingInputAfterRequestAtom)

  const user = loggedInUser || fundingInputAfterRequest?.user

  if (!project) {
    return null
  }

  return (
    <VStack
      id="successful-contribution-banner"
      w="full"
      spacing={4}
      justifyContent="center"
      backgroundColor="utils.pbg"
    >
      <Image
        height="140px"
        src={isPending ? ContributionSuccessIllustrationPendingUrl : ContributionSuccessIllustrationUrl}
        alt="Contribution success"
      />
      <HStack spacing={2} zIndex={1}>
        {user.imageUrl && <Avatar src={user.imageUrl || ''} size="md" />}
        <Body light size="2xl" medium>
          {user.username}
        </Body>
      </HStack>

      <VStack w="full" spacing={1} zIndex={1}>
        <H3 light fontSize="2xl" regular w="full" textAlign={'center'}>
          {isPending
            ? user.username
              ? t('successfully submitted contribution to')
              : t('You successfully submitted contribution to')
            : user.username
            ? t('successfully contributed to')
            : t('You successfully contributed to')}
        </H3>
        <H3 dark bold fontSize="4xl" textAlign="center">
          {project.title}
        </H3>
      </VStack>
      <ContributionStatusSection isPending={isPending} />
    </VStack>
  )
}
