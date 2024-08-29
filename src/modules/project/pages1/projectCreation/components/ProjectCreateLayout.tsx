import { Box, Button, Container, ContainerProps, HStack, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { PiArrowLeft } from 'react-icons/pi'

import { CardLayout } from '../../../../../shared/components/layouts'
import { dimensions } from '../../../../../shared/constants'
import { useMobileMode } from '../../../../../utils'

interface ProjectCreateLayoutProps extends Omit<ContainerProps, 'children' | 'title'> {
  children: ReactNode
  title: ReactNode
  continueButton?: ReactNode
  isNestedProcess?: boolean
  onBackClick: () => void
}

const contentSx = {
  display: 'flex',
  flexDirection: 'column',
}
export const ProjectCreateLayout = ({
  children,
  onBackClick,
  title,
  continueButton = null,
  isNestedProcess = false,
  ...props
}: ProjectCreateLayoutProps) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const content = (
    <>
      <VStack spacing={6} width="100%" marginBottom={6} display="flex" flexDirection="column" alignItems="flex-start">
        {title}
      </VStack>
      {children}
    </>
  )

  return (
    <Container
      p={0}
      display="flex"
      flexDirection="column"
      maxHeight={{
        base: '100%',
        ...(isNestedProcess ? {} : { lg: `calc(100vh - ${dimensions.topNavBar.desktop.height + 80}px)` }),
      }}
      flexGrow={1}
      position="relative"
      {...props}
    >
      {isMobile ? (
        <Box sx={contentSx} mt={4} mb={28} mx="10px" h="full">
          {content}
        </Box>
      ) : (
        <CardLayout sx={contentSx} my={6} overflowY={'auto'} h="full">
          {content}
        </CardLayout>
      )}
      {isNestedProcess ? null : (
        <HStack
          position={{ base: 'fixed', lg: 'absolute' }}
          w="full"
          px={{ base: 3, lg: '0px' }}
          backgroundColor="utils.pbg"
          maxWidth={{ base: 600, lg: 'none' }}
          bottom={{ base: '0px', lg: '-55px' }}
          borderTop={{ base: '1px solid', lg: 'none' }}
          paddingTop={3}
          paddingBottom={6}
          borderColor="neutral1.6"
          alignSelf="center"
        >
          <Button
            flexGrow={1}
            size="lg"
            variant="outline"
            colorScheme="neutral1"
            onClick={onBackClick}
            leftIcon={<PiArrowLeft fontSize="18px" />}
          >
            {t('Back')}
          </Button>

          {continueButton}
        </HStack>
      )}
    </Container>
  )
}
