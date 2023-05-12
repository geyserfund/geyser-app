import { Button, Container, HStack, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'

import { CardLayout } from '../../../components/layouts'

interface ProjectCreateLayoutProps {
  children: ReactNode
  title: ReactNode
  continueButton?: ReactNode
  handleBack: () => void
}

export const ProjectCreateLayout = ({
  children,
  handleBack,
  title,
  continueButton = null,
}: ProjectCreateLayoutProps) => {
  return (
    <Container py={4}>
      <HStack>
        <Button
          flexGrow={1}
          variant="secondary"
          onClick={handleBack}
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
