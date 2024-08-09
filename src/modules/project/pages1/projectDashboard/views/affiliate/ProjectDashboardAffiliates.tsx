import { Button, ButtonProps, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectAffiliateAPI } from '@/modules/project/API/useProjectAffiliateAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Modal } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { Body } from '@/shared/components/typography'

import { useModal } from '../../../../../../shared/hooks'
import { DashboardLayout } from '../../common'
import { AffiliateForm } from './components/AffiliateForm'
import { ActiveAffiliateList } from './views/ActiveAffiliateList'
import { DeactivatedAffiliateList } from './views/DeactivatedAffiliateList'

export const ProjectDashboardAffiliates = () => {
  const { t } = useTranslation()

  const { project, loading } = useProjectAtom()

  const affiliateCreateFormModal = useModal()

  const { queryAffiliateLinks } = useProjectAffiliateAPI(true)

  const items: AnimatedNavBarItem[] = [
    {
      name: t('Active'),
      key: 'active',
      render() {
        return <ActiveAffiliateList loading={loadingAffiliates} />
      },
    },
    {
      name: t('Disabled'),
      key: 'disabled',
      render() {
        return <DeactivatedAffiliateList loading={loadingAffiliates} />
      },
    },
  ]

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: 'active' })

  const loadingAffiliates = loading || queryAffiliateLinks.loading

  if (!project.id) return null

  const AddAffiliateButton = (props: ButtonProps) => {
    return (
      <Button variant="solid" colorScheme="primary1" onClick={affiliateCreateFormModal.onOpen} {...props}>
        {t('Add affiliate')}
      </Button>
    )
  }

  return (
    <DashboardLayout
      mobileTopNavRightComponent={<AddAffiliateButton />}
      deskTopBottomComponent={<AddAffiliateButton w="full" />}
    >
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1} position="relative">
        <HStack w="100%" justifyContent="space-between" spacing="20px" paddingX={{ base: 0, lg: 6 }}>
          <Body flex={1}>
            {t(
              "Enhance your project's growth and sales with affiliate partners and maintain full control over affiliate terms on this dashboard. Each link can be created only once and cannot be updated except for its label.",
            )}
          </Body>
        </HStack>
        <HStack w="full" paddingX={{ base: 0, lg: 6 }}>
          <AnimatedNavBar {...animatedNavBarProps} showLabel />
        </HStack>

        {render && render()}
      </VStack>

      <Modal title={t('Add affiliate')} {...affiliateCreateFormModal} size="lg">
        <AffiliateForm onCompleted={affiliateCreateFormModal.onClose} />
      </Modal>
    </DashboardLayout>
  )
}
