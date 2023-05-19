import {
  Box,
  Button,
  HStack,
  Slide,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiHeart, BiNews, BiTrophy } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { getPath } from '../../../constants'
import { useAuthContext } from '../../../context'
import { MobileViews, useProjectContext } from '../../../context'
import { useScrollDirection } from '../../../hooks'
import { fonts } from '../../../styles'
import { isActive } from '../../../utils'

export const ProjectNav = ({ fixed }: { fixed?: boolean }) => {
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
  const { mobileView, setMobileView, project } = useProjectContext()
  const { user } = useAuthContext()

  const getTextColor = (value: string) => {
    if (value === mobileView) {
      return 'black'
    }

    return 'brand.neutral600'
  }

  if (!project) {
    return null
  }

  const { fundersCount, fundingTxsCount } = project

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
      backgroundColor="brand.neutral50"
      width="100%"
      bottom="0px"
      height="60px"
      borderTop="2px solid"
      borderTopColor="brand.neutral200"
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
      <Button
        variant="ghost"
        onClick={() => handleClick(MobileViews.contribution)}
        color={getTextColor(MobileViews.contribution)}
        leftIcon={<BiHeart fontSize="30px" />}
        _hover={{}}
        paddingX="5px"
      >
        {fundingTxsCount && (
          <Text fontFamily={fonts.mono}>{fundingTxsCount}</Text>
        )}
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleClick(MobileViews.leaderboard)}
        color={getTextColor(MobileViews.leaderboard)}
        leftIcon={<BiTrophy fontSize="30px" />}
        _hover={{}}
        paddingX="5px"
      >
        {fundersCount && <Text fontFamily={fonts.mono}>{fundersCount}</Text>}
      </Button>
      <HStack flexGrow={1}>
        {isOwner ? (
          <Button
            as={Link}
            to={getPath('projectDashboard', project.name)}
            size="sm"
            backgroundColor={
              mobileView === MobileViews.funding
                ? 'brand.neutral500'
                : 'brand.primary'
            }
            border="1px solid"
            borderColor={
              mobileView === MobileViews.funding
                ? 'brand.neutral500'
                : 'brand.primary'
            }
            _hover={{}}
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
