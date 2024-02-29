import { Button, Link, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { Body1, H3 } from '../../../../components/typography'
import { BetaBox } from '../../../../components/ui'
import { FlashGeyserUrl, projectsWithSubscription, subscriptionJoinUrl } from '../../../../constants'
import { useMobileMode } from '../../../../utils'
import { LandingSubscriptionCard } from '../../components'
import { ProjectRowLayout } from '../elements'

export const SubscribeToProjects = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  return (
    <ProjectRowLayout
      title={
        <H3>
          {t('Subscribe to Projects')} <BetaBox />
        </H3>
      }
      width="100%"
      seeAllText={t('See more')}
      seeAllProps={{
        as: Link,
        href: FlashGeyserUrl,
        isExternal: true,
        textDecoration: 'none',
      }}
    >
      <Stack width="100%" direction={{ base: 'column', xl: 'row' }} spacing="20px">
        {projectsWithSubscription.map((projectName) => {
          return <LandingSubscriptionCard key={projectName} projectName={projectName} />
        })}
      </Stack>
      <CardLayout
        noborder={!isMobile}
        direction="row"
        w="full"
        alignItems={'center'}
        padding={'10px'}
        pb={{ base: '10px', lg: '0px' }}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Body1>{t('Want to integrate subscriptions?')} </Body1>
        <Button
          maxWidth="300px"
          minWidth="100px"
          flex={1}
          as={Link}
          href={subscriptionJoinUrl}
          textDecoration="none"
          variant="secondaryNeutral"
          bgColor={'neutral.100'}
        >
          {t('Join Beta')}
        </Button>
      </CardLayout>
    </ProjectRowLayout>
  )
}
