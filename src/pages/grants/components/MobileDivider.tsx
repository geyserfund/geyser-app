import { Divider, DividerProps } from '@chakra-ui/react'

import { useMobileMode } from '../../../utils'

export const MobileDivider = (props: DividerProps) => {
  const isMobile = useMobileMode()
  if (!isMobile) {
    return null
  }

  return <Divider border={'1px solid'} borderColor={'neutral.200'} {...props} />
}
