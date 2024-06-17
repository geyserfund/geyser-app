import { Box, Button, Container, ContainerProps, HStack, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { BiLeftArrowAlt } from 'react-icons/bi'

import { dimensions } from '../../../../../constants'
import { CardLayout } from '../../../../../shared/components/layouts'
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
        <Box sx={contentSx} mt={4} mb="80px" mx="10px" h="full">
          {content}
        </Box>
      ) : (
        <CardLayout sx={contentSx} mt={'40px'} mb={'20px'} overflowY={'auto'} h="full">
          {content}
        </CardLayout>
      )}
      {isNestedProcess ? null : (
        <HStack
          position={{ base: 'fixed', lg: 'absolute' }}
          w="full"
          px={{ base: '10px', lg: '0px' }}
          py="10px"
          bg="neutral.0"
          maxWidth={{ base: 600, lg: 'none' }}
          bottom={{ base: '0px', lg: '-50px' }}
          alignSelf="center"
        >
          <Button flexGrow={1} variant="secondary" onClick={onBackClick} leftIcon={<BiLeftArrowAlt fontSize="25px" />}>
            {t('Back')}
          </Button>

          {continueButton}
        </HStack>
      )}
    </Container>
  )
}
