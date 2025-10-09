import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Body, H3 } from '@/shared/components/typography'
import { FundingErrorInactiveProjectUrl, getPath } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { ErrorLayout } from './ErrorLayout'

export const FundingInactiveProject = ({
  creatorId,
  projectName,
}: {
  creatorId: number

  projectName: string
}) => {
  const { t } = useTranslation()
  return (
    <ErrorLayout
      url={FundingErrorInactiveProjectUrl}
      title={t('Inactive Project')}
      body={<Body>{t("Unfortunately, it looks like the project you're trying to fund has been deactivated.")}</Body>}
    >
      <Feedback variant={FeedBackVariant.INFO}>
        <VStack w="full" alignItems="start">
          <H3>{t('What now?')}</H3>
          <UnorderedList>
            <ListItem>
              <Body size="sm">
                <Trans
                  i18nKey={
                    'Occasionally, projects are temporarily deactivated. You might want to revisit the <1>project page</1> later.'
                  }
                >
                  {'Occasionally, projects are temporarily deactivated. You might want to revisit the '}
                  <Link to={getPath('projectRewards', `${projectName}`)} style={{ textDecoration: 'underline' }}>
                    project page
                  </Link>
                  {' later.'}
                </Trans>
              </Body>
            </ListItem>
            <ListItem>
              <Body size="sm">
                <Trans i18nKey={'Feel free to <1>contact the creator</1> to inform them of your funding attempt.'}>
                  {'Feel free to '}
                  <Link to={getPath('userProfile', `${creatorId}`)} style={{ textDecoration: 'underline' }}>
                    contact the creator
                  </Link>
                  {' to inform them of your funding attempt.'}
                </Trans>
              </Body>
            </ListItem>
            <ListItem>
              <Body size="sm">
                {t("If you need assistance, please don't hesitate to reach out to us for support.")}
              </Body>
            </ListItem>
          </UnorderedList>
        </VStack>
      </Feedback>
    </ErrorLayout>
  )
}
