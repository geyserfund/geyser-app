import { Image, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { Body1 } from '../../../../../../../components/typography'
import { ProjectNoTransactionImageUrl } from '../../../../../../../shared/constants'
import { deactivatedAffiliateLinksAtom } from '../../../../../state/affiliateAtom'
import { AffiliateTable, AffiliateTableSkeleton } from '../components/AffiliateTable'

export const DeactivatedAffiliateList = ({ loading }: { loading?: boolean }) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  const deactivatedAffiliateList = useAtomValue(deactivatedAffiliateLinksAtom)

  if (!project) return null

  if (loading) return <AffiliateTableSkeleton />

  if (!deactivatedAffiliateList.length) {
    return (
      <VStack w="full" alignItems="center" pt="40px" spacing="20px">
        <Image src={ProjectNoTransactionImageUrl} maxHeight="200px" objectFit={'cover'} />
        <Body1>{t('No disabled affiliates link yet.')}</Body1>
      </VStack>
    )
  }

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px" alignItems="center">
      <AffiliateTable data={deactivatedAffiliateList} isDisabled projectName={project.name} />
    </VStack>
  )
}
