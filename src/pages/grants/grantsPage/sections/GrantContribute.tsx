import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'

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
      <H3 size="lg" alignSelf="start">
        {t('Contribute')}
      </H3>
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
