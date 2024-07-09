import { HStack, Image, VStack } from '@chakra-ui/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal } from '../../../../../../../components/layouts'
import { DeleteConfirmModal } from '../../../../../../../components/molecules'
import { Body1 } from '../../../../../../../components/typography'
import { ProjectNoTransactionImageUrl } from '../../../../../../../constants'
import { useModal } from '../../../../../../../hooks'
import { ProjectAffiliateLinkFragment, useAffiliateLinkDisableMutation } from '../../../../../../../types'
import { useProjectContext } from '../../../../../context'
import { activeAffiliateLinksAtom, disableAffiliateLinkAtom } from '../affiliateAtom'
import { AffiliateForm } from '../components/AffiliateForm'
import { AffiliateTable, AffiliateTableSkeleton } from '../components/AffiliateTable'

export const ActiveAffiliateList = ({ loading }: { loading?: boolean }) => {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  const activeAffiliateList = useAtomValue(activeAffiliateLinksAtom)

  const disableAffiliateLink = useSetAtom(disableAffiliateLinkAtom)

  const [selectedAffiliateLink, setSelectedAffiliateLink] = useState<ProjectAffiliateLinkFragment>()

  const deleteConfirmModal = useModal()
  const editAffiliateLinkModal = useModal()

  const [disableAffiliateLinkMutation] = useAffiliateLinkDisableMutation({
    onCompleted(data) {
      if (data.affiliateLinkDisable.id) {
        disableAffiliateLink(data.affiliateLinkDisable.id)
        setSelectedAffiliateLink(undefined)
        deleteConfirmModal.onClose()
      }
    },
  })

  const handleDisableAffiliateLink = (val: ProjectAffiliateLinkFragment) => {
    setSelectedAffiliateLink(val)
    deleteConfirmModal.onOpen()
  }

  const handleEditAffiliateLink = (val: ProjectAffiliateLinkFragment) => {
    setSelectedAffiliateLink(val)
    editAffiliateLinkModal.onOpen()
  }

  if (!project) return null

  if (loading) return <AffiliateTableSkeleton />

  if (!activeAffiliateList.length) {
    return (
      <VStack w="full" alignItems="center" pt="40px" spacing="20px">
        <Image src={ProjectNoTransactionImageUrl} maxHeight="200px" objectFit={'cover'} />
        <Body1>{t('No affiliates link yet, Please create one')}</Body1>
      </VStack>
    )
  }

  return (
    <VStack width="100%" flexGrow={1} pt={'10px'} spacing="10px" alignItems="center">
      <AffiliateTable
        data={activeAffiliateList}
        onDelete={handleDisableAffiliateLink}
        onEdit={handleEditAffiliateLink}
        projectName={project.name}
      />
      <DeleteConfirmModal
        title={t('Are you sure you want to disable this affiliate link?')}
        description={t('Disabling an affiliate link is permanent and cannot be reversed. ')}
        {...deleteConfirmModal}
        confirm={() =>
          disableAffiliateLinkMutation({
            variables: {
              affiliateLinkId: selectedAffiliateLink?.id,
            },
          })
        }
      />
      <Modal title={t('Edit Affiliate')} {...editAffiliateLinkModal}>
        <AffiliateForm onCompleted={editAffiliateLinkModal.onClose} isEdit affiliate={selectedAffiliateLink} />
      </Modal>
    </VStack>
  )
}
