import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Head } from '../../../../config'
import { PathName } from '../../../../constants'
import { useModal } from '../../../../hooks/useModal'
import { toInt, useMobileMode } from '../../../../utils'
import { MobileViews, useFundingContext, useProjectContext } from '../../context'
import { FundingStages, useFundingStage } from '../../funding/state'
import { ProjectCreateDraftModal } from './components/ProjectCreateDraftModal'
import { ProjectCreateLaunchedModal } from './components/ProjectCreateLaunchedModal'
import { ProjectMobileBottomNavigation } from './views/projectNavigation/components/ProjectMobileBottomNavigation'
import { ProjectNavigation } from './views/projectNavigation/ProjectNavigation'

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export const ProjectContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onModalClose = () => {
    navigate(location.pathname, { replace: true })
  }

  const launchModal = useModal({ onClose: onModalClose })
  const draftModal = useModal({ onClose: onModalClose })

  const { project, setMobileView, mobileView } = useProjectContext()
  const { fundingStage } = useFundingStage()
  const {
    fundForm: { updateReward },
  } = useFundingContext()

  const query = useQuery()

  useEffect(() => {
    const launchModalShouldOpen = location.search.includes('launch')
    const draftModalShouldOpen = location.search.includes('draft')

    if (launchModalShouldOpen) {
      return launchModal.onOpen()
    }

    if (draftModalShouldOpen) {
      return draftModal.onOpen()
    }

    if (draftModal.isOpen) {
      draftModal.onClose()
    }

    if (launchModal.isOpen) {
      launchModal.onClose()
    }
  }, [draftModal, launchModal, location.search])

  const isMobile = useMobileMode()

  // If the user is being directed to the product page with addToCart, this takes first priority
  if (query.get('addRewardToBasket')) {
    updateReward({ id: toInt(query.get('addRewardToBasket')), count: 1 })
    navigate(PathName.projectRewards)
    setMobileView(MobileViews.funding)
  }

  const isFundingFlowInitial = mobileView === MobileViews.funding && fundingStage !== FundingStages.initial

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      pb={{ base: !isFundingFlowInitial ? '70px' : 0, lg: '0px' }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        overflow="hidden"
        position="relative"
        bg="neutral.0"
        flexDirection={{ base: 'column', lg: 'row' }}
        gap="20px"
      >
        <Head
          title={project?.title || ''}
          description={project?.shortDescription || ''}
          image={project?.thumbnailImage || ''}
          type="article"
        />
        {!isMobile ? <ProjectNavigation /> : null}

        <Outlet />

        <ProjectCreateLaunchedModal {...launchModal} />
        <ProjectCreateDraftModal {...draftModal} />

        {isMobile && !isFundingFlowInitial && <ProjectMobileBottomNavigation fixed />}
      </Box>
    </Box>
  )
}
