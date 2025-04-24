import { HStack, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactLink } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography'
import { isDraft, isPrelaunch } from '@/utils/index.ts'

import { getPath } from '../../../../../shared/constants'

export const ProjectCreateCompleted = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  return (
    <VStack w="100%" spacing={4}>
      <Body mb={2}>
        {isDraft(project?.status) &&
          t(
            'Your project is almost live. You can now either launch the project and make it public or save it as draft. And you can always edit project at any time.',
          )}
        {isPrelaunch(project?.status) && t('Your project is almost live. You can launch the project now.')}
      </Body>
      {children}
      <HStack w="100%" spacing={2} mt={2}>
        <Body size={'sm'} light textAlign="left">
          <Trans i18nKey={"By continuing, I agree with Geyser's <1>Terms & Conditions</1>"}>
            {"By continuing, I agree with Geyser's "}
            <ReactLink style={{ textDecoration: 'underline' }} to={getPath('legalTerms')} target="_blank">
              Terms & Conditions
            </ReactLink>
          </Trans>
        </Body>
      </HStack>
    </VStack>
  )
}
