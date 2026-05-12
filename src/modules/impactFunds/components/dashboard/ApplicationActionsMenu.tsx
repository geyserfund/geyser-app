import {
  type ButtonProps,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import { t } from 'i18next'
import {
  PiArrowsClockwiseBold,
  PiArrowSquareOutBold,
  PiCoinsBold,
  PiDotsThreeOutlineVerticalBold,
  PiNotePencilBold,
  PiSwapBold,
} from 'react-icons/pi'

export type DashboardAction = 'note' | 'disbursement' | 'status' | 'fundingModel'

type ApplicationActionsMenuProps = {
  onAction: (action: DashboardAction) => void
  projectPath?: string
  size?: ButtonProps['size']
}

export function ApplicationActionsMenu({ onAction, projectPath, size = 'sm' }: ApplicationActionsMenuProps) {
  return (
    <Menu placement="bottom-end" strategy="fixed">
      <MenuButton
        as={IconButton}
        size={size}
        variant="ghost"
        colorScheme="neutral1"
        aria-label={t('Application actions')}
        icon={<PiDotsThreeOutlineVerticalBold />}
        onClick={(event) => event.stopPropagation()}
      />
      <Portal>
        <MenuList zIndex="popover" onClick={(event) => event.stopPropagation()}>
          <MenuItem icon={<PiArrowsClockwiseBold />} onClick={() => onAction('status')}>
            {t('Update application status')}
          </MenuItem>
          <MenuItem icon={<PiSwapBold />} onClick={() => onAction('fundingModel')}>
            {t('Change funding modality')}
          </MenuItem>
          <MenuItem icon={<PiCoinsBold />} onClick={() => onAction('disbursement')}>
            {t('Add disbursement record')}
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<PiNotePencilBold />} onClick={() => onAction('note')}>
            {t('Add review note')}
          </MenuItem>
          {projectPath ? (
            <MenuItem
              as="a"
              href={projectPath}
              target="_blank"
              rel="noopener noreferrer"
              icon={<PiArrowSquareOutBold />}
            >
              {t('Open public project')}
            </MenuItem>
          ) : null}
        </MenuList>
      </Portal>
    </Menu>
  )
}
