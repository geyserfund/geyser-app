import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { MobileViews, useProjectContext } from '../../modules/project/context'
import { Rewards } from '../../modules/project/pages/projectView/views/projectMainBody'
import { getPath } from '../../shared/constants'
import { useMobileMode } from '../../utils'

export const EntryRewards = () => {
  const isMobile = useMobileMode()
  const { mobileView, project } = useProjectContext()
  const navigate = useNavigate()

  const inView = mobileView === MobileViews.rewards

  useEffect(() => {
    if (!isMobile && project) {
      navigate(getPath('projectRewards', project.name))
    }
  }, [isMobile, project, navigate])

  return (
    <Box
      display={!isMobile || inView ? 'flex' : 'none'}
      backgroundColor={'neutral.0'}
      flex={!isMobile ? 3 : undefined}
      height="100%"
      w="100%"
      flexDirection="column"
      overflow="hidden"
      pb={'80px'}
    >
      <Rewards />
    </Box>
  )
}
