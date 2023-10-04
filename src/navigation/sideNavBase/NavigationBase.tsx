import { Box } from '@chakra-ui/layout'
import { HStack, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { dimensions } from '../../constants'
import { useMobileMode } from '../../utils'
import {
  slideInLeft,
  slideInRight,
  slideOutLeft,
  slideOutRight,
} from './styles'

const useStyles = createUseStyles({
  ...slideInLeft,
  ...slideInRight,
  ...slideOutLeft,
  ...slideOutRight,
})

export enum NavigationDirection {
  left = 'left',
  right = 'right',
}

type NavigationBaseProps = {
  isSideNavOpen: boolean
  changeSideNavOpen: (_: any) => void
  navigation: React.ReactNode
  direction: NavigationDirection
}

type classForSideMenu = {
  left: {
    bar: string
    body: string
  }
  right: {
    bar: string
    body: string
  }
}

export const NavigationBase = ({
  isSideNavOpen,
  changeSideNavOpen,
  children,
  navigation,
  direction,
}: PropsWithChildren<NavigationBaseProps>) => {
  const classes = useStyles()
  const isMobile = useMobileMode()

  const isleft = direction === NavigationDirection.left

  const [classsForSideMenu, setClassForSideMenu] = useState<classForSideMenu>({
    left: {
      bar: '',
      body: '',
    },
    right: {
      bar: '',
      body: '',
    },
  })

  useEffect(() => {
    if (!isMobile) {
      return
    }

    if (isSideNavOpen) {
      setClassForSideMenu((current) => {
        return {
          left: {
            bar: classes.slideInLeft,
            body: classes.slideOutRight,
          },
          right: {
            bar: classes.slideInRight,
            body: classes.slideOutLeft,
          },
        }
      })
    } else {
      setClassForSideMenu((current) => {
        return {
          left: {
            bar: current.right.bar ? classes.slideOutLeft : '',
            body: current.left.body ? classes.slideInRight : '',
          },
          right: {
            bar: current.right.bar ? classes.slideOutRight : '',
            body: current.right.body ? classes.slideInLeft : '',
          },
        }
      })

      setTimeout(() => {
        setClassForSideMenu((current) => {
          return {
            left: {
              bar: '',
              body: '',
            },
            right: {
              bar: '',
              body: '',
            },
          }
        })
      }, 500)
    }
  }, [isSideNavOpen, classes, isMobile])

  const barHasClass = Boolean(classsForSideMenu[direction].bar)

  if (isMobile) {
    return (
      <HStack>
        <Modal
          variant="transparentBackdrop"
          isOpen={isSideNavOpen || barHasClass}
          onClose={() => changeSideNavOpen(false)}
        >
          <ModalOverlay />
          <ModalContent
            containerProps={{
              justifyContent: isleft ? 'start' : 'end',
              pt: dimensions.topNavBar.desktop.height,
            }}
            my="0"
            borderRadius="0"
            className={classsForSideMenu[direction].bar}
            zIndex={11}
            width={barHasClass ? '210px' : 0}
            backgroundColor={'neutral.100'}
            paddingRight={isleft ? '10px' : 0}
            paddingLeft={!isleft ? '10px' : 0}
            height={`100%`}
            shadow="none"
          >
            <HStack
              backgroundColor={'neutral.0'}
              alignItems="start"
              overflow="hidden"
              height="100%"
              w="full"
            >
              {navigation}
            </HStack>
          </ModalContent>
        </Modal>
        <Box w="full" h={'100%'} className={classsForSideMenu[direction].body}>
          {children}
        </Box>
      </HStack>
    )
  }

  return children
}
