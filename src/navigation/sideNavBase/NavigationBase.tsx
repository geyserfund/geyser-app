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
  barHidden: {
    display: 'none',
  },
  barShow: {
    display: 'block',
  },
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
      bar: classes.barHidden,
      body: '',
    },
    right: {
      bar: classes.barHidden,
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
            bar: classes.barShow,
            body: classes.slideOutRight,
          },
          right: {
            bar: classes.barShow,
            body: classes.slideOutLeft,
          },
        }
      })
    } else {
      setClassForSideMenu((current) => {
        return {
          left: {
            bar:
              current.left.bar === classes.barShow
                ? classes.slideOutLeft
                : classes.barHidden,
            body: current.left.body ? classes.slideInRight : '',
          },
          right: {
            bar:
              current.right.bar === classes.barShow
                ? classes.slideOutRight
                : classes.barHidden,
            body: current.right.body ? classes.slideInLeft : '',
          },
        }
      })

      setTimeout(() => {
        setClassForSideMenu((current) => {
          return {
            left: {
              bar: classes.barHidden,
              body: '',
            },
            right: {
              bar: classes.barHidden,
              body: '',
            },
          }
        })
      }, 200)
    }
  }, [isSideNavOpen, classes, isMobile])

  const barIsNotHidden = Boolean(
    classsForSideMenu[direction].bar !== classes.barHidden,
  )

  if (isMobile) {
    return (
      <HStack>
        <Modal
          variant="transparentBackdrop"
          isOpen={isSideNavOpen || barIsNotHidden}
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
            width="210px"
            borderLeft={!isleft ? '2px solid' : 'none'}
            borderRight={isleft ? '2px solid' : 'none'}
            borderLeftColor="neutral.200"
            borderRightColor="neutral.200"
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
        <Box
          zIndex={20}
          w="full"
          h={'100%'}
          className={classsForSideMenu[direction].body}
        >
          {children}
        </Box>
      </HStack>
    )
  }

  return <>{children}</>
}
