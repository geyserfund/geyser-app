import { Trans } from 'react-i18next'
import { Link } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { isAllOrNothing } from '@/utils/index.ts'

export const AonGoToRefundPage = () => {
  const { project } = useProjectAtom()
  const { isLoggedIn } = useAuthContext()
  const isAon = isAllOrNothing(project)
  if (!isAon || isLoggedIn) {
    return null
  }

  return (
    <Feedback variant={FeedBackVariant.NEUTRAL}>
      <Body medium>
        <Trans i18nKey="If you've funded this project anonymously, you can claim a refund by <1>clicking here.</1>">
          {"If you've funded this project anonymously, you can claim a refund by "}
          <Body medium textDecoration="underline" as={Link} to={getPath('refundFile')}>
            {'clicking here.'}
          </Body>
        </Trans>
      </Body>
    </Feedback>
  )
}
