import { Box, Collapse, LinkProps as ChakraLinkProps, Stack, StackProps, useDisclosure } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, LinkProps } from 'react-router-dom'

export interface InteractiveCardLayoutProps
  extends StackProps,
    Partial<Pick<LinkProps, 'to' | 'state'>>,
    Partial<Pick<ChakraLinkProps, 'href'>> {
  mobileDense?: boolean
  dense?: boolean
  hoverContent?: React.ReactNode
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const InteractiveCardLayout = ({
  mobileDense,
  dense,
  children,
  to,
  hoverContent,
  maxWidth,
  isOpen: isOpenProp,
  onOpen: onOpenProp,
  onClose: onCloseProp,

  ...rest
}: InteractiveCardLayoutProps) => {
  const { isOpen: _isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure()

  const isOpen = isOpenProp || _isOpen
  const onOpen = onOpenProp || _onOpen
  const onClose = onCloseProp || _onClose

  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number>(0)

  useEffect(() => {
    const node = contentRef.current
    if (node) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContentHeight(entry.contentRect.height)
        }
      })
      resizeObserver.observe(node)
      setContentHeight(node.clientHeight)
      return () => resizeObserver.disconnect()
    }
  }, [contentRef, isOpen])

  const props: StackProps = {
    spacing: 3,
    tabIndex: -1,
    overflow: 'hidden',
    backgroundColor: 'utils.pbg',
    boxShadow: 'none',
    padding: dense ? 0 : { base: mobileDense ? 0 : 3, lg: 6 },
    borderRadius: '8px',
    borderColor: 'transparent',
    position: 'relative',
    ...rest,
  }

  if (to) {
    return (
      <>
        <Link to={to}>
          <Stack
            ref={contentRef}
            as={motion.div}
            whileHover={{ scale: 1.02 }}
            {...props}
            {...rest}
            _hover={{ cursor: 'pointer', shadow: hoverContent ? 'none' : 'lg' }}
            zIndex={isOpen ? 3 : 1}
            overflow="visible"
            onMouseOver={onOpen}
            onMouseLeave={onClose}
          >
            {children}

            {hoverContent && (
              <Stack
                {...props}
                position="absolute"
                background={'transparent'}
                display={{ base: 'none', lg: 'flex' }}
                onMouseOver={onOpen}
                onMouseLeave={onClose}
                {...(isOpen
                  ? {
                      shadow: 'lg',
                      border: '1px solid var(--chakra-colors-neutral1-6)',
                      cursor: 'pointer',
                    }
                  : {})}
                width={'calc(100% + 32px)'}
                top={'-16px'}
                left={'-16px'}
              >
                <Box height={`${contentHeight + 16}px`} pointerEvents="none" />
                <Collapse in={isOpen} unmountOnExit>
                  <Box backgroundColor="utils.pbg">{hoverContent}</Box>
                </Collapse>
              </Stack>
            )}
          </Stack>
        </Link>
      </>
    )
  }

  return (
    <Stack
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      // onMouseOver={onOpen}
      // onMouseLeave={onClose}
      {...props}
      {...rest}
    >
      {children}
      <Collapse style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} initial={{ height: 0 }} in={isOpen}>
        {hoverContent}
      </Collapse>
    </Stack>
  )
}
