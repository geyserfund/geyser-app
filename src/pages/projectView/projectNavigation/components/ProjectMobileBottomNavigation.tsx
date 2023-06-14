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
import { useEffect, useState } from 'react'
import { BiNews } from 'react-icons/bi'

import { MilestoneIcon, RewardGiftIcon } from '../../../../components/icons'
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
  const [noTransition, setNoTransition] = useState(true)

  useEffect(() => {
    if (isScrollingUp) {
      onOpen()
    } else if (!fixed) {
      setNoTransition(false)
      onClose()
    }
  }, [isScrollingUp, mobileView, fixed, onOpen, onClose])

  return (
    <>
      {<Box width="100%" height="60px"></Box>}
      <Slide
        direction="bottom"
        in={isOpen}
        style={{
          zIndex: 10,
        }}
        unmountOnExit
        transition={
          noTransition
            ? {
                exit: {
                  duration: 0,
                },
                enter: {
                  duration: 0,
                },
              }
            : undefined
        }
      >
        <ProjectNavUI />
      </Slide>
    </>
  )
}

export const ProjectNavUI = () => {
  const {
    mobileView,
    setMobileView,
    project,
    isProjectOwner,
    onCreatorModalOpen,
  } = useProjectContext()

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
      spacing={8}
      paddingBottom="2px"
    >
      <HStack flexGrow={1} justifyContent="space-between">
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
      </HStack>
      <HStack flexGrow={1}>
        {isProjectOwner ? (
          <Button
            size="sm"
            variant="primary"
            width="100%"
            padding="5px"
            isDisabled={showGreyButton}
            onClick={() => onCreatorModalOpen()}
          >
            Create
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
