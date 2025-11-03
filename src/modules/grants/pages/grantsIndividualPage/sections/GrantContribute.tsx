import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'

import { GrantItemTitle } from '../components/GrantItemTitle.tsx'

export const GrantContribute = ({
  grantProjectName,
  grantTitle,
  grantHasVoting,
}: {
  grantProjectName?: string
  grantTitle: string
  grantHasVoting?: boolean
}) => {
  const { t } = useTranslation()
  return (
    <CardLayout noMobileBorder w="full" p={{ base: '10px', lg: '20px' }} alignItems="center">
      <GrantItemTitle>{t('Contribute')}</GrantItemTitle>
      <Body>
        {t('Contribute directly to {{title}} Grant via QR code (lightning and onchain)').replace(
          '{{title}}',
          grantTitle,
        )}
        {'. '}
        {grantHasVoting
          ? t('Grant funds will be distributed based on community votes.')
          : t('Grant funds will be distributed by principled bitcoin board members.')}
      </Body>
      {grantProjectName && (
        <Button variant="solid" colorScheme="primary1" as={Link} to={getPath('fundingStart', grantProjectName)}>
          {t('Contribute')}
        </Button>
      )}
    </CardLayout>
  )
}
