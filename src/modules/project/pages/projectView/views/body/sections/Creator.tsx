import { Box } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'

import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { BodySectionLayout } from '../components'
import { CreatorSocial } from './header/components/CreatorSocial'

/** Displays project creator details and the creator bio when available. */
export const Creator = () => {
  const { loading, projectOwner } = useProjectAtom()
  const creatorBio = projectOwner?.user?.bio

  if (loading || !projectOwner?.user) {
    return null
  }

  return (
    <BodySectionLayout title={t('Creator')}>
      <CardLayout w="full" spacing={3} paddingX={{ base: 3, lg: 5 }} paddingY={{ base: 3, lg: 4 }}>
        <CreatorSocial />
        {creatorBio && (
          <Box w="full">
            <Body size="sm" light noOfLines={2}>
              {creatorBio}
            </Body>
          </Box>
        )}
      </CardLayout>
    </BodySectionLayout>
  )
}
