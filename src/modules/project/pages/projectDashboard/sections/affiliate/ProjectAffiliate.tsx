import { AddIcon } from '@chakra-ui/icons'
import { Button, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
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

  if (loading) return <div>Loading...</div>

  return (
    <>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1} position="relative">
        <HStack w="100%" justifyContent="space-between">
          <Body1 flex={1}>
            {t(
              'Create and manage affiliate links. Each link can be created only once and cannot be updated except for its label.',
            )}
          </Body1>

          <Button variant="primary" leftIcon={<AddIcon />} onClick={affiliateCreateFormModal.onOpen}>
            {t('Create new affiliate')}
          </Button>
        </HStack>

        <Tabs colorScheme="teal" w="full">
          <TabList>
            <Tab>Active links</Tab>
            <Tab>Disabled links</Tab>
          </TabList>

          <TabPanels>
            <TabPanel padding={0}>
              <ActiveAffiliateList />
            </TabPanel>
            <TabPanel>
              <DeactivatedAffiliateList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      <Modal title={'Create new Affiliate'} {...affiliateCreateFormModal}>
        <AffiliateForm onCompleted={affiliateCreateFormModal.onClose} />
      </Modal>
    </>
  )
}
