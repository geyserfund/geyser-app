import {
  Box,
  Button,
  Container,
  ContainerProps,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'

import { CardLayout } from '../../../components/layouts'
import { dimensions } from '../../../constants'
import { useMobileMode } from '../../../utils'

interface ProjectCreateLayoutProps
  extends Omit<ContainerProps, 'children' | 'title'> {
  children: ReactNode
  title: ReactNode
  continueButton?: ReactNode
  onBackClick: () => void
}

const contentSx = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}

export const ProjectCreateLayout = ({
  children,
  onBackClick,
  title,
  continueButton = null,
  ...props
}: ProjectCreateLayoutProps) => {
  const isMobile = useMobileMode()

  const content = (
    <>
      <VStack
        spacing={6}
        width="100%"
        marginBottom={6}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        {title}
      </VStack>
      {children}
    </>
  )

  return (
    <Container
      py={4}
      display="flex"
      flexDirection="column"
      minHeight={`calc(100vh - ${dimensions.topNavBar.mobile.height}px)`}
      flexGrow={1}
      {...props}
    >
      <HStack>
        <Button
          flexGrow={1}
          variant="secondary"
          onClick={onBackClick}
          leftIcon={<BiLeftArrowAlt fontSize="25px" />}
        >
          Back
        </Button>
        {continueButton}
      </HStack>
      {isMobile ? (
        <Box sx={contentSx} mt={4}>
          {content}
        </Box>
      ) : (
        <CardLayout sx={contentSx} mt={3}>
          {content}
        </CardLayout>
      )}
    </Container>
  )
}
