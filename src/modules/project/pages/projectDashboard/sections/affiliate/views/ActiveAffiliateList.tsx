import { VStack } from '@chakra-ui/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DeleteConfirmModal } from '../../../../../../../components/molecules'
import { Body1 } from '../../../../../../../components/typography'
import { useModal } from '../../../../../../../hooks'
import { useAffiliateLinkDisableMutation } from '../../../../../../../types'
import { activeAffiliateLinksAtom, disableAffiliateLinkAtom } from '../affiliateAtom'
import { AffiliateTable } from '../components/AffiliateTable'

export const ActiveAffiliateList = () => {
  const { t } = useTranslation()

  const activeAffiliateList = useAtomValue(activeAffiliateLinksAtom)

  const disableAffiliateLink = useSetAtom(disableAffiliateLinkAtom)

  const [selectedAffiliateLinkId, setSelectedAffiliateLinkId] = useState<number | null>(null)

  const deleteConfirmModal = useModal()

  const [disableAffiliateLinkMutation] = useAffiliateLinkDisableMutation({
    onCompleted(data) {
      if (data.affiliateLinkDisable.id) {
        disableAffiliateLink(data.affiliateLinkDisable.id)
        deleteConfirmModal.onClose()
      }
    },
  })

  const handleDisableAffiliateLink = (id: number) => {
    setSelectedAffiliateLinkId(id)
    deleteConfirmModal.onOpen()
  }

  if (!activeAffiliateList.length) {
    return <Body1>{t('No affiliates link yet, Please create one')}</Body1>
  }

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px" alignItems="center">
      <AffiliateTable data={activeAffiliateList} onDelete={handleDisableAffiliateLink} />
      <DeleteConfirmModal
        title={t('Are you sure you want to disable this affiliate link?')}
        description={t('Deactivating an affiliate link is permanent and cannot be reversed. ')}
        {...deleteConfirmModal}
        confirm={() =>
          disableAffiliateLinkMutation({
            variables: {
              affiliateLinkId: selectedAffiliateLinkId,
            },
          })
        }
      />
    </VStack>
  )
}

// export const PaymentsAndAccoutningListSkeleton = () => {
//   return (
//     <VStack width="100%" flexGrow={1} pt={'30px'} spacing="10px">
//       <VStack w="full" spacing="10px">
//         <SkeletonLayout borderRadius={0} height="30px" />
//         <VStack w="full" spacing="60px">
//           <SkeletonLayout borderRadius={0} height="60px" />
//           <SkeletonLayout borderRadius={0} height="60px" />
//           <SkeletonLayout borderRadius={0} height="60px" />
//           <SkeletonLayout borderRadius={0} height="60px" />
//         </VStack>
//       </VStack>
//       <HStack w="full" px={standardPadding}>
//         <SkeletonLayout height="40px" />
//       </HStack>
//     </VStack>
//   )
// }
