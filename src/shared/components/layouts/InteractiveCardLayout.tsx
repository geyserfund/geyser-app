import { Box, Collapse, LinkProps as ChakraLinkProps, Stack, StackProps, useDisclosure } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, LinkProps } from 'react-router-dom'

export interface InteractiveCardLayout
  extends StackProps,
    Partial<Pick<LinkProps, 'to' | 'state'>>,
    Partial<Pick<ChakraLinkProps, 'href'>> {
  mobileDense?: boolean
  dense?: boolean
  hoverContent?: React.ReactNode
}

export const InteractiveCardLayout = ({
  mobileDense,
  dense,
  children,
  to,
  hoverContent,
  maxWidth,
  ...rest
}: InteractiveCardLayout) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
            _hover={{ cursor: 'pointer', shadow: hoverContent ? undefined : 'md' }}
            zIndex={isOpen ? 10 : 1}
            overflow="visible"
          >
            {children}

            {hoverContent && (
              <Stack
                {...props}
                position="absolute"
                background={'transparent'}
                // pointerEvents="none"
                onMouseOver={onOpen}
                onMouseLeave={onClose}
                _hover={{
                  shadow: 'md',
                  cursor: 'pointer',
                }}
                zIndex={2}
                top={0}
                left={0}
                right={0}
              >
                <Box height={contentHeight} pointerEvents="none" />
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
