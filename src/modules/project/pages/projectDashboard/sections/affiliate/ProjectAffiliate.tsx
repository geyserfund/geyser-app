import { Button, HStack, Stack, useDisclosure, VStack } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Modal } from '../../../../../../components/layouts'
import { Body1 } from '../../../../../../components/typography'
import { useModal } from '../../../../../../hooks'
import { useAffiliateLinksGetQuery } from '../../../../../../types'
import { useProjectContext } from '../../../../context'
import { affiliateLinksAtom } from './affiliateAtom'
import { AffiliateForm } from './components/AffiliateForm'
import { ActiveAffiliateList } from './views/ActiveAffiliateList'
import { DeactivatedAffiliateList } from './views/DeactivatedAffiliateList'

export const ProjectAffiliate = () => {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  const { isOpen: isDisabledView, onOpen: openDisabledView, onClose: openActiveView } = useDisclosure()

  const affiliateCreateFormModal = useModal()

  const setAffiliateLinks = useSetAtom(affiliateLinksAtom)

  const { loading } = useAffiliateLinksGetQuery({
    skip: !project || !project.id,
    variables: {
      input: {
        where: {
          projectId: project?.id,
        },
      },
    },
    onCompleted(data) {
      if (data.affiliateLinksGet) {
        setAffiliateLinks(data.affiliateLinksGet)
      }
    },
  })

  if (!project) return null

  return (
    <>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1} position="relative">
        <HStack w="100%" justifyContent="space-between" spacing="20px">
          <Body1 flex={1}>
            {t(
              "Enhance your project's growth and sales with affiliate partners and maintain full control over affiliate terms on this dashboard. Each link can be created only once and cannot be updated except for its label.",
            )}
          </Body1>
        </HStack>
        <Stack direction={{ base: 'column-reverse', lg: 'row' }} w="full" justifyContent="space-between" spacing="20px">
          <HStack w={{ base: 'full', lg: 'auto' }}>
            <Button
              variant="secondary"
              borderColor={!isDisabledView ? 'primary.400' : undefined}
              onClick={openActiveView}
              minWidth="200px"
              flex={1}
            >
              {t('Active')}
            </Button>
            <Button
              variant="secondary"
              borderColor={isDisabledView ? 'primary.400' : undefined}
              onClick={openDisabledView}
              minWidth="200px"
              flex={1}
            >
              {t('Disabled')}
            </Button>
          </HStack>

          <Button
            paddingX="20px"
            width={{ base: 'full', lg: 'auto' }}
            variant="primary"
            onClick={affiliateCreateFormModal.onOpen}
          >
            {t('Add affiliate')}
          </Button>
        </Stack>

        {!isDisabledView ? <ActiveAffiliateList loading={loading} /> : <DeactivatedAffiliateList loading={loading} />}
      </VStack>

      <Modal title={t('Add affiliate')} {...affiliateCreateFormModal} size="lg">
        <AffiliateForm onCompleted={affiliateCreateFormModal.onClose} />
      </Modal>
    </>
  )
}
