import {
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Slide,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { BiNews } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { MilestoneIcon, RewardGiftIcon } from '../../../../components/icons'
import { getPath } from '../../../../constants'
import { useAuthContext } from '../../../../context'
import { MobileViews, useProjectContext } from '../../../../context'
import { useScrollDirection } from '../../../../hooks'
import { fonts } from '../../../../styles'
import { isActive } from '../../../../utils'

export const ProjectMobileBottomNavigation = ({
  fixed,
}: {
  fixed?: boolean
}) => {
  const { mobileView } = useProjectContext()

  const { isScrollingUp } = useScrollDirection({
    initialValue: true,
    mobileView,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!fixed) {
      if (isScrollingUp) {
        return onOpen()
      }

      onClose()
    }
  }, [isScrollingUp, mobileView, fixed, onOpen, onClose])

  if (fixed) {
    return (
      <Slide
        direction="bottom"
        in
        style={{
          zIndex: 10,
        }}
        transition={{
          exit: {
            duration: 0,
          },
          enter: {
            duration: 0,
          },
        }}
      >
        <ProjectNavUI />
      </Slide>
    )
  }

  return (
    <>
      {<Box width="100%" height="60px"></Box>}
      <Slide
        direction="bottom"
        in={isOpen}
        style={{
          zIndex: 10,
        }}
      >
        <ProjectNavUI />
      </Slide>
    </>
  )
}

export const ProjectNavUI = () => {
  debugger
  const { mobileView, setMobileView, project } = useProjectContext()
  const { user } = useAuthContext()

  const getTextColor = (value: string) => {
    if (value === mobileView) {
      return 'neutral.1000'
    }

    return 'neutral.600'
  }

  if (!project) {
    return null
  }

  const { fundingTxsCount } = project

  const isOwner = project.owners[0]?.user?.id === user.id

  const handleClick = (value: MobileViews) => {
    if (mobileView === value) {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setMobileView(value)
      document.scrollingElement?.scrollTo({ top: 0 })
    }
  }

  const isFundingDisabled = !isActive(project.status)
  const showGreyButton = mobileView === MobileViews.funding || isFundingDisabled

  return (
    <HStack
      backgroundColor="neutral.50"
      width="100%"
      bottom="0px"
      height="60px"
      borderTop="2px solid"
      borderTopColor="neutral.200"
      paddingX="10px"
      justifyContent="center"
      alignItems="center"
      spacing={{
        base: '18px',
        lg: '50px',
      }}
      paddingBottom="2px"
    >
      <Button
        variant="ghost"
        onClick={() => handleClick(MobileViews.description)}
        color={getTextColor(MobileViews.description)}
        _hover={{}}
        paddingX="5px"
      >
        <BiNews fontSize="30px" />
      </Button>
      <IconButton
        variant="ghost"
        aria-label="milestones"
        _hover={{}}
        _active={{}}
        onClick={() => handleClick(MobileViews.contribution)}
        color={getTextColor(MobileViews.contribution)}
      >
        <>
          <MilestoneIcon fontSize="1.5em" />
          {fundingTxsCount ? (
            <Badge ml={1}>
              <Text fontFamily={fonts.mono}>{fundingTxsCount}</Text>
            </Badge>
          ) : null}
        </>
      </IconButton>
      <IconButton
        variant="ghost"
        onClick={() => handleClick(MobileViews.rewards)}
        color={getTextColor(MobileViews.rewards)}
        aria-label="rewards"
        _hover={{}}
        _active={{}}
        isDisabled={!project.rewards.length}
        paddingX="5px"
      >
        <RewardGiftIcon fontSize="1.5em" />
      </IconButton>
      <HStack flexGrow={1}>
        {isOwner ? (
          <Button
            as={Link}
            to={getPath('projectDashboard', project.name)}
            size="sm"
            backgroundColor={
              mobileView === MobileViews.funding ? 'neutral.500' : 'primary.400'
            }
            border="1px solid"
            borderColor={
              mobileView === MobileViews.funding ? 'neutral.500' : 'primary.400'
            }
            _hover={{}}
            variant="primary"
            width="100%"
            paddingX="5px"
          >
            Dashboard
          </Button>
        ) : (
          <Button
            size="sm"
            variant="primary"
            width="100%"
            padding="5px"
            isDisabled={showGreyButton}
            onClick={() => handleClick(MobileViews.funding)}
          >
            Contribute
          </Button>
        )}
      </HStack>
    </HStack>
  )
}
