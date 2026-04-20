import { Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiClockCountdownFill } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback } from '@/shared/molecules/Feedback.tsx'
import { FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

export const AonNotice = () => {
  const { isProjectOwner, isAon } = useProjectAtom()

  if (isProjectOwner || !isAon) {
    return null
  }

  return (
    <Feedback variant={FeedBackVariant.PRIORITY} icon={<Icon as={PiClockCountdownFill} boxSize={7} />}>
      <Body>{t('These products are part of an all-or-nothing campaign. You’re only charged if it’s funded.')}</Body>
    </Feedback>
  )
}
