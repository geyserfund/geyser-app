import { Box, Button, Image, ImageProps, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import entry from '../../../assets/create-project/create-project-entry.png'
import fees from '../../../assets/create-project/create-project-fees.png'
import gift from '../../../assets/create-project/create-project-gift.png'
import key from '../../../assets/create-project/create-project-key.png'
import lightning from '../../../assets/create-project/create-project-lightning.png'
import rocket from '../../../assets/create-project/create-project-rocket.png'
import world from '../../../assets/create-project/create-project-world.png'
import { getPath } from '../../constants'
import { useAuthContext } from '../../context'
import { hasNostrAccount, hasTwitterAccount, useMobileMode } from '../../utils'
import { ConnectWithNostr } from '../auth/ConnectWithNostr'
import { ConnectWithTwitter } from '../auth/ConnectWithTwitter'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'

export const ProjectCreateStart = () => {
  const isMobile = useMobileMode()
  const { loading, user } = useAuthContext()
  const navigate = useNavigate()

  const params = useParams<{ projectId: string }>()

  const handleBack = () => navigate('/')

  const handleNext = () =>
    navigate(
      params.projectId
        ? `${getPath('privateProjectLaunch')}/${params.projectId}`
        : getPath('privateProjectLaunch'),
    )

  return (
    <ProjectCreateLayout
      title={<Text variant="h2">Create a new project</Text>}
      handleBack={handleBack}
    >
      <VStack spacing={8} w="100%">
        <Image src={rocket} alt="create project rocket" />

        <Text variant="h3">
          Transform your ideas into real world projects backed by your community
        </Text>

        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          flexWrap="wrap"
        >
          <ProjectInfoButton src={world} alt="create project world">
            Raise funds from anywhere in the world
          </ProjectInfoButton>
          <ProjectInfoButton src={lightning} alt="create project world">
            Receive funds from on-chain & lightning
          </ProjectInfoButton>
          <ProjectInfoButton src={gift} alt="create project world">
            Sell rewards and perks for your project
          </ProjectInfoButton>
          <ProjectInfoButton src={entry} alt="create project world">
            Update your community by writing Entries
          </ProjectInfoButton>
          <ProjectInfoButton src={fees} alt="create project world">
            Low 2% fees and no fees for node-runners
          </ProjectInfoButton>
          <ProjectInfoButton src={key} alt="create project world">
            Remain in control of your funds
          </ProjectInfoButton>
        </Box>

        {!loading && !hasTwitterAccount(user) && !hasNostrAccount(user) ? (
          <VStack w="100%">
            <Text color="neutral.700" pb={3}>
              You need to login with Twitter or Nostr, which connects your
              social profile to your project.
            </Text>
            <ConnectWithTwitter />
            <ConnectWithNostr />
            {!isMobile ? (
              <Text color="neutral.600" variant="caption">
                {`If twitter button isn't opening a Twitter authentication
                        page, make sure pop-ups are enabled in your browser's
                        preferences.`}
              </Text>
            ) : null}

            {/* 
            // @TODO: Open hotjar?
            <Text
              color="neutral.600"
              w="100%"
              textAlign="left"
              variant="caption"
            >
              Looking for another login method? Let us know <Link>here</Link>.
            </Text> */}
          </VStack>
        ) : (
          <Box w="100%">
            <FormContinueButton width="100%" onClick={handleNext} />
          </Box>
        )}
      </VStack>
    </ProjectCreateLayout>
  )
}

const ProjectInfoButton = ({
  src,
  alt,
  children,
}: PropsWithChildren<Pick<ImageProps, 'src' | 'alt'>>) => {
  const [isHover, setHover] = useState(false)
  return (
    <Button
      my={2}
      flexGrow={0}
      variant="secondary"
      height="160px"
      width="160px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        sx={isHover ? { transform: 'scale(1.2)' } : undefined}
        src={src}
        alt={alt}
      />
      <Text whiteSpace="break-spaces" color="neutral.700">
        {children}
      </Text>
    </Button>
  )
}
