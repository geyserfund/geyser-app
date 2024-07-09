import { VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../../../../../components/typography'
import { deactivatedAffiliateLinksAtom } from '../affiliateAtom'
import { AffiliateTable } from '../components/AffiliateTable'

export const DeactivatedAffiliateList = () => {
  const { t } = useTranslation()

  const deactivatedAffiliateList = useAtomValue(deactivatedAffiliateLinksAtom)

  if (!deactivatedAffiliateList.length) {
    return <Body1>{t('No affiliates link yet, Please create one')}</Body1>
  }

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px" alignItems="center">
      <AffiliateTable data={deactivatedAffiliateList} isDisabled />
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
