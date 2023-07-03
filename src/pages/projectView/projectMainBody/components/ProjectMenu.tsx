import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { getPath } from '../../../../constants'

export const ProjectMenu = ({ projectName }: { projectName: string }) => {
  const { t } = useTranslation()
  return (
    <Menu>
      <MenuButton
        rounded="full"
        as={IconButton}
        fontSize="22px"
        aria-label="Options"
        icon={<BsThreeDots />}
        variant="outline"
        boxShadow="none"
        border="none"
      />
      <MenuList>
        <MenuItem as={Link} to={getPath('dashboardContributors', projectName)}>
          {t('Dashboard')}
        </MenuItem>
        <MenuItem as={Link} to={getPath('projectDashboard', projectName)}>
          {t('Edit project')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
