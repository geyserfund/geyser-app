import { HStack, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useMobileMode } from '../../utils'
import { useNavAnimationStyles } from './styles'

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
  navigation,
  direction,
}: NavigationBaseProps) => {
  const classes = useNavAnimationStyles()
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
      setClassForSideMenu({
        left: {
          bar: `${classes.barShow} ${classes.slideInLeft}`,
          body: classes.slideOutRight,
        },
        right: {
          bar: `${classes.barShow} ${classes.slideInRight}`,
          body: classes.slideOutLeft,
        },
      })
    } else {
      setClassForSideMenu((current) => {
        return {
          left: {
            bar: current.left.bar.includes(classes.barShow)
              ? classes.slideOutLeft
              : classes.barHidden,
            body: current.left.body ? classes.slideInRight : '',
          },
          right: {
            bar: current.right.bar.includes(classes.barShow)
              ? classes.slideOutRight
              : classes.barHidden,
            body: current.right.body ? classes.slideInLeft : '',
          },
        }
      })

      setTimeout(() => {
        setClassForSideMenu({
          left: {
            bar: classes.barHidden,
            body: '',
          },
          right: {
            bar: classes.barHidden,
            body: '',
          },
        })
      }, 200)
    }
  }, [isSideNavOpen, classes, isMobile])

  const barIsNotHidden =
    isSideNavOpen ||
    Boolean(classsForSideMenu[direction].bar !== classes.barHidden)

  if (isMobile) {
    return (
      <Modal
        variant="blurryBackdrop"
        isOpen={barIsNotHidden}
        onClose={() => changeSideNavOpen(false)}
      >
        <ModalOverlay />
        <ModalContent
          containerProps={{
            justifyContent: isleft ? 'start' : 'end',
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
    )
  }

  return null
}
