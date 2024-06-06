import {
  Box,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverProps,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef } from 'react'

import { ProfileNavButton } from './components/ProfileNavButton'
import { ProfileNavContent } from './ProfileNavContent'

export const ProfileNavPopOver = (props: PopoverProps) => {
  const popOver = useDisclosure()

  const popoverRef = useRef(null)
  useOutsideClick({
    ref: popoverRef,
    handler: popOver.onClose,
  })
  return (
    <Box ref={popoverRef}>
      <Popover placement="bottom-end" {...popOver} {...props}>
        <PopoverAnchor>
          <ProfileNavButton onClick={popOver.onToggle} />
        </PopoverAnchor>

        <PopoverContent marginTop={4}>
          <PopoverBody padding={0}>
            <ProfileNavContent />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
