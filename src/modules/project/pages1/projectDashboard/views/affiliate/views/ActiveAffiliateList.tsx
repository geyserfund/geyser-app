import { Image, VStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectAffiliateAPI } from '@/modules/project/API/useProjectAffiliateAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Modal } from '@/shared/components/layouts'

import { DeleteConfirmModal } from '../../../../../../../components/molecules'
import { Body1 } from '../../../../../../../components/typography'
import { ProjectNoTransactionImageUrl } from '../../../../../../../shared/constants'
import { useModal } from '../../../../../../../shared/hooks'
import { ProjectAffiliateLinkFragment } from '../../../../../../../types'
import { activeAffiliateLinksAtom } from '../../../../../state/affiliateAtom'
import { AffiliateForm } from '../components/AffiliateForm'
import { AffiliateTable, AffiliateTableSkeleton } from '../components/AffiliateTable'

export const ActiveAffiliateList = ({ loading }: { loading?: boolean }) => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  const activeAffiliateList = useAtomValue(activeAffiliateLinksAtom)

  const { disableAffiliateLink } = useProjectAffiliateAPI()

  const [selectedAffiliateLink, setSelectedAffiliateLink] = useState<ProjectAffiliateLinkFragment>()

  const deleteConfirmModal = useModal()
  const editAffiliateLinkModal = useModal()

  const handleDisableAffiliateLink = (val: ProjectAffiliateLinkFragment) => {
    setSelectedAffiliateLink(val)
    deleteConfirmModal.onOpen()
  }

  const handleEditAffiliateLink = (val: ProjectAffiliateLinkFragment) => {
    setSelectedAffiliateLink(val)
    editAffiliateLinkModal.onOpen()
  }

  const handleDeleteConfirmation = () => {
    disableAffiliateLink.execute({
      variables: {
        affiliateLinkId: selectedAffiliateLink?.id,
      },
      onCompleted(data) {
        if (data.affiliateLinkDisable.id) {
          setSelectedAffiliateLink(undefined)
          deleteConfirmModal.onClose()
        }
      },
    })
  }

  if (!project) return null

  if (loading) return <AffiliateTableSkeleton />

  if (!activeAffiliateList.length) {
    return (
      <VStack w="full" alignItems="center" pt="40px" spacing="20px">
        <Image src={ProjectNoTransactionImageUrl} maxHeight="200px" objectFit={'cover'} />
        <Body1>{t('No affiliates link yet, please create one.')}</Body1>
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
        description={t('Disabling an affiliate link is permanent and cannot be reversed.')}
        {...deleteConfirmModal}
        confirm={handleDeleteConfirmation}
      />
      <Modal title={t('Edit Affiliate')} {...editAffiliateLinkModal}>
        <AffiliateForm onCompleted={editAffiliateLinkModal.onClose} isEdit affiliate={selectedAffiliateLink} />
      </Modal>
    </VStack>
  )
}
