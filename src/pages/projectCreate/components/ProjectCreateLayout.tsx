import {
  Button,
  Container,
  ContainerProps,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'

import { CardLayout } from '../../../components/layouts'

interface ProjectCreateLayoutProps
  extends Omit<ContainerProps, 'children' | 'title'> {
  children: ReactNode
  title: ReactNode
  continueButton?: ReactNode
  onBackClick: () => void
}

export const ProjectCreateLayout = ({
  children,
  onBackClick,
  title,
  continueButton = null,
  ...props
}: ProjectCreateLayoutProps) => {
  return (
    <Container py={4} {...props}>
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
      <CardLayout mt={3}>
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
      </CardLayout>
    </Container>
  )
}
