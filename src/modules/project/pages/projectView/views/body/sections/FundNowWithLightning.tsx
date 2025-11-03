import { HStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { LightningIcon } from '@/assets'
import { getAppEndPoint } from '@/config/domain.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { ID } from '@/shared/constants/components/id.ts'
import { encodeLNURL } from '@/utils/index.ts'

import { BodySectionLayout } from '../components/BodySectionLayout.tsx'
import { LightningAddress } from './header/components/LightningAddress.tsx'
import { ProjectShareQrCodeComponent } from './header/shareModal/components/ProjectShareBanner.tsx'

const QR_SIZE = 200
const LOGO_SIZE = 24

export const FundNowWithLightning = () => {
  const { project } = useProjectAtom()
  const endPoint = getAppEndPoint()
  const lnurlPayUrl = encodeLNURL(`${endPoint}/lnurl/pay?projectId=${project.id}`)
  return (
    <BodySectionLayout title={t('Fund now with lightning')}>
      <CardLayout w="full" id={ID.project.fundNow.container}>
        <Body>⚡ {t('Fund instantly with lightning and transactions show on the Contribution tab instantly')}</Body>
        <HStack w="full" justifyContent="center" alignItems="center">
          <ProjectShareQrCodeComponent
            qrCodeValue={lnurlPayUrl}
            centerLogo={LightningIcon}
            qrSize={QR_SIZE}
            logoSize={LOGO_SIZE}
          />
        </HStack>
        <LightningAddress name={project.name} containerProps={{ w: 'full', flexDirection: 'column', gap: 4 }} />
      </CardLayout>
    </BodySectionLayout>
  )
}
